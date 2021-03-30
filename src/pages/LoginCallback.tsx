import React, { useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { AUTH_FAILURE_PATH, AUTH_SUCCESS_PATH } from '../config/index'
import Loading from '../components/Loading'
import { AuthContext } from '../providers/AuthProvider'

const LoginCallback = () => {
  const { onLoginCallback } = useContext(AuthContext)
  const history = useHistory()
  let { token } = useParams()

  useEffect(() => {
    if (token) {
      const response = onLoginCallback(token)
      if (response) {
        history.replace(AUTH_SUCCESS_PATH)
      } else {
        history.replace(AUTH_FAILURE_PATH)
      }
    }
  }, [history, onLoginCallback, token])

  return <Loading />
}

export default LoginCallback
