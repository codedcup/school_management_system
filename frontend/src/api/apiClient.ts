import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Create an Axios instance with a base URL and default headers
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your API base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to include the authentication token from storage
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken'); // or use your global state
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error('Server Error:', error.response.status, error.response.data);
      // Optionally handle specific status codes (e.g., redirect on 401)
      if (error.response.status === 401) {
        console.error('Unauthorized - redirecting to login.');
      }
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Network Error:', error.message);
    } else {
      // Error setting up the request
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;