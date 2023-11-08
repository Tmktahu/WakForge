<template>
  <div class="flex align-items-center mb-2">
    <p-inputNumber v-bind="$attrs" class="number-input" />
    <div class="mx-2">{{ label }}</div>
    <tippy placement="left" duration="0">
      <i class="mdi mdi-information-outline" />
      <template v-slot:content>
        <div class="simple-tooltip">{{ tooltipText }}</div>
      </template>
    </tippy>
  </div>
</template>

<script setup>
let props = defineProps({
  label: {
    type: String,
    default: '',
  },
  tooltipText: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped></style>
