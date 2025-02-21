import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`[GraphQL Error]: Message ${message}, Locations: ${locations}, Paths: ${path}`)
    })
  }
  if (networkError) {
    console.error(`[Network Error]: ${networkError}`)
  }
})

const httpLink = new HttpLink({
  uri: GITHUB_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
  }
})
const link = ApolloLink.from([errorLink, httpLink])
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
export default client
