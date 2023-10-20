<template>
  <div class="mx-5 my-5">
  {{ currentBuild?.name || 'no current build' }}
  </div>
</template>

<script setup>
import { inject } from 'vue';

const currentBuild = inject('currentBuild')
</script>

<style lang="scss" scoped></style>
