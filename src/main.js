import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes.js';

import { createI18n } from 'vue-i18n';
import { i18nMessages } from '@/plugins/i18nMessages';

import { usePrimeVue } from '@/plugins/usePrimeVue';

const app = createApp(App);

app.use(router);

const i18n = createI18n({
    locale: 'en',
    messages: i18nMessages
    // something vue-i18n options here ...
})

app.use(i18n);

usePrimeVue(app);

app.mount('#app');
