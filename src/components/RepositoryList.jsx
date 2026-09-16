import { FlatList, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";

const repositories = [
  {
    id: "jaredpalmer.formik",
    fullName: "jaredpalmer/formik",
    description: "Build forms in React, without the tears",
    language: "TypeScript",
    stargazersCount: 218000,
    forksCount: 2200,
    reviewCount: 880,
    ratingAverage: 88,
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/1930?v=4",
  },
  {
    id: "rails.rails",
    fullName: "rails/rails",
    description: "Ruby on Rails",
    language: "Ruby",
    stargazersCount: 520000,
    forksCount: 21000,
    reviewCount: 1200,
    ratingAverage: 92,
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/4223?v=4",
  },
  {
    id: "facebook.react",
    fullName: "facebook/react",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    language: "JavaScript",
    stargazersCount: 2100000,
    forksCount: 440000,
    reviewCount: 1500,
    ratingAverage: 95,
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/69631?v=4",
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#e1e4e8",
  },
  listContent: {
    backgroundColor: "#e1e4e8",
  },
  separator: {
    height: 10,
    backgroundColor: "#e1e4e8",
  },
});

export default RepositoryList;
