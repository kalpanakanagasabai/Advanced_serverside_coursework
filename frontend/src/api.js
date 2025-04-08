import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const register = async (username, password) => {
  return await axios.post(`${API_URL}/auth/register`, { username, password });
};

export const login = async (username, password) => {
  return await axios.post(`${API_URL}/auth/login`, { username, password });
};

export const fetchCountryData = async (apiKey) => {
  return await axios.get(`${API_URL}/country/data`, {
    headers: { 'x-api-key': apiKey }
  });
};
