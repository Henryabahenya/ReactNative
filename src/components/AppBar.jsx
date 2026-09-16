import Constants from "expo-constants";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "react-router-native";

const AppBar = () => {
  return (
    <View style={[styles.container, { paddingTop: Constants.statusBarHeight }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <Link to="/" style={styles.link} underlayColor="transparent">
          <Text style={styles.text}>Repositories</Text>
        </Link>

        <Link to="/signin" style={styles.link} underlayColor="transparent">
          <Text style={styles.text}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 8,
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
