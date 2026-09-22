import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export const GET_REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const useRepository = (id) => {
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data?.repository ?? null;

  return { repository, loading, error, refetch };
};
