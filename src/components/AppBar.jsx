import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import Constants from "expo-constants";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, useNavigate } from "react-router-native";

import apolloClient from "../apolloClient";
import AuthStorage from "../utils/authStorage";

const authStorage = new AuthStorage();

const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

const AppBar = () => {
  const navigate = useNavigate();
  const { data } = useQuery(ME, {
    variables: { includeReviews: false },
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
          <>
            <Link to="/signin" style={styles.link} underlayColor="transparent">
              <Text style={styles.text}>Sign in</Text>
            </Link>
            <Link to="/signup" style={styles.link} underlayColor="transparent">
              <Text style={styles.text}>Sign up</Text>
            </Link>
          </>
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
