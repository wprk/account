import React, { ReactNode, useContext, useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../data/queries'

import { AuthContext } from './AuthProvider'
import GetUserResponse from '../interfaces/queries/GetUserResponse'
import User from '../interfaces/User'

export interface UserContextType {
  user: User | null
}

const DEFAULT_USERCONTEXT: UserContextType = {
  user: null,
}

export const UserContext = React.createContext(DEFAULT_USERCONTEXT)

interface IProps {
  children: ReactNode
}

const UserProvider = ({ children }: IProps) => {
  const { isAuthenticated, userId } = useContext(AuthContext)
  const [getUser, { data }] = useLazyQuery<GetUserResponse>(GET_USER)
  const [ user, setUser ] = useState<User | null>(null)

  useEffect(() => {
    if (isAuthenticated && userId) {
      getUser({ variables: { userId }})
    } else {
      setUser(null)
    }
  }, [getUser, isAuthenticated, setUser, userId])

  useEffect(() => {
    if (data) {
      setUser(data.users_by_pk)
    }
  }, [data, setUser])

  return (
    <UserContext.Provider
      value={{
        user: user ? user : null
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
