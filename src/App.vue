<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  </header> -->

  <div class="flex">
    <Sidebar />
    <router-view />
  </div>
</template>

<script setup>
import { ref, watch, provide, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useCharacterBuilds } from '@/models/useCharacterBuilds.js';

import Sidebar from '@/components/Sidebar.vue';

const route = useRoute();
const router = useRouter();

const showSidebar = ref(true);

const { setup: setupCharacterBuilds, setContext } = useCharacterBuilds();
const { currentBuild, buildList } = setupCharacterBuilds();

const setContextIds = () => {
  setContext();
};

watch(
  [() => route.name, () => route.query],
  () => {
    nextTick(() => {
      setContextIds();
    });
  },
  { immediate: true }
);

provide('currentBuild', currentBuild);
provide('buildList', buildList);
</script>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
