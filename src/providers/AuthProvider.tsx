import React, { useEffect, useState, ReactNode } from 'react'
import jwtDecoder from 'jwt-decode'

import { AUTH_PATH } from '../config'
import { useHistory } from 'react-router-dom'

interface Auth {
  expiry: number | null,
  token: string | null,
  userId: string | null,
}

export interface AuthContextType extends Auth {
  checkLoggedIn: () => Promise<void>,
  error: string | null,
  fetchRefreshToken: () => Promise<Response>,
  handleAuthentication: (accessToken: string) => Promise<void>,
  hasError: boolean,
  isAuthenticated: boolean,
  isLoading: boolean,
  onLogin: (email: string, password: string) => Promise<void>,
  onLoginCallback: (refreshToken: string) => Promise<boolean>,
  onLoginWithFacebook: () => Promise<void>,
  onLoginWithTwitter: () => Promise<void>,
  onLoginWithGoogle: () => Promise<void>,
  onLogout: () => Promise<void>,
  reauthenticate: () => Promise<void>,
  redirectToLogin: () => void
}

const DEFAULT_AUTH: Auth = {
  expiry: null,
  token: null,
  userId: null
}

const DEFAULT_AUTH_CONTEXT: AuthContextType = {
  ...DEFAULT_AUTH,
  checkLoggedIn: async () => {},
  error: null,
  fetchRefreshToken: async () => new Response(),
  handleAuthentication: async () => {},
  hasError: false,
  isAuthenticated: false,
  isLoading: true,
  onLogin: async () => {},
  onLoginCallback: async () => false,
  onLoginWithFacebook: async () => {},
  onLoginWithTwitter: async () => {},
  onLoginWithGoogle: async () => {},
  onLogout: async () => {},
  reauthenticate: async () => {},
  redirectToLogin: () => {}
}

export const AuthContext = React.createContext(DEFAULT_AUTH_CONTEXT)
export const AuthConsumer = AuthContext.Consumer

interface IProps {
  children: ReactNode
}

const AuthProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState<Auth>(DEFAULT_AUTH)
  const [error, setError] = useState<string | null>(DEFAULT_AUTH_CONTEXT.error)
  const [loading, setLoading] = useState<boolean>(DEFAULT_AUTH_CONTEXT.isLoading)
  const history = useHistory()

  useEffect(() => {
    reauthenticate()
  }, [])

  const onLogin = async (email: string, password: string, remember: boolean = false) => {
    setError(null)
    setLoading(true)

    try {
      const { access_token } = await authLogin(email, password, remember)
      if (access_token) {
        handleAuthentication(access_token)
      } else {
        throw Error('Login request failed. No access token found.')
      }
    } catch (error) {
      console.error(error)
      setError('Unable to login. Please try again.')
      logoutSuccess()
    }
  }

  const onLoginCallback = async (accessToken: string): Promise<boolean> => {
    setLoading(true)

    try {
      await refreshToken(accessToken)
      setLoading(false)
      return true
    } catch (error) {
      console.error(error)
      setError('Unable to login through provider. Please try again.')
      await logoutSuccess()
      return false
    }
  }

  const onLoginWithFacebook = async () => {
    setError(null)
    setLoading(true)

    window.location.href = `${AUTH_PATH}/auth/facebook`
  }

  const onLoginWithTwitter = async () => {
    setError(null)
    setLoading(true)
    
    window.location.href = `${AUTH_PATH}/auth/twitter`
  }

  const onLoginWithGoogle = async () => {
    setError(null)
    setLoading(true)
    
    window.location.href = `${AUTH_PATH}/auth/google`
  }

  const onLogout = async () => {
    setError(null)
    setLoading(true)

    try {
      const { success } = await authLogout()
      if (success) {
        logoutSuccess()
      } else {
        throw Error('Logout request failed.')
      }
    } catch (error) {
      console.error(error)
      setError('Unable to logout. Please try again.')
      logoutSuccess()
    }
  }

  const handleAuthentication = async (accessToken: string) => {
    const decodedAccessToken: any = jwtDecoder(accessToken)
    const { userId, exp } = decodedAccessToken

    await loginSuccess(accessToken, userId, exp)
  }

  const loginSuccess = async (token: string, userId: string, expiry: number) => {
    setAuth({ expiry, token, userId })
    setLoading(false)
  }

  const logoutSuccess = async () => {
    setAuth(DEFAULT_AUTH)
    setLoading(false)
  }

  const authLogin = async (email: string, password: string, remember: boolean) => {
    try {
      const response = await fetch(`${AUTH_PATH}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password, remember }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json()
        if (result.data) {
          return result.data;
        } else {
          throw new Error('Invalid response received.')
        }
      } else {
        throw new Error('Login request failed.')
      }
    } catch (error) {
      throw error
    }
  }

  const authLogout = async () => {
    try {
      const response = await fetch(`${AUTH_PATH}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json()
        if (result.data) {
          return result.data;
        } else {
          throw new Error('Invalid response received.')
        }
      } else {
        throw new Error('Logout request failed.')
      }
    } catch (error) {
      throw error
    }
  }

  const authRefreshToken = async () => {
    try {
      const response = await fetchRefreshToken()

      if (response.ok) {
        const result = await response.json()
        if (result.data) {
          return result.data;
        } else {
          throw new Error('Invalid response received.')
        }
      } else {
        throw new Error('Renew refresh token request failed.')
      }
    } catch (error) {
      throw error
    }
  }

  const fetchRefreshToken = async () => {
    return fetch(`${AUTH_PATH}/auth/token/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
  }

  const authToken = async (accessToken: string) => {
    try {
      const response = await fetch(`${AUTH_PATH}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json()
        if (result.data) {
          return result.data;
        }
      } else if (response.status === 401) {
        throw new Error('Your refresh token has expired.')
      } else {
        throw new Error('Get refresh token request failed.')
      }
    } catch (error) {
      throw error
    }
  }

  const reauthenticate = async () => {
    setLoading(true)

    try {
      await refreshAccessToken()
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError('Your login has expired. Please login again.')
      logoutSuccess()
    }
  }

  const redirectToLogin = () => {
    history.replace('/login')
  }

  const refreshAccessToken = async () => {
    try {
      const { access_token } = await authRefreshToken()
      if (access_token) {
        handleAuthentication(access_token)
      }
    } catch(error) {
      throw error
    }
  }

  const refreshToken = async (accessToken: string) => {
    try {
      const { access_token } = await authToken(accessToken)
      if (access_token) {
        handleAuthentication(access_token)
      }
    } catch(error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        checkLoggedIn: reauthenticate,
        error,
        fetchRefreshToken,
        handleAuthentication,
        hasError: !! error,
        isAuthenticated: !! auth.userId,
        isLoading: loading,
        onLogin,
        onLoginCallback,
        onLoginWithFacebook,
        onLoginWithTwitter,
        onLoginWithGoogle,
        onLogout,
        reauthenticate,
        redirectToLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
