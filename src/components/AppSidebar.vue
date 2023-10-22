<template>
  <div class="sidebar py-2">
    <p-button label="Home" class="sidebar-button w-full text-left" @click="gotoHome" />
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
  background-color: var(--bonta-blue-50);
  width: 100px;
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
