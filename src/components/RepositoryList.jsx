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
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "#e1e4e8",
  },
});

export default RepositoryList;
