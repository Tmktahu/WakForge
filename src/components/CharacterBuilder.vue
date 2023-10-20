<template>
  <div v-if="currentCharacter" class="flex flex-column mx-5 my-5 w-full">
    <div class="flex align-items-center">
      <p-inputText v-model="characterName" class="mr-2" @input="saveData($event, 'name')" />

      <p-dropdown
        v-model="characterClass"
        :options="classOptions"
        placeholder="Select a Class"
        option-value="value"
        class="mr-2"
        @change="saveData($event, 'class')"
      >
        <template v-slot:value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center">
            <div class="capitalize">{{ slotProps.value }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>

        <template v-slot:option="slotProps">
          <div class="flex align-items-center">
            <div class="capitalize">{{ slotProps.option.label }}</div>
          </div>
        </template>
      </p-dropdown>

      <div class="flex flex-grow-1 align-items-center">
        <span class="mr-2">Level</span>
        <p-inputNumber v-model="characterLevel" class="number-input mr-2" :min="0" :max="230" @input="saveData($event, 'level')" />
        <div class="flex-grow-1">
          <p-slider v-model="characterLevel" :max="230" @input="saveData($event, 'level')" />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="flex flex-column mt-5 mr-5">
        <StatDisplay />

        <CharacteristicsInput class="mt-5" />
      </div>

      <div class="flex flex-column mt-5">
        <SpellSelector />
      </div>
    </div>
  </div>

  <div v-else> TODO error page. No current character loaded. Or, make a new character page? </div>
</template>

<script setup>
import { ref, inject, watch, computed } from 'vue';

import { CLASS_CONSTANTS } from '@/models/useCharacterBuilds';

import StatDisplay from '@/components/StatDisplay.vue';
import CharacteristicsInput from '@/components/CharacteristicsInput.vue';
import SpellSelector from '@/components/SpellSelector.vue';

const currentCharacter = inject('currentCharacter');

const characterName = ref(currentCharacter.value?.name);
const characterLevel = ref(currentCharacter.value?.level);
const characterClass = ref(currentCharacter.value?.class);

const classOptions = Object.entries(CLASS_CONSTANTS).map(([key, value]) => {
  return {
    label: value,
    value: value,
  };
});

watch(currentCharacter, () => {
  updateUI();
});

const updateUI = () => {
  characterName.value = currentCharacter.value?.name;
  characterLevel.value = currentCharacter.value?.level;
  characterClass.value = currentCharacter.value?.class;
};

const saveData = (event, inputName) => {
  if (inputName === 'name') {
    currentCharacter.value.name = event.target.value;
  } else if (inputName === 'level') {
    currentCharacter.value.level = event.value;
  } else if (inputName === 'class') {
    currentCharacter.value.class = event.value;
  }
  updateUI();
};
</script>

<style lang="scss" scoped>
:deep(.number-input) {
  .p-inputtext {
    padding: 5px !important;
    width: 40px;
  }

  .p-inputnumber-button {
    padding: 0;
    width: 1rem;
  }
}
</style>
