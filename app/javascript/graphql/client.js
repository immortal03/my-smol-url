import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        })
      }

      if (networkError && networkError.statusCode === 401) {
        // console.warn(`[Network error]: ${networkError}`)
        window.location.replace("/")
      }
    }),
    new HttpLink({
      uri: "/graphql",
      credentials: "same-origin",
      headers: {
        "X-CSRF-Token": document
          .querySelector("meta[name=csrf-token]")
          .getAttribute("content"),
      },
    }),
  ]),
  cache: new InMemoryCache(),
})
