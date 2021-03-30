import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { onError } from '@apollo/client/link/error'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import jwtDecode from 'jwt-decode'

import { GRAPHQL_ENDPOINT } from './config/index'

const getHeaders = (token: string): object => {
  const headers: any = {}

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
    headers['X-Hasura-Role'] = 'user'
  } else {
    headers['X-Hasura-Role'] = 'anonymous'
  }

  return headers;
}

export const makeClient = (
  token: string = '',
  fetchAccessToken: () => any = () => true,
  handleAuthentication: (accessToken: string) => any = () => true,
) => {
  const cache = new InMemoryCache({});

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      )
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
  })

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: any) => ({ headers: {
      ...getHeaders(token),
      ...headers
    }}));
    return forward(operation);
  });

  const tokenLink = new TokenRefreshLink({
    accessTokenField: "access_token",
    isTokenValidOrUndefined: () => {
      if (!token) return true

      try {
        const { exp } = jwtDecode(token)
        if (Date.now() < exp * 1000) return true
        
        return false;
      } catch {
        return false;
      }
    },
    fetchAccessToken,
    handleFetch: (accessToken: string) => {
      handleAuthentication(accessToken)
    },
    handleError: (err: any) => {
      console.error(err);
    }
  })

  const networkLink = new BatchHttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: "include"
  })

  const client = new ApolloClient({
    link: ApolloLink.from([
      authLink,
      tokenLink,
      errorLink,
      networkLink,
    ]),
    cache
  });

  return client
}
