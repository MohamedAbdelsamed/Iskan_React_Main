// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mbrh-testing.azure-api.net',
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token or custom headers here
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling
    if (error.response.status === 401) {
      // Handle unauthorized access
      console.warn("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default api;
