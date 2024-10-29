import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Auth from "./Auth";
import axios from "axios";

jest.mock("axios");

describe("Auth Component", () => {
  test("renders login form initially", () => {
    render(<Auth />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email*")).toBeInTheDocument();
    expect(screen.getByLabelText("Password*")).toBeInTheDocument();
  });

  test("toggles to register form on button click", () => {
    render(<Auth />);
    fireEvent.click(screen.getByText("Don't have an Account SignUp"));
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByLabelText("Username*")).toBeInTheDocument();
  });

  test("handles login with valid credentials", async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { token: "mock-token" }
    });
    render(<Auth />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" }
    });
    fireEvent.click(screen.getByText("Login"));

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/api/v1/auth/login", {
      email: "test@example.com",
      password: "password"
    });
  });

  test("handles registration with valid data", async () => {
    axios.post.mockResolvedValue({ status: 200 });
    render(<Auth />);
    fireEvent.click(screen.getByText("Don't have an Account SignUp"));
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "username" }
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" }
    });
    fireEvent.click(screen.getByText("Register"));

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8000/api/v1/auth/register", {
      username: "username",
      email: "test@example.com",
      password: "password"
    });
  });

  test("shows an error message if authentication fails", async () => {
    axios.post.mockRejectedValue(new Error("Authentication failed"));
    render(<Auth />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "invalid@example.com" }
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" }
    });
    fireEvent.click(screen.getByText("Login"));

    expect(await screen.findByText("Authentication failed.")).toBeInTheDocument();
  });
});
