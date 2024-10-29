import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/auth";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", response.data.token);
};

export const register = async (username,email, password) => {
  console.log(username,email,password)
  const response = await axios.post(`${API_URL}/register`, { username, email, password });
  localStorage.setItem("token", response.data.token);
};
