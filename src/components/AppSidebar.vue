<template>
  <div class="sidebar px-2 py-2">
    <p-button label="Home" class="w-full text-left" @click="gotoHome" />
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
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: darkgoldenrod;
  width: 100px;
  height: 100vh;
}
</style>
