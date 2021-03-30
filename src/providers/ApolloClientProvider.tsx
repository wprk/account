import React, { useContext, useEffect, useState } from 'react'
import { ApolloProvider, ApolloClient } from '@apollo/client'

import { makeClient } from '../Apollo'
import { AuthContext } from './AuthProvider'
import FullScreenLoading from '../components/FullScreenLoading'

const ApolloClientProvider = ({ children }: any) => {
  const { fetchRefreshToken, handleAuthentication, isAuthenticated, token, userId } = useContext(AuthContext)
  const [client, setClient] = useState<ApolloClient<any> | null>(null)

  useEffect(() => {
    if (isAuthenticated && token && userId) {
      setClient(makeClient(token, fetchRefreshToken, handleAuthentication))
    } else {
      setClient(makeClient())
    }
  }, [isAuthenticated, token, userId])

  if (!client) {
    return <FullScreenLoading />
  }

  return (
    <ApolloProvider client={client}>
      { children }
    </ApolloProvider>
  )
}

export default ApolloClientProvider
