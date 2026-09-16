import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_APOLLO_URI ?? "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default apolloClient;
