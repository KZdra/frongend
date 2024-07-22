<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const authStore = useAuthStore();
  
  const register = async () => {
    try {
      await authStore.register({ name: name.value, email: email.value, password: password.value });
    } catch (error) {
      console.error('Registration failed', error);
    }
  };
  </script>
  