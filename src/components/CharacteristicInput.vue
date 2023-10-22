<template>
  <div class="flex my-1">
    <i class="pi pi-question mr-3" />
    <span class="entry-label">{{ label }}</span>
    <div class="flex-grow-1" />
    <p-inputNumber
      v-bind="$attrs"
      class="number-input"
      show-buttons
      :min="0"
      :max="remainingPoints + $attrs.modelValue"
      button-layout="horizontal"
      increment-button-icon="pi pi-plus"
      decrement-button-icon="pi pi-minus"
      @input="updateFunction"
    />
  </div>
</template>

<script setup>
let props = defineProps({
  updateFunction: {
    type: Function,
    default: () => {},
  },
  label: {
    type: String,
    default: 'No Label',
  },
  model: {
    type: Object,
    default: () => {},
  },
  remainingPoints: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
:deep(.number-input) {
  .p-inputnumber {
    height: 16px;
  }

  .p-inputtext.p-component.p-inputnumber-input {
    border: none;
    height: 16px;
    width: 2rem;
  }
}

.entry-label {
  font-size: 14px;
}
</style>
