import { StyleSheet, Text, View } from "react-native";

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>{item.fullName}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {item.language ? (
        <View style={styles.languageContainer}>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      ) : null}

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.stargazersCount}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.forksCount}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{item.ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  fullName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  languageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#dfe8ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  language: {
    color: "#234",
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontWeight: "bold",
    fontSize: 14,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});

export default RepositoryItem;
