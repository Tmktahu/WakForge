<template>
  <div class="sidebar">
    <div class="flex justify-content-center mt-3 mb-2"> <p-image :src="wakforgeLogoURL" image-style="width: 60px" /> </div>
    <p-button :label="$t('sidebar.charactersTab')" icon="mdi mdi-account-multiple" class="sidebar-button w-full text-left px-2" @click="gotoCharacters" />
    <!-- <p-button label="AutoBuilder" icon="mdi mdi-creation" class="sidebar-button w-full text-left px-2" @click="gotoAutoBuilder" /> -->
    <p-button :label="$t('sidebar.dataTab')" icon="mdi mdi-graph" class="sidebar-button w-full text-left px-2" @click="gotoData" />

    <div class="flex-grow-1" />
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
        <div v-ripple class="language-option" :class="{ selected: locale === item.locale }" v-bind="props.action">
          <div class="ml-2">{{ item.label }}</div>
          <div class="flex-grow-1" />
          <i v-if="locale === item.locale" class="mdi mdi-check-bold" />
        </div>
      </template>
    </p-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { CHARACTERS_ROUTE, DATA_ROUTE } from '@/router/routes.js';

import wakforgeLogoURL from '@/assets/images/branding/wakforge.svg';

const router = useRouter();
const { t, locale } = useI18n({ useScope: 'global' });

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
        },
      },
      {
        label: t('sidebar.spanish'),
        locale: 'es',
        command: () => {
          locale.value = 'es';
        },
      },
      {
        label: t('sidebar.french'),
        locale: 'fr',
        command: () => {
          locale.value = 'fr';
        },
      },
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
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--bonta-blue-50);
  max-width: 130px;
  min-width: 130px;
  height: 100vh;
}

.sidebar-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  background-color: var(--bonta-blue-60);
  color: white;
  border-radius: 0;

  &:hover {
    background-color: var(--bonta-blue-100);
  }
}

.language-option {
  display: flex;
  align-items: center;
  background-color: var(--transparent);
  &.selected {
    background-color: var(--bonta-blue-50);
  }
}
</style>
