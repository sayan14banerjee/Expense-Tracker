import axios from "axios";
import CONFIG from "./config";
const API_URL = CONFIG.API_URL;

const getToken = () => localStorage.getItem("token")

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${token}` };
};

/**
 * Create a new expense
 * payload: { title, amount, category, date }
 */
export const createExpense = async (expense) => {
  try {
    const response = await axios.post(`${API_URL}/expenses`, expense, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || error.message;
  }
};

/**
 * Get all expenses
 */
export const getAllExpenses = async () => {
  try {
    const response = await axios.get(`${API_URL}/expenses`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || error.message;
  }
};

/**
 * Get expenses by date
 * date: "YYYY-MM-DD"
 */
export const getExpensesByDate = async (date) => {
  try {
    const response = await axios.get(`${API_URL}/expenses/date/${date}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || error.message;
  }
};

/**
 * Get expenses by category
 * category: "Food" | "Transport" | "Entertainment" | "Others"
 */
export const getExpensesByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/expenses/category/${category}`, {
     headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || error.message;
  }
};

/**
 * Get monthly expenses summary
 * year: 2025, month: 9
 */
// export const getMonthlyExpenses = async (year, month) => {
//   try {
//     const response = await axios.get(`${API_URL}/expenses/month/${year}/${month}`, {
//       headers: { Authorization: `Bearer ${getToken()}` },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.detail || error.message;
//   }
// };

/**
 * Get total expenses
 */
// export const getTotalExpenses = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/expenses/summary/total`, {
//       headers: { Authorization: `Bearer ${getToken()}` },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.detail || error.message;
//   }
// };

/**
 * Get expenses summary per category
 */
// export const getCategoryTotals = async () => {
//   try {
//     const response = await axios.get(`${API_URL}expenses/summary/category`, {
//       headers: { Authorization: `Bearer ${getToken()}` },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.detail || error.message;
//   }
// };

/**
 * Delete an expense by ID
 */
// export const deleteExpense = async (id) => {
//   try {
//     const response = await axios.delete(`${API_URL}/expenses/${id}`, {
//      headers: { Authorization: `Bearer ${getToken()}` },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.detail || error.message;
//   }
// };

/**
 * Update an expense by ID
 * payload: { title?, amount?, category?, date? }
 */
export const updateExpense = async (id, payload) => {
  try {
    const response = await axios.put(`${API_URL}/expenses/${id}`, payload, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.detail || error.message;
  }
};
