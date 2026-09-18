import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;

export const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    return response;
  };

  return [signUp, result];
};
