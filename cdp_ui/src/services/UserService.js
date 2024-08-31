import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Replace with your API URL

const UserService = {
  getAllUsers: (token) => {
    return axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createUser: (userData, token) => {
    return axios.post(`${API_URL}/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUser: (userId, userData, token) => {
    return axios.put(`${API_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteUser: (userId, token) => {
    return axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default UserService;
