// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from './utils/axios'; // Ensure Axios configuration is imported

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

app.mount('#app');
