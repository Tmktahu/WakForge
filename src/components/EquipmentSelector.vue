<template>
  <div class="flex flex-column flex-grow-1 mt-5">
    <div class="text-center w-full">Equipment</div>
    <div class="flex equipment-slots-wrapper">
      <template v-for="key in Object.keys(currentCharacter.equipment)" :key="key">
        <p-button class="equipment-button" @click="onEquipmentClick(key)"> EE </p-button>
      </template>
    </div>

    <div class="flex align-items-center mt-3 w-20rem">
      <p-inputNumber v-model="levelRange[0]" class="number-input" :min="0" :max="230" @input="onLevelRangeTextInput" />
      <p-slider v-model="levelRange" class="flex-grow-1 mx-2" range :min="0" :max="230" @change="onLevelRangeChange" />
      <p-inputNumber v-model="levelRange[1]" class="number-input" :min="0" :max="230" @input="onLevelRangeTextInput" />
    </div>
    <div class="mt-3">tag filters go here</div>

    <div class="item-results-wrapper flex flex-grow-1 mt-3">
      <p-virtualScroller :items="currentItemList" :item-size="[80, 170]" orientation="both" style="width: 100%; height: 100%">
        <template v-slot:item="{ item: itemBunch, options }">
          <div class="flex">
            <template v-for="(item, index) of itemBunch" :key="index">
              <div class="item-card">
                <div class="flex">
                  <div class="item-name mr-2">{{ item.name }}</div>
                  <div class="flex-grow-1" />
                  <p-button icon="pi pi-download" class="equip-button" />
                </div>
                <div>Level: {{ item.level }}</div>
              </div>
            </template>
          </div>
        </template>
      </p-virtualScroller>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch, computed } from 'vue';
import { debounce } from 'lodash';

const currentCharacter = inject('currentCharacter');
const itemFilters = inject('itemFilters');
const currentItemList = inject('currentItemList');

const levelRange = ref([itemFilters.startLevel, itemFilters.endLevel]);

const items = Array.from({ length: 1000 }).map((_, i) => Array.from({ length: 1000 }).map((_j, j) => `Item #${i}_${j}`));
const dummyItems = [
  { id: 1, name: 'item 1' },
  { id: 2, name: 'item 2' },
  { id: 3, name: 'item 3' },
  { id: 4, name: 'item 4' },
  { id: 5, name: 'item 5' },
  { id: 6, name: 'item 6' },
  { id: 7, name: 'item 7' },
  { id: 8, name: 'item 8' },
];
const itemResults = computed(() => dummyItems);

const onEquipmentClick = (slotKey) => {
  if (currentCharacter.value.equipment[slotKey] !== null) {
    // if we have an item equipped in that slot, remove it
    currentCharacter.value.equipment[slotKey] = null;
  } else {
    // here we filter our search by this slot type
  }
};

const onLevelRangeTextInput = () => {
  updateFilters();
};

const onLevelRangeChange = (event) => {
  updateFilters();
};

const updateFilters = () => {
  itemFilters.startLevel = levelRange.value[0];
  itemFilters.endLevel = levelRange.value[1];
};
const updateFiltersDebounce = debounce(updateFilters.bind(this), 1000);
</script>

<style lang="scss" scoped>
.equipment-slots-wrapper {
  display: flex;
  width: 100%;
  gap: 0.25rem;
}

.equipment-button {
  min-width: 0px;
  width: 40px;
  height: 40px;
  padding: 0;
  justify-content: center;
}

.item-results-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow-y: auto;
  max-height: 500px;
  .item-card {
    border: 1px solid white;
    padding: 10px;
    width: 170px;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .equip-button {
    padding: 2px;
    min-width: 20px;
    max-width: 20px;
    min-height: 20px;
    max-height: 20px;
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
