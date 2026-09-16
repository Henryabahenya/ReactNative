import { gql, useQuery } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repositories {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  const repositories =
    data?.repositories?.edges?.map((edge) => ({
      ...edge.node,
    })) ?? [];

  return { repositories, loading, error };
};
