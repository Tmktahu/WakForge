<template>
  <div class="flex flex-column w-full h-full" style="overflow-y: auto">
    <div class="top-section flex">
      <div class="flex flex-column">
        <div class="info-area pl-4 pb-3 pr-3">
          <div class="mt-3" style="font-size: 42px">Automatic Item Set Builder <span style="color: var(--error)">(Deprecated)</span></div>

          <div class="mt-2">This utlity will automatically calculate a reasonably well-optimized item set based on the options below.</div>
          <div class="mt-2">
            It is powered by code written by
            <a href="https://github.com/mikeshardmind/wakfu-utils" target="_blank">Keeper of Time (sinbad)</a>.
          </div>
          <div class="mt-2 font-bold" style="color: var(--error)">
            This page is deprecated and may no longer function correctly.<br />
            To better use this feature, go check out the "Auto Item Solver" tab on a character sheet.</div
          >
        </div>

        <div class="flex align-items-center gap-2 pl-4 pt-3">
          <p-dropdown v-model="selectedClass" class="class-dropdown mr-2" :options="classOptions" placeholder="Select a Class" option-value="value">
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
            <p-inputNumber v-model="selectedLevel" class="number-input mr-3" :min="20" :max="245" :step="15" :allow-empty="false" />
            <div class="flex-grow-1 mr-2">
              <p-slider v-model="selectedLevel" :min="20" :max="245" :step="15" />
            </div>
          </div>
        </div>

        <div class="flex align-items-center mt-3 ml-4">
          <p-button class="py-2 px-3" :disabled="!hasValidValues" label="Generate Item Set" @click="onCalculate" />
          <!-- <div class="ml-3">warning message</div> -->
        </div>
      </div>

      <div class="flex flex-column mt-3 ml-3">
        <div class="text-center" style="font-size: 1.25rem">Target Stats from Items</div>
        <div class="flex mt-3">
          <div class="flex flex-column">
            <div class="flex align-items-center mb-2">
              <p-checkbox v-model="meleeMastery" :binary="true" />
              <div class="mx-2">Melee Mastery</div>
              <tippy placement="left">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">This tells Jimmy that you want the items to include Melee Mastery if possible.</div>
                </template>
              </tippy>
            </div>

            <div class="flex align-items-center mb-2">
              <p-checkbox v-model="distanceMastery" :binary="true" />
              <div class="mx-2">Distance Mastery</div>
              <tippy placement="left">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">This tells Jimmy that you want the items to include Distance Mastery if possible.</div>
                </template>
              </tippy>
            </div>

            <div class="flex align-items-center mb-2">
              <p-checkbox v-model="healingMastery" :binary="true" />
              <div class="mx-2">Healing Mastery</div>
              <tippy placement="left">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">This tells Jimmy that you want the items to include Healing Mastery if possible.</div>
                </template>
              </tippy>
            </div>

            <div class="flex align-items-center mb-2">
              <p-checkbox v-model="rearMastery" :binary="true" />
              <div class="mx-2">Rear Mastery</div>
              <tippy placement="left">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">This tells Jimmy that you want the items to include Rear Mastery if possible.</div>
                </template>
              </tippy>
            </div>

            <div class="flex align-items-center mb-2">
              <p-checkbox v-model="berserkMastery" :binary="true" />
              <div class="mx-2">Berserk Mastery</div>
              <tippy placement="left">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">This tells Jimmy that you want the items to include Berserk Mastery if possible.</div>
                </template>
              </tippy>
            </div>
          </div>

          <div class="flex flex-column ml-3 mr-3">
            <div class="flex align-items-center mb-2">
              <p-inputNumber v-model="targetApAmount" class="number-input" :allow-empty="false" />
              <div class="mx-2">Target AP Amount</div>
              <tippy placement="left">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">This tells Jimmy that you want to try and get this many Action Points from items.</div>
                </template>
              </tippy>
            </div>

            <div class="flex align-items-center mb-2">
              <p-inputNumber v-model="targetMpAmount" class="number-input" :allow-empty="false" />
              <div class="mx-2">Target MP Amount</div>
              <tippy placement="left">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">This tells Jimmy that you want to try and get this many Movement Points from items.</div>
                </template>
              </tippy>
            </div>

            <div class="flex align-items-center mb-2">
              <p-inputNumber v-model="targetRangeAmount" class="number-input" :allow-empty="false" />
              <div class="mx-2">Target Range Amount</div>
              <tippy placement="left">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">This tells Jimmy that you want to try and get this many Range from items.</div>
                </template>
              </tippy>
            </div>

            <div class="flex align-items-center mb-2">
              <p-inputNumber v-model="targetWpAmount" class="number-input" :allow-empty="false" />
              <div class="mx-2">Target WP Amount</div>
              <tippy placement="left">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">This tells Jimmy that you want to try and get this many Wakfu Points from items.</div>
                </template>
              </tippy>
            </div>

            <div class="flex align-items-center mb-2">
              <p-inputNumber v-model="targetNumElements" :min="0" :max="4" class="number-input" :allow-empty="false" />
              <div class="mx-2">Number of Elements</div>
              <tippy placement="left">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">This tells Jimmy the desired number of elemental bonuses on each item.</div>
                </template>
              </tippy>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="autoBuilderIsReady" class="flex flex-column flex-grow-1 mx-4 mb-3">
      <div v-if="!builderLoading" class="results-display flex flex-column flex-grow-1 mt-3 py-2 px-2">
        <div v-if="itemSet?.length">
          <div class="flex flex-wrap gap-1">
            <template v-for="item in itemSet" :key="item.id">
              <tippy delay="[0, 0]" duration="0" interactive position="top" :offset="[0, -2]" :append-to="() => documentVar.body">
                <div class="item-card">
                  <div class="slot-label text-center pt-1 pb-1"> {{ item.type.validSlots[0] === 'LEFT_HAND' ? 'Ring' : ITEM_SLOT_DATA[item.type.validSlots[0]].name }} Slot </div>
                  <div class="flex px-2 pt-1">
                    <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${item.imageId}.png`" image-style="width: 40px" />
                    <div class="flex flex-column ml-1">
                      <div class="item-name mr-2 truncate" style="max-width: 15ch">{{ item.name }}</div>
                      <div class="flex">
                        <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
                        <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
                        <div v-if="LEVELABLE_ITEMS.includes(item.type.id)">Item Level: 50</div>
                        <div v-else>Lvl: {{ item.level }}</div>
                        <div v-if="item.type.validSlots[0] === ITEM_SLOT_DATA.FIRST_WEAPON.id" class="ml-1">
                          {{ item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) ? '(2H)' : '(1H)' }}
                        </div>
                      </div>
                    </div>
                    <div class="flex-grow-1" />

                    <div class="flex flex-column">
                      <tippy placement="left">
                        <p-button icon="pi pi-question-circle" class="equip-button" @click="onGotoEncyclopedia(item)" />
                        <template v-slot:content> <div class="simple-tooltip">Open Encyclopedia Page</div></template>
                      </tippy>
                    </div>
                  </div>
                </div>

                <template v-slot:content>
                  <div v-if="item" class="item-card-tooltip">
                    <div class="effect-header flex pt-2 px-1">
                      <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${item.imageId}.png`" image-style="width: 40px" />
                      <div class="flex flex-column ml-1">
                        <div class="item-name mr-2">{{ item.name }}</div>
                        <div class="flex">
                          <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
                          <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
                          <div v-if="LEVELABLE_ITEMS.includes(item.type.id)">Item Level: 50</div>
                          <div v-else>Lvl: {{ item.level }}</div>
                          <div v-if="item.type.validSlots[0] === ITEM_SLOT_DATA.FIRST_WEAPON.id" class="ml-1">
                            {{ item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) ? '(2H)' : '(1H)' }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <ItemStatList :item="item" />
                  </div>
                </template>
              </tippy>
            </template>
          </div>

          <div class="flex flex-grow-1"> stats summary? </div>
        </div>

        <div v-else-if="builderError">
          <div v-if="builderError.type === 'noSolution'" class="flex flex-column">
            <span>Jimmy was unable to find an item set that matched your parameters. Please check them and try again.</span>
            <div class="mt-2 py-1 px-2" style="background: var(--error-40); border-radius: 8px; width: fit-content">
              Remember that your settings above should reflect what the items should give, not what the completed character should have.
            </div>
          </div>
        </div>

        <div v-else class="flex flex-column">
          <span>
            Enter your parameters above and hit the Generate Item Set button to tell Jimmy to get off his lazy butt and do something useful.<br />Your results will be shown here.
          </span>
          <div class="mt-2 py-1 px-2" style="background: var(--primary-40-40); border-radius: 8px; width: fit-content">
            Remember that your settings above should reflect what the items should give, not what the entire character should have.
          </div>
        </div>
      </div>

      <div v-else class="loading-state flex flex-column flex-grow-1 ml-4 mt-8 w-full">
        <div class="text-center mb-5">Jimmy is doing the math and stuff... Please wait...</div>
        <div class="flex justify-content-center">
          <div style="position: relative; width: 200px; height: 200px">
            <p-progressSpinner class="first-spinner" stroke-width="4" style="width: 100px; height: 100px" />
            <p-progressSpinner class="second-spinner" animation-duration="1s" stroke-width="2" style="width: 200px; height: 200px" />
          </div>
        </div>
      </div>

      <div class="flex mt-3">
        <p-button :disabled="!itemSet?.length" label="Create Character With Above Items" @click="onCreateCharacter" />
      </div>
    </div>

    <div v-else class="loading-state flex flex-column ml-4 mt-8 w-full">
      <div class="text-center mb-5">Jimmy is frantically cleaning his room. Please wait.</div>
      <div class="flex justify-content-center">
        <div style="position: relative; width: 200px; height: 200px">
          <p-progressSpinner class="first-spinner" stroke-width="4" style="width: 100px; height: 100px" />
          <p-progressSpinner class="second-spinner" animation-duration="1s" stroke-width="2" style="width: 200px; height: 200px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { CHARACTER_BUILDER_ROUTE } from '@/router/routes.js';

