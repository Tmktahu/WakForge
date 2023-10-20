import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { usePrimeVue } from '@/plugins/usePrimeVue';

const app = createApp(App);

app.use(router);
usePrimeVue(app);

app.mount('#app');
