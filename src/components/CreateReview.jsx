import { Formik } from "formik";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigate } from "react-router-native";
import * as Yup from "yup";
import { useCreateReview } from "../hooks/useCreateReview";

const reviewValidationSchema = Yup.object().shape({
  ownerName: Yup.string().required("Repository owner name is required"),
  repositoryName: Yup.string().required("Repository name is required"),
  rating: Yup.number()
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: Yup.string(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview, result] = useCreateReview();

  const handleSubmit = async (values) => {
    try {
      const response = await createReview(values);
      const repositoryId = response?.data?.createReview?.repository?.id;

      if (repositoryId) {
        navigate(`/repository/${repositoryId}`);
      }
    } catch (error) {
      console.error("Failed to create review:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create a review</Text>

        <Formik
          initialValues={{
            ownerName: "",
            repositoryName: "",
            rating: "",
            text: "",
          }}
          validationSchema={reviewValidationSchema}
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
          }) => {
            const ownerNameError = touched.ownerName && errors.ownerName;
            const repositoryNameError =
              touched.repositoryName && errors.repositoryName;
            const ratingError = touched.rating && errors.rating;

            return (
              <View>
                <View style={styles.fieldContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      ownerNameError ? styles.inputError : null,
                    ]}
                    placeholder="Repository owner name"
                    value={values.ownerName}
                    onChangeText={handleChange("ownerName")}
                    onBlur={handleBlur("ownerName")}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {ownerNameError ? (
                    <Text style={styles.errorText}>{ownerNameError}</Text>
                  ) : null}
                </View>

                <View style={styles.fieldContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      repositoryNameError ? styles.inputError : null,
                    ]}
                    placeholder="Repository name"
                    value={values.repositoryName}
                    onChangeText={handleChange("repositoryName")}
                    onBlur={handleBlur("repositoryName")}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  {repositoryNameError ? (
                    <Text style={styles.errorText}>{repositoryNameError}</Text>
                  ) : null}
                </View>

                <View style={styles.fieldContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      ratingError ? styles.inputError : null,
                    ]}
                    placeholder="Rating (0-100)"
                    value={values.rating}
                    onChangeText={handleChange("rating")}
                    onBlur={handleBlur("rating")}
                    keyboardType="numeric"
                  />
                  {ratingError ? (
                    <Text style={styles.errorText}>{ratingError}</Text>
                  ) : null}
                </View>

                <View style={styles.fieldContainer}>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Review text (optional)"
                    value={values.text}
                    onChangeText={handleChange("text")}
                    onBlur={handleBlur("text")}
                    multiline
                    numberOfLines={4}
                  />
                </View>

                <Pressable
                  style={[styles.button, !isValid && styles.buttonDisabled]}
                  onPress={formikHandleSubmit}
                  disabled={!isValid}
                >
                  <Text style={styles.buttonText}>Create a review</Text>
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
    backgroundColor: "#e1e4e8",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
  textArea: {
    textAlignVertical: "top",
    paddingTop: 10,
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

export default CreateReview;