import { useCharacterBuilds } from '@/models/useCharacterBuilds';
import { useAutoBuilder } from '@/models/useAutoBuilder';
import { CLASS_CONSTANTS, LEVELABLE_ITEMS, ITEM_SLOT_DATA } from '@/models/useConstants';

import ItemStatList from '@/components/characterSheet/ItemStatList.vue';

let documentVar = document;
const router = useRouter();
const masterData = inject('masterData');

const { runCalculations, autoBuilderIsReady, itemSet, builderLoading, builderError } = useAutoBuilder();
const { createNewCharacterFromAutoBuilder } = useCharacterBuilds(masterData);

const selectedLevel = ref(20);
const selectedClass = ref(null);

const targetApAmount = ref(0);
const targetMpAmount = ref(0);
const targetRangeAmount = ref(0);
const targetWpAmount = ref(0);
const targetNumElements = ref(0);

const meleeMastery = ref(false);
const distanceMastery = ref(false);
const healingMastery = ref(false);
const rearMastery = ref(false);
const berserkMastery = ref(false);

const initLoading = ref(true);
const resultData = ref(null);

const classOptions = Object.entries(CLASS_CONSTANTS).map(([key, value]) => {
  return {
    label: value,
    value: value,
  };
});

const hasValidValues = computed(() => {
  return autoBuilderIsReady.value && selectedClass.value !== null;
});

