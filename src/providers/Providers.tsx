import React from 'react'
import {
  withRouter,
} from 'react-router-dom'

import ApolloClientProvider from './ApolloClientProvider'
import AuthProvider from './AuthProvider'
import UserProvider from './UserProvider'

const Providers = ({ children}: any) => (
  <AuthProvider>
    <ApolloClientProvider>
      <UserProvider>
        { children }
      </UserProvider>
    </ApolloClientProvider>
  </AuthProvider>
)

export default withRouter(Providers)
