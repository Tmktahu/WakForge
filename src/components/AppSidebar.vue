<template>
  <div class="sidebar">
    <div class="flex justify-content-center mt-3 mb-2"> <p-image src="../src/assets/images/branding/wakforge.svg" image-style="width: 60px" /> </div>
    <p-button label="Home" class="sidebar-button w-full text-left px-2" @click="gotoHome" />

    <div class="flex-grow-1" />
    <!-- <p-button label="DM Fryke" icon="mdi mdi-discord" class="sidebar-button w-full text-left px-2" @click="onMessageFryke" /> -->
    <p-button label="Github" icon="mdi mdi-github" class="sidebar-button w-full text-left px-2" @click="onGithub" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { HOME_ROUTE } from '@/router/routes.js';

const router = useRouter();

const gotoHome = () => {
  // go to the builder page
  router.push({
    name: HOME_ROUTE,
  });
};

const onMessageFryke = () => {
  window.open('https://discordapp.com/channels/@me/143815222740647937/', '_blank').focus();
};

const onGithub = () => {
  window.open('https://github.com/Tmktahu/wakforge', '_blank').focus();
};
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--bonta-blue-50);
  width: 110px;
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
