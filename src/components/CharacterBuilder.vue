<template>
  <div v-if="currentCharacter" class="flex flex-column w-full" style="height: 100vh">
    <div class="top-bar py-3 pl-3">
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

    <div class="flex flex-grow-1">
      <div class="stats-area px-3 pt-3">
        <StatDisplay />

        <p-divider />

        <div class="summary-area"> This is where we will display a summary of various conditional and other things </div>
        <!-- <CharacteristicsInput class="mt-5" /> -->
      </div>

      <div class="flex flex-column flex-grow-1">
        <p-tabView class="main-tab-view">
          <p-tabPanel header="Equipment">
            <EquipmentSelector />
          </p-tabPanel>

          <p-tabPanel header="Spells">
            <SpellSelector />
          </p-tabPanel>
        </p-tabView>
      </div>
    </div>
  </div>

  <div v-else> TODO error page. No current character loaded. Or, make a new character page? </div>
</template>

<script setup>
import { ref, inject, watch, computed } from 'vue';

import { CLASS_CONSTANTS } from '@/models/useConstants';

import StatDisplay from '@/components/StatDisplay.vue';
import CharacteristicsInput from '@/components/CharacteristicsInput.vue';
import SpellSelector from '@/components/SpellSelector.vue';
import EquipmentSelector from '@/components/EquipmentSelector.vue';

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
.top-bar {
  display: flex;
  align-items: center;
  background-color: var(--bonta-blue-20);
  border-bottom: 1px solid var(--bonta-blue-100);
}

.stats-area {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  border-right: 1px solid var(--bonta-blue-100);
}

.summary-area {
}

:deep(.main-tab-view) {
  display: flex;
  flex-direction: column;
  height: 100%;

  .p-tabview-panels {
    flex-grow: 1;
  }

  .p-tabview-panel {
    height: 100%;
  }
}

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
