<template>
  <div class="flex flex-column mx-5 my-5">
    <span>Home page</span>
    <span>Here we can display a list of loaded builds?</span>
    <span>Links to discord and repo and contact info?</span>


    <div class="flex flex-column">
      <template v-for="build in buildList" :key="build.id">
        <div class="build-entry mt-2" @click="gotoBuild(build.id)">{{ build.name }}</div>
      </template>
    </div>

  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

import { CHARACTER_BUILDER_ROUTE } from '@/router/routes.js';

const router = useRouter();

const buildList = inject('buildList');

const gotoBuild = (id) => {
  router.push({
    name: CHARACTER_BUILDER_ROUTE,
    params: {
      buildId: id,
    }
  });
}
</script>

<style lang="scss" scoped>
.build-entry {
  cursor: pointer;
  background: lightgreen;
}
</style>
