import Constants from "expo-constants";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";

const AppBar = () => {
  return (
    <View style={[styles.container, { paddingTop: Constants.statusBarHeight }]}>
      <Link to="/" style={styles.link} underlayColor="transparent">
        <Text style={styles.text}>Repositories</Text>
      </Link>

      <Link to="/signin" style={styles.link} underlayColor="transparent">
        <Text style={styles.text}>Sign in</Text>
      </Link>
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
    gap: 20,
  },
  link: {
    paddingVertical: 8,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AppBar;
