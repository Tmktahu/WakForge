<template>
  <div class="sidebar">
    <div class="flex justify-content-center mt-3 mb-2"> <p-image :src="wakforgeLogoURL" image-style="width: 60px" /> </div>
    <p-button label="Characters" icon="mdi mdi-account-multiple" class="sidebar-button w-full text-left px-2" @click="gotoCharacters" />
    <p-button label="AutoBuilder" icon="mdi mdi-creation" class="sidebar-button w-full text-left px-2" @click="gotoAutoBuilder" />
    <p-button label="Data" icon="mdi mdi-graph" class="sidebar-button w-full text-left px-2" @click="gotoData" />

    <div class="flex-grow-1" />
    <p-button label="Discord" icon="mdi mdi-discord" class="sidebar-button w-full text-left px-2" @click="onDiscord" />
    <p-button label="Github" icon="mdi mdi-github" class="sidebar-button w-full text-left px-2" @click="onGithub" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { CHARACTERS_ROUTE, AUTO_BUILDER_ROUTE, DATA_ROUTE } from '@/router/routes.js';

import wakforgeLogoURL from '@/assets/images/branding/wakforge.svg';

const router = useRouter();

const gotoCharacters = () => {
  router.push({
    name: CHARACTERS_ROUTE,
  });
};

const gotoAutoBuilder = () => {
  router.push({
    name: AUTO_BUILDER_ROUTE,
  });
};

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
</style>
