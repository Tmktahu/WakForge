<template>
  <div v-if="currentCharacter" :key="currentCharacter.id" class="flex flex-column w-full" style="height: 100%">
    <div class="top-bar py-3 px-3">
      <p-inputText v-model="characterName" class="mr-2 py-2 px-2" @input="saveData($event, 'name')" />

      <p-dropdown
        v-model="characterClass"
        :options="classOptions"
        :placeholder="$t('characterSheet.selectAClass')"
        option-label="id"
        class="class-selector mr-2 pr-2"
        @change="saveData($event, 'class')"
      >
        <template v-slot:value="slotProps">
          <div v-if="slotProps.value" class="flex align-items-center pl-2">
            <p-image class="class-image mr-2" :src="`https://tmktahu.github.io/WakfuAssets/classes/${slotProps.value.id}.png`" image-style="width: 28px" />
            <div class="py-2">{{ $t(slotProps.value.name) }}</div>
          </div>
          <span v-else class="flex align-items-center">
            <p-image class="class-image mx-2" :src="addCompanionIconURL" image-style="width: 28px" />
            <div class="py-2"> {{ slotProps.placeholder }}</div>
          </span>
        </template>

        <template v-slot:option="slotProps">
          <div class="flex align-items-center">
            <div class="capitalize">{{ $t(slotProps.option.name) }}</div>
          </div>
        </template>
      </p-dropdown>

      <div class="flex flex-grow-1 align-items-center" style="max-width: 200px; min-width: 200px">
        <span class="mr-2">{{ $t('characterSheet.level') }}</span>
        <p-inputNumber v-model="characterLevel" class="number-input mr-2" :min="1" :max="230" :allow-empty="false" @input="saveData($event, 'levelText')" />
        <div class="flex-grow-1">
          <p-slider v-model="characterLevel" :min="1" :max="230" @change="saveData($event, 'levelSlider')" />
        </div>
      </div>

      <div class="flex-grow-1" />

      <div class="build-code flex align-items-center ml-2 mr-3">
        <tippy placement="left" duration="0">
          <i class="mdi mdi-information-outline" />
          <template v-slot:content>
            <div class="simple-tooltip">{{ $t('characterSheet.buildCopyPaste') }}</div>
          </template>
        </tippy>
        <div class="ml-2">{{ $t('characterSheet.buildCode') }}:</div>
        <div class="code flex align-items-center px-2 py-1 ml-2" @click="onCopyBuildCode">
          <span>{{ buildCode }}</span>
        </div>
        <p-button class="py-1 ml-2 px-2" :label="$t('characterSheet.copy')" @click="onCopyBuildCode" />
        <div class="code-disclaimer">
          <tippy placement="bottom" duration="0">
            <i class="mdi mdi-information-outline" />
            <template v-slot:content>
              <div class="simple-tooltip">{{ $t('characterSheet.codeInfo') }}</div>
            </template>
          </tippy>
          <div class="ml-1">{{ $t('characterSheet.codeDisclaimer') }}</div>
        </div>
        <!-- <p-button class="py-1 ml-2" label="Paste" @click="onPasteBuildCode" /> -->
      </div>
    </div>

    <div class="flex flex-grow-1" style="overflow: auto">
      <div class="stats-area">
        <StatDisplay />
      </div>

      <div class="flex flex-column flex-grow-1">
        <p-tabView class="main-tab-view" @tab-change="onTabChange">
          <p-tabPanel>
            <template v-slot:header>
              <div class="tab-header">
                <span>{{ $t('sidebar.guidesTab') }}</span>
              </div>
            </template>
            <GuidesTabContent />
          </p-tabPanel>

          <p-tabPanel>
            <template v-slot:header>
              <div
                class="tab-header characteristics-tab-header"
                :class="{ error: hasCharacteristicsError, 'points-to-spend': hasCharacteristicsPointsToSpend && !hasCharacteristicsError }"
              >
                <span>{{ $t('characterSheet.characteristics') }}</span>
                <i class="points-to-spend-icon mdi mdi-arrow-up-bold ml-1" style="font-size: 20px" />
                <i class="error-icon mdi mdi-alert-octagon-outline ml-1" style="font-size: 20px" />
              </div>
            </template>
            <CharacteristicsTabContent ref="characteristicsTabContent" />
          </p-tabPanel>

          <p-tabPanel>
            <template v-slot:header>
              <div class="tab-header">
                <span>{{ $t('characterSheet.equipment') }}</span>
              </div>
            </template>
            <EquipmentTabContent ref="equipmentTabContent" />
          </p-tabPanel>

          <p-tabPanel>
            <template v-slot:header>
              <div class="tab-header">
                <span>{{ $t('characterSheet.autoItemSolver') }}</span>
              </div>
            </template>
            <ItemSolverTabContent />
          </p-tabPanel>

          <p-tabPanel>
            <template v-slot:header>
              <div class="tab-header">
                <span>{{ $t('characterSheet.runesAndSubs') }}</span>
              </div>
            </template>
            <RunesSubsTabContent ref="runesAndSubsTabContent" />
          </p-tabPanel>

          <p-tabPanel>
            <template v-slot:header>
              <div class="tab-header">
                <span>{{ $t('characterSheet.spellsAndPassives') }}</span>
              </div>
            </template>
            <SpellTabContent />
          </p-tabPanel>
        </p-tabView>
      </div>
    </div>
  </div>

  <div v-else class="px-5 mt-5"> No Character data found for the given ID. </div>
