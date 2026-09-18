import { gql, useMutation } from "@apollo/client";

const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      repository {
        id
      }
    }
  }
`;

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (review) => {
    const response = await mutate({
      variables: {
        review: {
          ownerName: review.ownerName,
          repositoryName: review.repositoryName,
          rating: parseInt(review.rating, 10),
          text: review.text || undefined,
        },
      },
    });

    return response;
  };

  return [createReview, result];
};
