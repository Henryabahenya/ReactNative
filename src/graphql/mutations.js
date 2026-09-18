import { gql } from "@apollo/client";

export const DELETE_REVIEW = gql`
  mutation deleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