</template>

<script setup>
import { ref, inject, watch, nextTick, computed } from 'vue';

import { CLASS_CONSTANTS } from '@/models/useConstants';
import { useBuildCodes } from '@/models/useBuildCodes';

import StatDisplay from '@/components/characterSheet/StatDisplay.vue';
import GuidesTabContent from '@/components/characterSheet/GuidesTabContent.vue';
import CharacteristicsTabContent from '@/components/characterSheet/CharacteristicsTabContent.vue';
import EquipmentTabContent from '@/components/characterSheet/EquipmentTabContent.vue';
import SpellTabContent from '@/components/characterSheet/SpellTabContent.vue';
import ItemSolverTabContent from '@/components/characterSheet/ItemSolverTabContent.vue';
import RunesSubsTabContent from '@/components/characterSheet/RunesSubsTabContent.vue';

import addCompanionIconURL from '@/assets/images/ui/addCompanion.png';

import { useToast } from 'primevue/usetoast';
const toast = useToast();

const currentCharacter = inject('currentCharacter');

const equipmentTabContent = ref(null);
const characteristicsTabContent = ref(null);
const runesAndSubsTabContent = ref(null);

const characterName = ref(currentCharacter.value?.name);
const characterLevel = ref(currentCharacter.value?.level);
const characterClass = ref(CLASS_CONSTANTS[currentCharacter.value?.class]);

const classOptions = Object.entries(CLASS_CONSTANTS).map(([key, value]) => {
  return value;
});

const { createBuildCode } = useBuildCodes();

const buildCode = computed(() => {
  return createBuildCode(currentCharacter.value);
});

watch(currentCharacter, () => {
  updateUI();
});

const updateUI = () => {
  characterName.value = currentCharacter.value?.name;
  characterLevel.value = currentCharacter.value?.level;
  characterClass.value = CLASS_CONSTANTS[currentCharacter.value?.class];
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
    currentCharacter.value.class = event.value.id;
  }
  updateUI();
};

const onTabChange = () => {
  nextTick(() => {
    equipmentTabContent.value.showList();
    runesAndSubsTabContent.value.showLists();
  });
};

const hasCharacteristicsError = computed(() => {
  return characteristicsTabContent.value?.hasCharacteristicsError;
});

const hasCharacteristicsPointsToSpend = computed(() => {
  return characteristicsTabContent.value?.hasCharacteristicsPointsToSpend;
});

const onCopyBuildCode = () => {
  navigator.clipboard.writeText(buildCode.value);

  toast.add({ severity: 'info', summary: 'Build Code copied to clipboard', life: 3000 });
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
  background-color: var(--primary-10);
  border-bottom: 1px solid var(--highlight-50);
}

.stats-area {
  display: flex;
  flex-direction: column;
  max-width: 430px;
  min-width: 430px;
  border-right: 1px solid var(--highlight-50);
}

:deep(.main-tab-view) {
  display: flex;
  flex-direction: column;
  height: 100%;
  .p-tabview-panels {
    flex-grow: 1;
    height: calc(100% - 52px);
  }

  .p-tabview-nav-container {
    height: 40px;
  }

  .p-tabview-panel,
  .p-tabview-nav,
  .p-tabview-nav-content {
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

.tab-header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  background-color: var(--background-20);
  border-right: 1px solid var(--background-50);
}

@media (max-width: 1380px) {
  .tab-header {
    font-weight: 500;
    font-size: 0.75rem;
  }

  .characteristics-tab-header {
    width: 126px !important;
    i {
      font-size: 1rem !important;
    }
  }
}

.p-highlight {
  .tab-header {
    background-color: var(--primary-20);
  }
}

.characteristics-tab-header {
  width: 158px;

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
    color: var(--secondary-50);
    background-color: var(--secondary-10);

    .points-to-spend-icon {
      display: block;
    }
  }
}

.build-code {
  position: relative;

  .code {
    user-select: none;
    cursor: pointer;
    height: 32px;
    border: 1px solid var(--highlight-50);
    border-radius: 8px;
    span {
      line-height: 0px;
      word-wrap: break-word;
      max-width: calc(100vw - 1000px);
    }

    &:hover {
      background-color: var(--primary-40-30);
    }
  }

  .code-disclaimer {
    position: absolute;
    display: flex;
    bottom: -18px;
    right: 80px;
    font-size: 14px;
    color: var(--primary-50);
    white-space: nowrap;
  }
}

:deep(.class-selector) {
  .p-dropdown-label {
    padding: 0;
  }

  .class-image {
    display: flex;
    height: 28px;

    img {
      border-radius: 4px;
    }
  }
}
</style>
