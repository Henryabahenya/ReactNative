import { gql, useQuery } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: RepositoryOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
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

export const useRepositories = (
  orderBy = "CREATED_AT",
  orderDirection = "DESC",
  searchKeyword = ""
) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword },
    fetchPolicy: "cache-and-network",
  });

  const repositories =
    data?.repositories?.edges?.map((edge) => ({
      ...edge.node,
    })) ?? [];

  return { repositories, loading, error };
};