// watch(autoBuilderIsReady, () => {
//   initLoading.value = false;
// });

// watch(resultData, () => {
//   if (resultData.value !== null) {
//     builderLoading.value = false;
//   } else {
//     builderLoading.value = true;
//   }
// });

// watch(
//   selectedLevel,
//   () => {
//     if (selectedLevel.value <= 35) {
//       targetApAmount.value = 2;
//       targetMpAmount.value = 1;
//       targetRangeAmount.value = 0;
//       targetWpAmount.value = 0;
//       targetNumElements.value = 2;
//     } else {
//       targetApAmount.value = 5;
//       targetMpAmount.value = 2;
//       targetRangeAmount.value = 0;
//       targetWpAmount.value = 0;
//       targetNumElements.value = 2;
//     }
//   },
//   { immediate: true }
// );

const onCalculate = async () => {
  let params = {
    targetLevel: selectedLevel.value,

    meleeMastery: meleeMastery.value,
    distanceMastery: distanceMastery.value,
    healingMastery: healingMastery.value,
    rearMastery: rearMastery.value,
    berserkMastery: berserkMastery.value,

    targetNumElements: targetNumElements.value,

    targetApAmount: targetApAmount.value,
    targetMpAmount: targetMpAmount.value,
    targetRangeAmount: targetRangeAmount.value,
    targetWpAmount: targetWpAmount.value,
  };

  runCalculations(params);
};

const onCreateCharacter = () => {
  let newCharacterData = createNewCharacterFromAutoBuilder(selectedClass.value, selectedLevel.value, itemSet.value);

  router.push({
    name: CHARACTER_BUILDER_ROUTE,
    params: {
      characterId: newCharacterData.id,
    },
  });
};
</script>

<style lang="scss" scoped>
.info-area {
  border-right: 1px solid var(--primary-50);
  border-bottom: 1px solid var(--primary-50);
  border-bottom-right-radius: 8px;
}

:deep(.number-input) {
  .p-inputtext {
    padding: 5px !important;
    width: 40px;
    height: 32px;
  }

  .p-inputnumber-button {
    padding: 0;
    width: 1rem;
  }
}

:deep(.class-dropdown) {
  .p-dropdown-label {
    display: flex;
    align-items: center;
    padding: 0;
    height: 32px;
    padding-left: 12px;
  }
}

:deep(.stat-dropdown) {
  .p-dropdown-label {
    display: flex;
    align-items: center;
    padding: 0;
    height: 32px;
    padding-left: 12px;
  }
}

.results-display {
  border: 1px solid var(--primary-50);
  border-radius: 8px;
}

.loading-state {
  .first-spinner {
    position: absolute;
    left: 50px;
    top: 50px;
  }

  .second-spinner {
    position: absolute;
  }
}

.item-card {
  border: 1px solid var(--primary-60);
  width: 230px;
  height: 80px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 8px;
  background: var(--primary-40);
  overflow: hidden;

  &.with-stats {
    height: 215px;
    width: 310px;
  }

  .slot-label {
    background-color: var(--primary-40-40);
  }
}

.equip-button {
  padding: 2px;
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;

  .p-button-icon {
    font-size: 14px;
    font-weight: 800;
  }
}

@media (max-width: 700px) {
  .top-section {
    flex-direction: column;
  }

  .info-area {
    border-right: none;
    border-bottom-right-radius: 0px;
  }
}
</style>
