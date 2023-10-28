<template>
  <div class="flex flex-column w-full h-full" style="overflow-y: auto">
    <div class="mt-3 ml-4" style="font-size: 42px">Automatic Character Builder (WIP)</div>

    <div class="ml-4 mt-2">This utlity will automatically calculate a reasonably well-optimized item set based on the options below</div>
    <div class="ml-4 mt-2">
      It is powered by code written by
      <a href="https://github.com/mikeshardmind/wakfu-utils" target="_blank">Keeper of Time (sinbad)</a>.
    </div>
    <div class="ml-4 mt-2">Note that the logic behind this tool is still in development.</div>

    <div v-if="autoBuilderIsReady" class="flex flex-column flex-grow-1 mx-4 mt-3 mb-3">
      <div class="flex align-items-center gap-2">
        <p-dropdown v-model="selectedClass" :options="classOptions" placeholder="Select a Class" option-value="value" class="mr-2">
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
          <p-inputNumber v-model="selectedLevel" class="number-input mr-2" :min="20" :max="230" :step="15" />
          <div class="flex-grow-1">
            <p-slider v-model="selectedLevel" :min="20" :max="230" :step="15" />
          </div>
        </div>

        <p-dropdown v-model="selectedStat" :options="statOptions" placeholder="Select a Statistic to Prioratize" class="mr-2">
          <template v-slot:value="slotProps">
            <div v-if="slotProps.value" class="flex align-items-center">
              <div class="capitalize">{{ slotProps.value.label }}</div>
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
      </div>

      <div class="flex mt-3">
        <p-button label="Generate Build" @click="onCalculate" />
      </div>

      <div v-if="!builderLoading" class="results-display flex flex-column flex-grow-1 mt-3 py-2 px-2">
        <div v-if="itemSet?.length">
          <div class="flex flex-wrap gap-1">
            <template v-for="item in itemSet" :key="item.id">
              <tippy delay="[0, 0]" duration="0" interactive position="top" :offset="[0, -2]" :append-to="() => documentVar.body">
                <div class="item-card">
                  <div class="slot-label text-center pt-1 pb-1">
                    {{ item.type.validSlots[0] === 'LEFT_HAND' ? 'Ring' : ITEM_SLOT_DATA[item.type.validSlots[0]].name }} Slot
                  </div>
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

        <div v-else>
          Enter your parameters above and hit the Generate Build button to tell Jimmy to get off his lazy butt and do something useful.<br />Your results will
          be shown here.
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
        <p-button disabled label="Create Character With Above Items (WIP)" @click="onCreateCharacter" />
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
import { ref, watch } from 'vue';

import { useAutoBuilder } from '@/models/useAutoBuilder';
import { CLASS_CONSTANTS, LEVELABLE_ITEMS, ITEM_SLOT_DATA } from '@/models/useConstants';

import ItemStatList from '@/components/ItemStatList.vue';

let documentVar = document;

const { runCalculations, autoBuilderIsReady, itemSet, builderLoading } = useAutoBuilder();

const selectedLevel = ref(20);
const selectedClass = ref(null);
const selectedStat = ref(null);

const initLoading = ref(true);

const resultData = ref(null);

const classOptions = Object.entries(CLASS_CONSTANTS).map(([key, value]) => {
  return {
    label: value,
    value: value,
  };
});

const statOptions = [
  {
    label: 'Melee Mastery',
    value: 'meleeMastery',
  },
  {
    label: 'Distance Mastery',
    value: 'distanceMastery',
  },
];

watch(autoBuilderIsReady, () => {
  initLoading.value = false;
});

watch(resultData, () => {
  if (resultData.value !== null) {
    builderLoading.value = false;
  } else {
    builderLoading.value = true;
  }
});

const onCalculate = async () => {
  let params = {
    targetLevel: selectedLevel.value,
    targetClass: selectedClass.value,
    meleeMastery: selectedStat.value.value === 'meleeMastery',
    distanceMastery: selectedStat.value.value === 'distanceMastery',
  };

  runCalculations(params);
};

const onCreateCharacter = () => {
  console.log('trying to create character');
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

.results-display {
  border: 1px solid var(--bonta-blue-100);
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
  border: 1px solid var(--bonta-blue-60);
  width: 230px;
  height: 80px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 8px;
  background: var(--bonta-blue);
  overflow: hidden;

  &.with-stats {
    height: 215px;
    width: 310px;
  }

  .slot-label {
    background-color: var(--bonta-blue-40);
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
</style>
