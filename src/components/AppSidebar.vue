<template>
  <div class="sidebar">
    <div class="flex justify-content-center mt-3 mb-2"> <p-image :src="wakforgeLogoURL" image-style="width: 60px" /> </div>
    <p-button :label="$t('sidebar.charactersTab')" icon="mdi mdi-account-multiple" class="sidebar-button w-full text-left px-2" @click="gotoCharacters" />
    <!-- <p-button label="AutoBuilder" icon="mdi mdi-creation" class="sidebar-button w-full text-left px-2" @click="gotoAutoBuilder" /> -->
    <p-button :label="$t('sidebar.dataTab')" icon="mdi mdi-graph" class="sidebar-button w-full text-left px-2" @click="gotoData" />

    <div class="flex-grow-1" />
    <p-button
      :label="$t('sidebar.theme')"
      icon="mdi mdi-palette"
      class="sidebar-button w-full text-left px-2"
      aria-haspopup="true"
      aria-controls="theme_menu"
      @click="onTheme"
    />
    <p-button
      :label="$t('sidebar.language')"
      icon="mdi mdi-translate"
      class="sidebar-button w-full text-left px-2"
      aria-haspopup="true"
      aria-controls="language_menu"
      @click="onLanguage"
    />
    <p-button :label="$t('sidebar.discordTab')" icon="mdi mdi-discord" class="sidebar-button w-full text-left px-2" @click="onDiscord" />
    <p-button :label="$t('sidebar.githubTab')" icon="mdi mdi-github" class="sidebar-button w-full text-left px-2" @click="onGithub" />

    <p-menu id="language_menu" ref="languageMenu" :model="languageMenuItems" :popup="true">
      <template v-slot:item="{ item, props }">
        <div v-ripple class="menu-option" :class="{ selected: locale === item.locale }" v-bind="props.action">
          <div class="ml-2">{{ item.label }}</div>
          <div class="flex-grow-1" />
          <i v-if="locale === item.locale" class="mdi mdi-check-bold" />
        </div>
      </template>
    </p-menu>

    <p-menu id="theme_menu" ref="themeMenu" :model="themeMenuItems" :popup="true">
      <template v-slot:item="{ item, props }">
        <div v-ripple class="menu-option" :class="{ selected: currentTheme === item.theme }" v-bind="props.action">
          <div class="ml-2">{{ item.label }}</div>
          <div class="flex-grow-1" />
          <i v-if="currentTheme === item.theme" class="mdi mdi-check-bold" />
        </div>
      </template>
    </p-menu>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { masterData } from '@/models/useStorage';
import { CHARACTERS_ROUTE, DATA_ROUTE } from '@/router/routes.js';

import wakforgeLogoURL from '@/assets/images/branding/wakforge.svg';

const router = useRouter();
const { t, locale } = useI18n({ useScope: 'global' });

// const masterData = inject('masterData');

watch(
  masterData,
  () => {
    nextTick(() => {
      if (masterData.uiTheme && currentTheme.value !== masterData.uiTheme) {
        changeTheme(masterData.uiTheme);
      }

      if (masterData.language && locale.value !== masterData.language) {
        locale.value = masterData.language;
      }
    });
  },
  { immediate: true }
);

const languageMenu = ref(null);
const languageMenuItems = ref([
  {
    label: t('sidebar.language'),
    items: [
      {
        label: t('sidebar.english'),
        locale: 'en',
        command: () => {
          locale.value = 'en';
          masterData.language = 'en';
        },
      },
      {
        label: t('sidebar.spanish'),
        locale: 'es',
        command: () => {
          locale.value = 'es';
          masterData.language = 'es';
        },
      },
      {
        label: t('sidebar.french'),
        locale: 'fr',
        command: () => {
          locale.value = 'fr';
          masterData.language = 'fr';
        },
      },
    ],
  },
]);

const themeMenu = ref(null);
const currentTheme = ref('bonta');
const themeMenuItems = ref([
  {
    label: t('sidebar.colorTheme'),
    items: [
      { label: t('sidebar.bonta'), theme: 'bonta', command: () => changeTheme('bonta') },
      { label: t('sidebar.brakmar'), theme: 'brakmar', command: () => changeTheme('brakmar') },
      { label: t('sidebar.amakna'), theme: 'amakna', command: () => changeTheme('amakna') },
      { label: t('sidebar.sufokia'), theme: 'sufokia', command: () => changeTheme('sufokia') },
    ],
  },
]);

const gotoCharacters = () => {
  router.push({
    name: CHARACTERS_ROUTE,
  });
};

// const gotoAutoBuilder = () => {
//   router.push({
//     name: AUTO_BUILDER_ROUTE,
//   });
// };

const gotoData = () => {
  router.push({
    name: DATA_ROUTE,
  });
};

const onGithub = () => {
  window.open('https://github.com/Tmktahu/wakforge', '_blank').focus();
};

const onDiscord = () => {
  window.open('https://discord.gg/k3v2fXQWJp', '_blank').focus();
};

const onLanguage = (event) => {
  languageMenu.value.toggle(event);
};

const onTheme = () => {
  themeMenu.value.toggle(event);
};

const changeTheme = (type) => {
  let categories = ['primary', 'secondary', 'background', 'highlight'];

  for (let categoryIndex in categories) {
    for (let colorIndex = 1; colorIndex <= 9; colorIndex++) {
      document.documentElement.style.setProperty(
        `--${categories[categoryIndex]}-${colorIndex}0`,
        getComputedStyle(document.documentElement).getPropertyValue(`--${type}-${categories[categoryIndex]}-${colorIndex}0`)
      );
    }
  }

  currentTheme.value = type;
  masterData.uiTheme = type;
};
</script>

<style lang="scss" scoped>
@use 'sass:color';
@import '@/design/variables';

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--primary-20);
  max-width: 129px;
  min-width: 129px;
  height: 100vh;
  border-right: 1px solid var(--highlight-50);
}

.sidebar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  background-color: var(--primary-30);
  border-radius: 0;

  &:hover {
    background-color: var(--primary-50);
  }
}

.menu-option {
  display: flex;
  align-items: center;
  background-color: var(--transparent);
  &.selected {
    background-color: var(--primary-20);
  }
}
</style>
