import { createApp, ref } from 'vue';
import App from './App.vue';
import router from './router/routes.js';

import { createI18n } from 'vue-i18n';
import { i18nMessages } from '@/plugins/i18n/i18nMessages';

import { usePrimeVue } from '@/plugins/usePrimeVue';
import VueTippy from 'vue-tippy';

const app = createApp(App);

let globalError = ref(null);
app.provide('globalError', globalError);

app.config.errorHandler = (error, instance, info) => {
  console.error(error);
  globalError.value = error;
};

app.use(router);

app.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  component: 'tippy', // => <tippy/>
  defaultProps: {
    allowHTML: true,
    zIndex: 999,
  }, // => Global default options * see all props
});

const supportedLocales = ['en', 'es', 'fr'];
let startingLocale = 'en';
console.log(navigator.languages);
navigator.languages.some((preferedLocale) => {
  if (supportedLocales.includes(preferedLocale)) {
    startingLocale = preferedLocale;
    return true;
  }
  return false;
});

const i18n = createI18n({
  locale: startingLocale,
  messages: i18nMessages,
  legacy: false,
  // something vue-i18n options here ...
});

app.use(i18n);

usePrimeVue(app);

app.mount('#app');
