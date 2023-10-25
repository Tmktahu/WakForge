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

      <div class="flex flex-grow-1 align-items-center" style="max-width: 200px">
        <span class="mr-2">Level</span>
        <p-inputNumber v-model="characterLevel" class="number-input mr-2" :min="1" :max="230" @input="saveData($event, 'levelText')" />
        <div class="flex-grow-1">
          <p-slider v-model="characterLevel" :min="1" :max="230" @change="saveData($event, 'levelSlider')" />
        </div>
      </div>
    </div>

    <div class="flex flex-grow-1" style="overflow: auto">
      <div class="stats-area pt-3">
        <StatDisplay />
      </div>

      <div class="flex flex-column flex-grow-1">
        <p-tabView class="main-tab-view" @tab-change="onTabChange">
          <p-tabPanel header="Characteristics">
            <CharacteristicsConfig />
          </p-tabPanel>

          <p-tabPanel header="Equipment">
            <EquipmentSelector ref="equipmentSelector" />
          </p-tabPanel>

          <!-- <p-tabPanel header="Spells">
            <SpellSelector />
          </p-tabPanel> -->
        </p-tabView>
      </div>
    </div>
  </div>

  <div v-else> TODO error page. No current character loaded. Or, make a new character page? </div>
</template>

<script setup>
import { ref, inject, watch, nextTick } from 'vue';

import { CLASS_CONSTANTS } from '@/models/useConstants';

import StatDisplay from '@/components/StatDisplay.vue';
import CharacteristicsConfig from '@/components/CharacteristicsConfig.vue';
import EquipmentSelector from '@/components/EquipmentSelector.vue';

const currentCharacter = inject('currentCharacter');

const equipmentSelector = ref(null);

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
  } else if (inputName === 'levelText') {
    currentCharacter.value.level = event.value;
  } else if (inputName === 'levelSlider') {
    currentCharacter.value.level = event;
    // currentCharacter.value.level = event.value;
  } else if (inputName === 'class') {
    currentCharacter.value.class = event.value;
  }
  updateUI();
};

const onTabChange = () => {
  nextTick(() => {
    equipmentSelector.value.showList();
  });
};
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  background-color: var(--bonta-blue-20);
  border-bottom: 1px solid var(--bonta-blue-60);
}

.stats-area {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  min-width: 400px;
  border-right: 1px solid var(--bonta-blue-60);
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
