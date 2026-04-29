import axios from 'axios';

// Get the API base URL from environment variables (Vite uses VITE_ prefix)
// In development, this will likely be empty because of the Vite proxy.
// In production, this will be your Railway URL.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const api = axios.create({
    baseURL: BASE_URL,
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Optional: Handle auto-logout or redirect here
            console.error('Unauthorized! Logging out...');
        }
        return Promise.reject(error);
    }
);

export default api;
