import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryStats = ({ stars, forks, reviews, rating }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{formatCount(stars)}</Text>
        <Text style={styles.statLabel}>Stars</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statValue}>{formatCount(forks)}</Text>
        <Text style={styles.statLabel}>Forks</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statValue}>{formatCount(reviews)}</Text>
        <Text style={styles.statLabel}>Reviews</Text>
      </View>

      <View style={styles.statItem}>
        <Text style={styles.statValue}>{rating}</Text>
        <Text style={styles.statLabel}>Rating</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item, showGitHubButton = false }) => {
  const handleOpenGitHub = () => {
    if (item.url) {
      Linking.openURL(item.url);
    }
  };

  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.headerRow}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />

        <View style={styles.content}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>

          {item.language ? (
            <View style={styles.languageContainer}>
              <Text style={styles.language}>{item.language}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <RepositoryStats
        stars={item.stargazersCount}
        forks={item.forksCount}
        reviews={item.reviewCount}
        rating={item.ratingAverage}
      />

      {showGitHubButton && (
        <Pressable
          style={styles.githubButton}
          onPress={handleOpenGitHub}
          testID="openGitHubButton"
        >
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  content: {
    flex: 1,
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
    lineHeight: 20,
  },
  languageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#0366d6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 12,
  },
  language: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#111",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  githubButton: {
    backgroundColor: "#0366d6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  githubButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default RepositoryItem;
