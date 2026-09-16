import { StyleSheet, Text, View } from "react-native";

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>The sign-in view</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e4e8",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#24292e",
  },
});

export default SignIn;
