// utils/axios.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { getActivePinia } from 'pinia';

axios.defaults.baseURL = 'http://127.0.0.1:8000';

axios.interceptors.request.use((config) => {
  const pinia = getActivePinia();
  if (pinia) {
    const authStore = useAuthStore(pinia);
    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const pinia = getActivePinia();
    if (pinia) {
      const authStore = useAuthStore(pinia);
      await authStore.refreshToken();
      originalRequest.headers.Authorization = `Bearer ${authStore.token}`;
      return axios(originalRequest);
    }
  }
  return Promise.reject(error);
});

export default axios;
