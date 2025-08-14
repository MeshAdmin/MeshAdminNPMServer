import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Change this to your API base URL
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
