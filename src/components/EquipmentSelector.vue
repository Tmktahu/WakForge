<template>
  <div class="flex flex-column h-full" style="overflow-y: auto">
    <EquipmentButtons :character="currentCharacter" />

    <ItemFilters />

    <p-divider class="mt-3 mb-2" />

    <div class="flex align-items-center">
      <div>{{ currentItemList.length }} Results out of {{ getNumTotalItems() }} Items Total</div>
      <div class="flex-grow-1" />
      <span class="mr-1">Display Stats</span>
      <p-checkbox v-model="displayStatsInList" :binary="true" />
    </div>

    <div v-if="showItemList" ref="itemResultsWrapper" class="item-results-wrapper flex flex-grow-1 mt-2">
      <p-virtualScroller
        :items="structuredItemList"
        :item-size="[displayStatsInList ? 215 : 65, displayStatsInList ? 315 : 235]"
        orientation="both"
        style="width: 100%; height: 100%"
      >
        <template v-slot:item="{ item: itemBunch }">
          <div v-if="structuredItemList[0].length > 0" class="flex">
            <template v-for="(item, index) of itemBunch" :key="index">
              <div v-if="displayStatsInList && item" class="item-card with-stats">
                <div class="flex px-2 pt-2">
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

                  <p-button icon="pi pi-plus" class="equip-button" @click="onEquipItem(item, $event)" />
                </div>

                <ItemStatList card-mode :item="item" />
              </div>

              <tippy v-else :delay="[0, 0]" duration="0" interactive position="top" :offset="[0, -2]" :append-to="() => documentVar.body">
                <div class="item-card">
                  <div class="flex px-2 pt-2">
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

                    <p-button icon="pi pi-plus" class="equip-button" @click="onEquipItem(item, $event)" />
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
          <div v-else> No items were found with those filters. Please revise your search. </div>
        </template>
      </p-virtualScroller>
    </div>

    <p-confirmPopup />
  </div>
</template>

<script setup>
import { ref, inject, nextTick, computed, watch } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

import { useItems } from '@/models/useItems';
import { ITEM_SLOT_DATA, LEVELABLE_ITEMS } from '@/models/useConstants';

import EquipmentButtons from '@/components/EquipmentButtons.vue';
import ItemFilters from '@/components/ItemFilters.vue';
import ItemStatList from '@/components/ItemStatList.vue';

const confirm = useConfirm();

const currentCharacter = inject('currentCharacter');
const currentItemList = inject('currentItemList');

const itemResultsWrapper = ref(null);
const numItemsPerRow = ref(4);
const { getNumTotalItems } = useItems();
let documentVar = document;

const onResize = () => {
  numItemsPerRow.value = Math.floor((itemResultsWrapper.value.clientWidth - 16) / (displayStatsInList.value ? 310 + 5 : 230 + 5));
};
window.addEventListener('resize', onResize);

let structuredItemList = computed(() => {
  let tempFinalArray = [];
  let tempArray = [];
  currentItemList.value.forEach((item) => {
    if (tempArray.length === numItemsPerRow.value) {
      tempFinalArray.push(tempArray);
      tempArray = [item];
    } else {
      tempArray.push(item);
    }
  });

  if (tempArray.length > 0) {
    tempFinalArray.push(tempArray);
  }

  if (tempFinalArray.length === 0) {
    tempFinalArray.push([]);
  }

  return tempFinalArray;
});

const showItemList = ref(false);
const displayStatsInList = ref(false);

const showList = () => {
  showItemList.value = true;
  nextTick(() => {
    onResize();
  });
};

watch(displayStatsInList, () => {
  nextTick(() => {
    showItemList.value = false;
    nextTick(() => {
      showItemList.value = true;
      nextTick(() => {
        onResize();
      });
    });
  });
});

const onEquipItem = (item, event) => {
  // so here we want to equip the item in the slot it was made for
  let targetSlot = null;

  if (item.type.validSlots.includes(ITEM_SLOT_DATA.LEFT_HAND.id) || item.type.validSlots.includes(ITEM_SLOT_DATA.RIGHT_HAND.id)) {
    if (currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] === null) {
      targetSlot = ITEM_SLOT_DATA.LEFT_HAND.id;
    } else {
      targetSlot = ITEM_SLOT_DATA.RIGHT_HAND.id;
    }
  } else if (item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) && currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] !== null) {
    confirm.require({
      target: event.currentTarget,
      message: 'That is a two-handed weapon, and you have an item in your second weapon slot. Are you sure?',
      accept: () => {
        currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] = item;
        currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] = null;
      },
    });
  } else if (
    item.type.validSlots[0] === ITEM_SLOT_DATA.SECOND_WEAPON.id &&
    currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] !== null &&
    currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id].type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id)
  ) {
    confirm.require({
      target: event.currentTarget,
      message: 'You have a two-handed weapon equipped. Doing this will remove it. Are you sure?',
      accept: () => {
        currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] = null;
        currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] = item;
      },
    });
  } else if (item.type.validSlots.length > 1) {
    console.log('there is an item type with 2 valid slots that we are not handling');
  } else {
    targetSlot = item.type.validSlots[0];
  }

  if (targetSlot !== null) {
    currentCharacter.value.equipment[targetSlot] = item;
  }
};

defineExpose({
  showList,
});
</script>

<style lang="scss" scoped>
:deep(.item-results-wrapper) {
  min-height: 300px;
  .item-card {
    border: 1px solid var(--bonta-blue-60);
    width: 230px;
    height: 60px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 8px;
    background: var(--bonta-blue);
    overflow: hidden;

    &.with-stats {
      height: 215px;
      width: 310px;
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
