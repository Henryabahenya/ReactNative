import Constants from "expo-constants";
import { Pressable, StyleSheet, Text, View } from "react-native";

const AppBar = () => {
  return (
    <View style={[styles.container, { paddingTop: Constants.statusBarHeight }]}>
      <Pressable>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
    paddingBottom: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AppBar;
