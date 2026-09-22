import { Formik } from "formik";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigate } from "react-router-native";
import * as Yup from "yup";
import useSignIn from "../hooks/useSignIn";
import { useSignUp } from "../hooks/useSignUp";

const signUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters"),
  passwordConfirmation: Yup.string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (values) => {
    setSubmitError(null);
    try {
      await signUp({
        username: values.username,
        password: values.password,
      });

      await signIn({
        username: values.username,
        password: values.password,
      });

      navigate("/");
    } catch (error) {
      console.error("Sign up failed:", error);
      setSubmitError(error.message || "Sign up failed");
      throw error;
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scrollView}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign up</Text>

        <Formik
          initialValues={{
            username: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit: formikHandleSubmit,
            values,
            errors,
            touched,
            isValid,
            isSubmitting,
          }) => {
            const usernameError = touched.username && errors.username;
            const passwordError = touched.password && errors.password;
            const passwordConfirmationError =
              touched.passwordConfirmation && errors.passwordConfirmation;

            return (
              <View>
                <View style={styles.fieldContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      usernameError ? styles.inputError : null,
                    ]}
                    placeholder="Username"
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {usernameError ? (
                    <Text style={styles.errorText}>{usernameError}</Text>
                  ) : null}
                </View>

                <View style={styles.fieldContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      passwordError ? styles.inputError : null,
                    ]}
                    placeholder="Password"
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {passwordError ? (
                    <Text style={styles.errorText}>{passwordError}</Text>
                  ) : null}
                </View>

                <View style={styles.fieldContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      passwordConfirmationError ? styles.inputError : null,
                    ]}
                    placeholder="Confirm password"
                    value={values.passwordConfirmation}
                    onChangeText={handleChange("passwordConfirmation")}
                    onBlur={handleBlur("passwordConfirmation")}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {passwordConfirmationError ? (
                    <Text style={styles.errorText}>
                      {passwordConfirmationError}
                    </Text>
                  ) : null}
                </View>

                {submitError ? (
                  <Text style={styles.errorText}>{submitError}</Text>
                ) : null}

                <Pressable
                  style={[
                    styles.button,
                    (!isValid || isSubmitting) && styles.buttonDisabled,
                  ]}
                  onPress={formikHandleSubmit}
                  disabled={!isValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Sign up</Text>
                  )}
                </Pressable>
              </View>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e4e8",
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#24292e",
  },
  fieldContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d0d7de",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#d32f2f",
  },
  errorText: {
    color: "#d32f2f",
    marginTop: 6,
    fontSize: 12,
  },
  button: {
    backgroundColor: "#0366d6",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#8ab6f9",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SignUp;
