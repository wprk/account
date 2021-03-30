import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';

import { AUTH_LOGOUT_PATH } from '../config';
import Loading from '../components/Loading';
import { AuthContext } from '../providers/AuthProvider';

const Logout = () => {
  const { isAuthenticated, isLoading, onLogout } = useContext(AuthContext);
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      onLogout()
    }
  }, [isAuthenticated, isLoading, onLogout])

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      history.replace(AUTH_LOGOUT_PATH)
    }
  }, [history, isAuthenticated, isLoading])

  return <Loading />
}

export default Logout
