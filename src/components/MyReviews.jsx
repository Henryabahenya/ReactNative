import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigate } from "react-router-native";
import { GET_CURRENT_USER } from "../graphql/queries";
import useDeleteReview from "../hooks/useDeleteReview";

const MyReviews = () => {
  const navigate = useNavigate();
  const [deleteReview] = useDeleteReview();

  const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) ?? [];

  const handleDeleteReview = (review) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteReview(review.id);
              await refetch();
            } catch (err) {
              console.error("Failed to delete review:", err);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading reviews...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Failed to load reviews.</Text>
      </View>
    );
  }

  if (reviews.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No reviews yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(review) => review.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item: review }) => (
        <View style={styles.reviewCard}>
          <Text style={styles.repositoryName}>
            {review.repository.fullName}
          </Text>
          <Text style={styles.meta}>
            {review.user.username} ·{" "}
            {format(new Date(review.createdAt), "dd MMM yyyy")}
          </Text>
          <Text style={styles.rating}>Rating: {review.rating}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.actionButton, styles.viewButton]}
              onPress={() => navigate(`/repository/${review.repository.id}`)}
            >
              <Text style={styles.buttonText}>View repository</Text>
            </Pressable>

            <Pressable
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDeleteReview(review)}
            >
              <Text style={styles.buttonText}>Delete review</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e4e8",
  },
  listContent: {
    padding: 16,
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  repositoryName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#0366d6",
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  viewButton: {
    backgroundColor: "#0366d6",
  },
  deleteButton: {
    backgroundColor: "#d73a49",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default MyReviews;
