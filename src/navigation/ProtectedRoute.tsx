import React, { useContext, useEffect } from "react"
import { Route, useHistory } from "react-router-dom"

import { AUTH_FAILURE_PATH } from "../config"

import Loading from "../components/Loading"
import { AuthContext } from "../providers/AuthProvider"

const ProtectedRoute = ({ component: RouteComponent, requiresSubscription = true, ...rest }: any) => {
  const { isLoading, isAuthenticated } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      history.push({ pathname: AUTH_FAILURE_PATH, state: { referrer: window.location.href } })
    }
  }, [history, isAuthenticated, isLoading])
    
  if (isAuthenticated) {
    return (
      <Route
        {...rest}
        render={routeProps => (
          <RouteComponent {...routeProps} />
        )}
      />
    )
  }

  return <Loading />
}

export default ProtectedRoute
