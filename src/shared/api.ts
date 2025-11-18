import axios from 'axios';

// Configure default axios base URL so relative requests go to the Django backend
axios.defaults.baseURL = (import.meta.env?.VITE_API_BASE_URL as string) || 'http://localhost:8000';

// Keep credentials so session cookie auth works if used
axios.defaults.withCredentials = true;

// Attach Token header automatically when present in localStorage.
axios.interceptors.request.use((config) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers = config.headers || {};
      (config.headers as Record<string, any>)['Authorization'] = `Token ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

export default axios;
