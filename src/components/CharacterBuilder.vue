<template>
  <div v-if="currentCharacter" class="flex flex-column mx-5 my-5 w-full">
    <div class="flex">
      <p-inputText v-model="characterName" @input="saveData($event, 'name')" />

      <div class="flex flex-grow-1 align-items-center mt-4">
        <span class="mr-2">Level</span>
        <p-inputNumber v-model="characterLevel" class="number-input mr-2" :min="0" :max="230" @input="saveData($event, 'level')" />
        <div class="flex-grow-1">
          <p-slider v-model="characterLevel" :max="230" @input="saveData($event, 'level')" />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="flex flex-column mt-5">
        <StatDisplay />

        <CharacteristicsInput class="mt-5" />
      </div>

      <div class="flex flex-column mt-5"> test </div>
    </div>
  </div>

  <div v-else> TODO error page. No current character loaded. Or, make a new character page? </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue';

import StatDisplay from '@/components/StatDisplay.vue';
import CharacteristicsInput from '@/components/CharacteristicsInput.vue';

const currentCharacter = inject('currentCharacter');

const characterName = ref(currentCharacter.value?.name);
const characterLevel = ref(currentCharacter.value?.level);

watch(currentCharacter, () => {
  updateUI();
});

const updateUI = () => {
  characterName.value = currentCharacter.value?.name;
  characterLevel.value = currentCharacter.value?.level;
};

const saveData = (event, inputName) => {
  if (inputName === 'name') {
    currentCharacter.value.name = event.target.value;
  } else if (inputName === 'level') {
    currentCharacter.value.level = event.value;
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
