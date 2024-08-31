import axios from 'axios';

// Create an instance of axios with a base URL
const apiService = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Replace with your actual API base URL
});

// Define a login function
export const login = async (email, password) => {
  try {
    const response = await apiService.post('/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Define a register function
export const register = async (name, email, password, cPassword, tc , isAdmin) => {
  try {
    const response = await apiService.post('/register', { name, email, password, c_password: cPassword, tc , isAdmin });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Set the token in the header for each request
apiService.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // Adjust if using a different storage method or key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the apiService instance if needed elsewhere
export { apiService };
