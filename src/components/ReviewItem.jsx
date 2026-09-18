import { format } from "date-fns";
import { StyleSheet, Text, View } from "react-native";

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), "dd MMM yyyy");

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{review.rating}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#0366d6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0366d6",
  },
  content: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});

export default ReviewItem;
