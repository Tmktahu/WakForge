<template>
  <div v-if="currentCharacter" :key="pageKey" class="flex flex-column w-full" style="height: 100%">
    <div class="top-bar py-3 px-3">
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
        <p-inputNumber v-model="characterLevel" class="number-input mr-2" :min="1" :max="230" :allow-empty="false" @input="saveData($event, 'levelText')" />
        <div class="flex-grow-1">
          <p-slider v-model="characterLevel" :min="1" :max="230" @change="saveData($event, 'levelSlider')" />
        </div>
      </div>

      <div class="build-code flex align-items-center ml-2 mr-3">
        <tippy placement="left" duration="0">
          <i class="mdi mdi-information-outline" />
          <template v-slot:content>
            <div class="simple-tooltip">You can copy-paste this code to people to share this build.</div>
          </template>
        </tippy>
        <div class="ml-2">Build Code:</div>
        <div class="code flex align-items-center px-2 py-1 ml-2">
          <span>{{ buildCode }}</span>
        </div>
        <p-button class="py-1 ml-2" label="Copy" @click="onCopyBuildCode" />
        <!-- <p-button class="py-1 ml-2" label="Paste" @click="onPasteBuildCode" /> -->
      </div>
    </div>

    <div class="flex flex-grow-1" style="overflow: auto">
      <div class="stats-area pt-3">
        <StatDisplay />
      </div>

      <div class="flex flex-column flex-grow-1">
        <p-tabView class="main-tab-view" @tab-change="onTabChange">
          <p-tabPanel>
            <template v-slot:header>
              <div class="characteristics-tab-header px-3 h-full" :class="{ error: hasCharacteristicsError, 'points-to-spend': false }">
                <span>Characteristics</span>
                <i class="points-to-spend-icon mdi mdi-arrow-up-bold ml-2" style="font-size: 26px" />
                <i class="error-icon mdi mdi-alert-octagon-outline ml-2" style="font-size: 26px" />
              </div>
            </template>
            <CharacteristicsConfig ref="characteristicsConfig" />
          </p-tabPanel>

          <p-tabPanel>
            <template v-slot:header>
              <div class="flex align-items-center px-3 py-3">
                <span>Equipment</span>
              </div>
            </template>
            <EquipmentSelector ref="equipmentSelector" />
          </p-tabPanel>

          <p-tabPanel>
            <template v-slot:header>
              <div class="flex align-items-center px-3 py-3">
                <span>Auto Item Solver</span>
              </div>
            </template>
            <ItemSolverContent />
          </p-tabPanel>

          <p-tabPanel>
            <template v-slot:header>
              <div class="flex align-items-center px-3 py-3">
                <span>Spells & Passives</span>
              </div>
            </template>
            <SpellSelector />
          </p-tabPanel>
        </p-tabView>
      </div>
    </div>
  </div>

  <div v-else> TODO error page. No current character loaded. Or, make a new character page? </div>
</template>

<script setup>
import { ref, inject, watch, nextTick, computed } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

import { CLASS_CONSTANTS } from '@/models/useConstants';
import { useBuildCodes } from '@/models/useBuildCodes';
import { useCharacterBuilds } from '@/models/useCharacterBuilds';

import StatDisplay from '@/components/StatDisplay.vue';
import CharacteristicsConfig from '@/components/CharacteristicsConfig.vue';
import EquipmentSelector from '@/components/EquipmentSelector.vue';
import SpellSelector from '@/components/SpellSelector.vue';
import ItemSolverContent from '@/components/ItemSolverContent.vue';

const confirm = useConfirm();

const masterData = inject('masterData');
const currentCharacter = inject('currentCharacter');

const needsReload = ref(false);
const pageKey = ref(null);
watch(
  [needsReload, masterData],
  () => {
    if (needsReload.value) {
      pageKey.value = null;
      nextTick(() => {
        needsReload.value = false;
      });
    } else {
      pageKey.value = currentCharacter.id;
    }
  },
  { immediate: true }
);

const equipmentSelector = ref(null);
const characteristicsConfig = ref(null);

const characterName = ref(currentCharacter.value?.name);
const characterLevel = ref(currentCharacter.value?.level);
const characterClass = ref(currentCharacter.value?.class);

const classOptions = Object.entries(CLASS_CONSTANTS).map(([key, value]) => {
  return {
    label: value,
    value: value,
  };
});

const { overwriteCharacterData } = useCharacterBuilds(masterData);
const { createBuildCode, decodeBuildCode, parseBuildData } = useBuildCodes();

const buildCode = computed(() => {
  return createBuildCode(currentCharacter.value);
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

const hasCharacteristicsError = computed(() => {
  return characteristicsConfig.value?.hasCharacteristicsError;
});

const onCopyBuildCode = () => {
  navigator.clipboard.writeText(buildCode.value);
};

// const onPasteBuildCode = async () => {
//   let data = await navigator.clipboard.readText();
//   let decodedData = decodeBuildCode(data);

//   if (decodedData) {
//     confirm.require({
//       group: 'dialog',
//       header: 'Confirmation',
//       message: 'Are you sure? This is an irreversable action and will override your current build.',
//       accept: () => {
//         let parsedData = parseBuildData(decodedData);
//         overwriteCharacterData(parsedData, currentCharacter.value.id);
//         needsReload.value = true;
//       },
//     });
//   }
// };
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
  max-width: 430px;
  min-width: 430px;
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

.characteristics-tab-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 175px;

  .error-icon {
    display: none;
  }

  .points-to-spend-icon {
    display: none;
  }

  &.error {
    padding-top: 1px;
    color: var(--error);
    background-color: var(--error-20);

    .error-icon {
      display: block;
    }
  }

  &.points-to-spend {
    .points-to-spend-icon {
      display: block;
    }
  }
}

.build-code {
  .code {
    height: 32px;
    border: 1px solid var(--bonta-blue-100);
    border-radius: 8px;
    span {
      line-height: 0px;
      word-wrap: break-word;
      max-width: calc(100vw - 933px);
    }
  }
}
</style>
