<template>
  <div class="flex align-items-center my-1">
    <p-image :src="imagePath" style="height: 20px" image-style="height: 20px" />
    <span class="entry-label ml-2">{{ label }}</span>
    <div class="flex-grow-1" />
    <p-inputNumber
      v-bind="$attrs"
      class="number-input"
      show-buttons
      :min="0"
      :max="Math.min(maxOverride, remainingPoints + $attrs.modelValue)"
      button-layout="horizontal"
      increment-button-icon="pi pi-plus"
      decrement-button-icon="pi pi-minus"
      :allow-empty="false"
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
  imagePath: {
    type: String,
    default: '',
  },
  maxOverride: {
    type: Number,
    default: 200,
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

  input {
    text-align: center;
  }
}

.entry-label {
  font-size: 14px;
}
</style>
