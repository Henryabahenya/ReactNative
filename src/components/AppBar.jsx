import { gql, useApolloClient, useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, useNavigate } from "react-router-native";

import AuthStorage from "../utils/authStorage";

const authStorage = new AuthStorage();

const ME = gql`
  query me {
    me {
      id
      username
    }
  }
`;

const AppBar = () => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const { data } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  });

  const me = data?.me;

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  };

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

        {me ? (
          <>
            <Link to="/review" style={styles.link} underlayColor="transparent">
              <Text style={styles.text}>Create a review</Text>
            </Link>
            <Pressable onPress={handleSignOut} style={styles.link}>
              <Text style={styles.text}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <Link to="/signin" style={styles.link} underlayColor="transparent">
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
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
