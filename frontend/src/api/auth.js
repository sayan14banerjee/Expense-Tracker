import axios from "axios";
import CONFIG from "./config";
const API_URL = CONFIG.API_URL;

export const loginUser = async (email, password) => {
  try {
    console.log(API_URL)

    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Login failed";
  }
};

export const signupUser = async (name, email, password) => {
  try {
    console.log(API_URL)

    const response = await axios.post(`${API_URL}/users/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || "Signup failed";
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
