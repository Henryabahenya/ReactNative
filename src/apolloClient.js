import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AuthStorage from "./utils/authStorage";

const authStorage = new AuthStorage();

const httpLink = createHttpLink({
  uri: process.env.EXPO_PUBLIC_APOLLO_URI ?? "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const token = await authStorage.getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } catch (e) {
    return { headers };
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
