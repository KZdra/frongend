<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  
  const email = ref('');
  const password = ref('');
  const authStore = useAuthStore();
  
  const login = async () => {
    try {
      await authStore.login({ email: email.value, password: password.value });
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  </script>
  