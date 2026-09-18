import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useParams } from "react-router-native";
import { useRepository } from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Failed to load repository</Text>
      </View>
    );
  }

  if (!repository) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Repository not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.separator} />
      <RepositoryItem item={repository} showGitHubButton={true} />
      <View style={styles.separator} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e4e8",
  },
  content: {
    paddingBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e4e8",
  },
  errorText: {
    fontSize: 16,
    color: "#24292e",
  },
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
});

export default SingleRepositoryView;
