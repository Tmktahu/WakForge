<template>
  <div class="mx-5 my-5">
  {{ currentCharacter?.name || 'no current build' }}
  </div>
</template>

<script setup>
import { inject } from 'vue';

const currentCharacter = inject('currentCharacter')
</script>

<style lang="scss" scoped></style>
