<template>
  <div class="flex flex-column h-full">
    <div class="flex equipment-slots-wrapper pr-3">
      <template v-for="data in ITEM_SLOT_DATA" :key="data.id">
        <p-button class="equipment-button" :class="{ 'has-item': currentCharacter.equipment[data.id] !== null }" @click="onEquipmentClick(data.id)">
          <div v-if="currentCharacter.equipment[data.id] === null" class="flex align-items-center justify-content-center">
            <div class="hover-icon search"> <i class="pi pi-search" /> </div>
            <p-image :src="`../src/assets/images/ui/${data.id}.png`" image-style="width: 60px" />
          </div>
          <div v-else class="flex align-items-center justify-content-center">
            <div class="hover-icon remove"> <i class="pi pi-trash" /> </div>
            <p-image :src="`https://vertylo.github.io/wakassets/items/${currentCharacter.equipment[data.id].imageId}.png`" image-style="width: 40px" />
          </div>
        </p-button>
      </template>
    </div>

    <div class="flex align-items-center mt-3">
      <p-inputText v-model="searchTerm" placeholder="Search Items" class="mr-2" @input="onSearchInput" />
      <div class="flex align-items-center w-20rem">
        <p-inputNumber v-model="levelRange[0]" class="number-input" :min="0" :max="230" @input="onLevelRangeTextInput" />
        <p-slider v-model="levelRange" class="flex-grow-1 mx-2" range :min="0" :max="230" @change="onLevelRangeChange" />
        <p-inputNumber v-model="levelRange[1]" class="number-input" :min="0" :max="230" @input="onLevelRangeTextInput" />
      </div>
    </div>
    <div class="mt-3">tag filters go here</div>

    <p-divider />

    <div class="item-results-wrapper flex flex-grow-1">
      <p-virtualScroller :items="currentItemList" :item-size="[80, 230]" orientation="both" style="width: 100%; height: 100%">
        <template v-slot:item="{ item: itemBunch }">
          <div v-if="currentItemList[0].length > 0" class="flex">
            <template v-for="(item, index) of itemBunch" :key="index">
              <div class="item-card">
                <div class="flex">
                  <p-image :src="`https://vertylo.github.io/wakassets/items/${item.imageId}.png`" image-style="width: 40px" />
                  <div class="flex flex-column">
                    <div class="item-name mr-2">{{ item.name }}</div>
                    <div class="flex">
                      <p-image class="mr-1" :src="`https://vertylo.github.io/wakassets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
                      <p-image class="mr-1" :src="`https://vertylo.github.io/wakassets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
                      <div>Level: {{ item.level }}</div></div
                    >
                  </div>
                  <div class="flex-grow-1" />

                  <p-button icon="pi pi-plus" class="equip-button" @click="onEquipItem(item)" />
                </div>
              </div>
            </template>
          </div>
          <div v-else> No items were found with those filters. Please revise your search. </div>
        </template>
      </p-virtualScroller>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch, computed } from 'vue';
import { debounce } from 'lodash';

import { ITEM_SLOT_DATA } from '@/models/useConstants';

const currentCharacter = inject('currentCharacter');
const itemFilters = inject('itemFilters');
const currentItemList = inject('currentItemList');

const searchTerm = ref('');
const levelRange = ref([itemFilters.startLevel, itemFilters.endLevel]);

const onEquipmentClick = (slotKey) => {
  if (currentCharacter.value.equipment[slotKey] !== null) {
    // if we have an item equipped in that slot, remove it
    currentCharacter.value.equipment[slotKey] = null;
  } else {
    // here we filter our search by this slot type
  }
};

const onSearchInput = () => {
  updateFilters();
};

const onLevelRangeTextInput = () => {
  updateFilters();
};

const onLevelRangeChange = (event) => {
  updateFilters();
};

const updateFilters = () => {
  itemFilters.searchTerm = searchTerm.value;
  itemFilters.startLevel = levelRange.value[0];
  itemFilters.endLevel = levelRange.value[1];
};
const updateFiltersDebounce = debounce(updateFilters.bind(this), 1000);

const onEquipItem = (item) => {
  // so here we want to equip the item in the slot it was made for

  let targetSlot = null;

  if (item.type.validSlots.includes(ITEM_SLOT_DATA.LEFT_HAND.id) || item.type.validSlots.includes(ITEM_SLOT_DATA.RIGHT_HAND.id)) {
    if (currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] === null) {
      targetSlot = ITEM_SLOT_DATA.LEFT_HAND.id;
    } else {
      targetSlot = ITEM_SLOT_DATA.RIGHT_HAND.id;
    }
  } else if (item.type.validSlots.length > 1) {
    console.log('there is an item type with 2 valid slots that we are not handling');
  } else {
    targetSlot = item.type.validSlots[0];
  }

  if (targetSlot !== null) {
    currentCharacter.value.equipment[targetSlot] = item;
    console.log(currentCharacter.value.equipment);
  } else {
    console.error('There was a problem picking the slot to equip that item');
  }
};
</script>

<style lang="scss" scoped>
.equipment-slots-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 0.25rem;
}

.equipment-button {
  display: flex;
  justify-content: center;
  position: relative;

  min-width: 0px;
  width: 60px;
  height: 60px;
  padding: 0px;

  &.has-item {
    .p-image {
      background-color: var(--bonta-blue-20);
      border-radius: 4px;
      padding: 5px;
      height: 50px;
    }
  }

  .hover-icon {
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    display: none;
    color: white;

    &.remove {
      background-color: rgba(red, 0.3);
    }

    &.search {
      background-color: rgba(var(--bonta-blue-50), 0.3);
    }

    i {
      font-size: 40px;
    }
  }

  &:hover {
    .hover-icon {
      display: flex;
    }
  }
}

:deep(.item-results-wrapper) {
  .item-card {
    border: 1px solid var(--bonta-blue-70);
    padding: 10px;
    width: 230px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 8px;
    background: var(--bonta-blue);
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
