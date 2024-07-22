// stores/auth.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || '');

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  };

  const clearToken = () => {
    token.value = '';
    localStorage.removeItem('token');
  };

  const login = async (credentials: { email: string, password: string }) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      setToken(response.data.access_token);
      await fetchUser();
      router.push({ name: 'home' });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (credentials: { name: string, email: string, password: string }) => {
    try {
      await axios.post('/api/auth/register', credentials);
      await login(credentials);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      clearToken();
      user.value = null;
      router.push({ name: 'login' });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.post('/api/auth/me', {}, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
      user.value = response.data;
    } catch (error) {
      console.error('Fetch user error:', error);
      logout();
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.post('/api/auth/refresh', {}, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      });
      setToken(response.data.access_token);
    } catch (error) {
      console.error('Refresh token error:', error);
      logout();
    }
  };

  return { user, token, login, register, logout, fetchUser, refreshToken };
});
