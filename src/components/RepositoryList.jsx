import { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigate } from "react-router-native";
import { useRepositories } from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";

const sortOptions = [
  {
    label: "Latest repositories",
    value: { orderBy: "CREATED_AT", orderDirection: "DESC" },
  },
  {
    label: "Highest rated repositories",
    value: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
  },
  {
    label: "Lowest rated repositories",
    value: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value);
  const { repositories, loading, error } = useRepositories(
    selectedSort.orderBy,
    selectedSort.orderDirection
  );

  const handleRepositoryPress = (id) => {
    navigate(`/repository/${id}`);
  };

  const renderSortSelector = () => (
    <View style={styles.sortContainer}>
      <Picker
        selectedValue={selectedSort}
        onValueChange={(value) => setSelectedSort(value)}
        style={styles.picker}
      >
        {sortOptions.map((option) => (
          <Picker.Item
            key={`${option.value.orderBy}-${option.value.orderDirection}`}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );

  if (loading) {
    return <View style={styles.centered} />;
  }

  if (error) {
    return <View style={styles.centered} />;
  }

  return (
    <FlatList
      data={repositories}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={renderSortSelector}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleRepositoryPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
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
  sortContainer: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#d0d7de",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e4e8",
  },
});

export default RepositoryList;
