import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes.js';

import { createI18n } from 'vue-i18n';
import { i18nMessages } from '@/plugins/i18n/i18nMessages';

import { usePrimeVue } from '@/plugins/usePrimeVue';
import VueTippy from 'vue-tippy';

const app = createApp(App);

app.use(router);

app.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  component: 'tippy', // => <tippy/>
  defaultProps: {
    allowHTML: true,
    zIndex: 999,
  }, // => Global default options * see all props
});

const i18n = createI18n({
  locale: 'en',
  messages: i18nMessages,
  legacy: false,
  // something vue-i18n options here ...
});

app.use(i18n);

usePrimeVue(app);

app.mount('#app');
