// App.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Auth from "./components/Auth"; // Adjust the path if necessary
import axios from "axios";

// Mock axios to avoid real API calls
jest.mock("axios");

describe("Auth Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders login form by default", () => {
    render(<Auth />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Don't have an Account SignUp")).toBeInTheDocument();
  });

  test("toggles to registration form when clicking 'SignUp'", () => {
    render(<Auth />);
    fireEvent.click(screen.getByText("Don't have an Account SignUp"));
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByText("Already have an account? Login")).toBeInTheDocument();
  });

  test("calls login API on form submission", async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { token: "test_token" },
    });

    render(<Auth />);
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/auth/login",
      { email: "test@example.com", password: "password123" }
    ));
  });

  test("calls register API on form submission", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(<Auth />);
    fireEvent.click(screen.getByText("Don't have an Account SignUp"));
    fireEvent.change(screen.getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8000/api/v1/auth/register",
      { username: "testuser", email: "test@example.com", password: "password123" }
    ));
  });

  test("shows error message on API failure", async () => {
    axios.post.mockRejectedValueOnce(new Error("Authentication failed."));

    render(<Auth />);
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpassword" } });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => expect(screen.getByText("Authentication failed.")).toBeInTheDocument());
  });
});
