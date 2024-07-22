<template>
    <div>
      <h1>Home</h1>
      <p>Welcome, {{ user?.name }}</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { computed } from 'vue';
  
  interface user {
    
  }
  const authStore = useAuthStore();
  const user:any = authStore.user;
 
  
  const logout = async () => {
    try {
      await authStore.logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  </script>
  