import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

import apolloClient from "../apolloClient";
import AuthStorage from "../utils/authStorage";

const authStorage = new AuthStorage();

const AUTHENTICATE = gql`
  mutation authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    const accessToken = response?.data?.authenticate?.accessToken;

    if (accessToken) {
      await authStorage.setAccessToken(accessToken);
      await apolloClient.resetStore();
    }

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
