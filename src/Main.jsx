import { StyleSheet, View } from "react-native";
import { NativeRouter, Navigate, Route, Routes } from "react-router-native";
import AppBar from "./components/AppBar";
import RepositoryList from "./components/RepositoryList";
import SignIn from "./components/SignIn";

const Main = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <AppBar />

        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </NativeRouter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
