import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import SignInContainer from "../components/SignInContainer";

describe("SignInContainer", () => {
  describe("Form submission", () => {
    it("should call onSubmit with correct values when form is submitted", async () => {
      const mockOnSubmit = jest.fn();

      render(<SignInContainer onSubmit={mockOnSubmit} />);

      const usernameInput = screen.getByTestId("usernameInput");
      const passwordInput = screen.getByTestId("passwordInput");
      const submitButton = screen.getByTestId("submitButton");

      fireEvent.changeText(usernameInput, "kalle");
      fireEvent.changeText(passwordInput, "password");

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
          username: "kalle",
          password: "password",
        });
      });
    });

    it("should not call onSubmit if username is missing", async () => {
      const mockOnSubmit = jest.fn();

      render(<SignInContainer onSubmit={mockOnSubmit} />);

      const passwordInput = screen.getByTestId("passwordInput");
      const submitButton = screen.getByTestId("submitButton");

      fireEvent.changeText(passwordInput, "password");

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it("should not call onSubmit if password is missing", async () => {
      const mockOnSubmit = jest.fn();

      render(<SignInContainer onSubmit={mockOnSubmit} />);

      const usernameInput = screen.getByTestId("usernameInput");
      const submitButton = screen.getByTestId("submitButton");

      fireEvent.changeText(usernameInput, "kalle");

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).not.toHaveBeenCalled();
      });
    });

    it("should disable submit button when form is invalid", () => {
      const mockOnSubmit = jest.fn();

      render(<SignInContainer onSubmit={mockOnSubmit} />);

      const submitButton = screen.getByTestId("submitButton");

      expect(submitButton.props.disabled).toBe(true);
    });

    it("should enable submit button when form is valid", async () => {
      const mockOnSubmit = jest.fn();

      render(<SignInContainer onSubmit={mockOnSubmit} />);

      const usernameInput = screen.getByTestId("usernameInput");
      const passwordInput = screen.getByTestId("passwordInput");
      const submitButton = screen.getByTestId("submitButton");

      fireEvent.changeText(usernameInput, "kalle");

      await waitFor(() => {
        expect(submitButton.props.disabled).toBe(true);
      });

      fireEvent.changeText(passwordInput, "password");

      await waitFor(() => {
        expect(submitButton.props.disabled).toBe(false);
      });
    });
  });
});
