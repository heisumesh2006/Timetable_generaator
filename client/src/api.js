import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginUser = (credentials) =>
  axios.post(`${API_URL}/auth/login`, credentials);

export const registerUser = (credentials) =>
  axios.post(`${API_URL}/auth/register`, credentials);

// Add token param to send auth header
export const generateTimetable = (data, token) =>
  axios.post(`${API_URL}/timetable/generate-timetable`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
