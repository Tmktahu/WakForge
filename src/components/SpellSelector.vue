<template>
  <div>
    <div class="spells-container">
      <template v-for="key in Object.keys(currentCharacter.activeSpells)" :key="key">
        <div class="spell-selector-wrapper">
          <p-dropdown v-model="currentCharacter.activeSpells[key].assignedSpell" class="spell-dropdown" :options="spellOptions" @change="onChange($event, key)">
            <template v-slot:value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/spells/${slotProps.value.iconId}.png`" image-style="width: 40px" />
              </div>
              <span v-else> ??? </span>
            </template>

            <template v-slot:option="slotProps">
              <div class="flex align-items-center">
                <div class="mr-2" style="height: 40px">
                  <p-image :src="`https://tmktahu.github.io/WakfuAssets/spells/${slotProps.option.iconId}.png`" image-style="width: 40px" />
                </div>
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </p-dropdown>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';

import { useSpells } from '@/models/useSpells';

const currentCharacter = inject('currentCharacter');

// const currentActiveSpells = computed(() => currentCharacter.activeSpells)

const { getClassSpells } = useSpells();
const spellOptions = computed(() => {
  return getClassSpells(currentCharacter.value.class);
});

const onChange = (event, slotKey) => {
  Object.keys(currentCharacter.value.activeSpells).forEach((key) => {
    if (key !== slotKey && currentCharacter.value.activeSpells[key]?.assignedSpell?.id === event.value.id) {
      currentCharacter.value.activeSpells[key].assignedSpell = null;
    }
  });
};
</script>

<style lang="scss" scoped>
.spells-container {
  display: flex;
  gap: 0.25rem;
  max-width: 500px;
  flex-wrap: wrap;
}

:deep(.spell-dropdown) {
  .p-dropdown-trigger {
    display: none;
  }

  .p-dropdown-label {
    padding: 0;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;

    .p-image {
      height: 40px;
    }
  }
}

:global(.p-dropdown-item) {
  padding: 5px 10px;
}

:global(.p-dropdown-item > .p-image) {
  height: 40px;
}
</style>
