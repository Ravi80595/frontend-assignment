import axios from "axios";

const API_URL = "http://localhost:8000";

export const getTitles = async () => {
  const response = await axios.get(`${API_URL}/titles`);
  return response.data;
};

export const addTitle = async (title) => {
  const response = await axios.post(`${API_URL}/titles`, title);
  return response.data;
};

export const deleteTitle = async (id) => {
  const response = await axios.delete(`${API_URL}/titles/${id}`);
  return response.data;
};
