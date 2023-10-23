<template>
  <div class="flex flex-column h-full">
    <div class="flex equipment-slots-wrapper pr-3">
      <template v-for="data in ITEM_SLOT_DATA" :key="data.id">
        <p-button
          v-if="currentCharacter.equipment[data.id] === null"
          class="equipment-button"
          :class="{ 'has-item': currentCharacter.equipment[data.id] !== null }"
          @click="onEquipmentClick(data.id)"
        >
          <div class="flex align-items-center justify-content-center">
            <div class="hover-icon search"> <i class="pi pi-search" /> </div>
            <p-image :src="`../src/assets/images/ui/${data.id}.png`" image-style="width: 60px" />
          </div>
        </p-button>
        <tippy v-else placement="bottom" interactive>
          <p-button class="equipment-button" :class="{ 'has-item': currentCharacter.equipment[data.id] !== null }" @click="onEquipmentClick(data.id)">
            <div class="flex align-items-center justify-content-center">
              <div class="hover-icon remove"> <i class="pi pi-trash" /> </div>
              <p-image :src="`https://vertylo.github.io/wakassets/items/${currentCharacter.equipment[data.id].imageId}.png`" image-style="width: 40px" />
            </div>
          </p-button>
          <template v-slot:content>
            <div class="item-card-tooltip">
              <div class="effect-header flex pt-2 px-1">
                <p-image :src="`https://vertylo.github.io/wakassets/items/${currentCharacter.equipment[data.id].imageId}.png`" image-style="width: 40px" />
                <div class="flex flex-column">
                  <div class="item-name mr-2">{{ currentCharacter.equipment[data.id].name }}</div>
                  <div class="flex">
                    <p-image
                      class="mr-1"
                      :src="`https://vertylo.github.io/wakassets/rarities/${currentCharacter.equipment[data.id].rarity}.png`"
                      image-style="width: 12px;"
                    />
                    <p-image
                      class="mr-1"
                      :src="`https://vertylo.github.io/wakassets/itemTypes/${currentCharacter.equipment[data.id].type.id}.png`"
                      image-style="width: 18px;"
                    />
                    <div>Level: {{ currentCharacter.equipment[data.id].level }}</div></div
                  >
                </div>
              </div>
              <template v-for="effect in currentCharacter.equipment[data.id].equipEffects" :key="effect.id">
                <div v-if="getEffectData(effect.id) !== null" class="effect-line px-2 py-1">
                  <span>{{ getEffectData(effect.id)?.isNegative ? '-' : '+' }}{{ effect.values[0] }}</span>
                  <span>{{ getEffectData(effect.id).text.charAt(0) === '%' ? getEffectData(effect.id).text : ' ' + getEffectData(effect.id).text }}</span>
                </div>
              </template>
            </div>
          </template>
        </tippy>
      </template>
    </div>

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
              <div v-if="displayStatsInList" class="item-card with-stats">
                <div class="flex px-2 pt-2">
                  <p-image :src="`https://vertylo.github.io/wakassets/items/${item.imageId}.png`" image-style="width: 40px" />
                  <div class="flex flex-column">
                    <div class="item-name mr-2 truncate" style="max-width: 15ch">{{ item.name }}</div>
                    <div class="flex">
                      <p-image class="mr-1" :src="`https://vertylo.github.io/wakassets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
                      <p-image class="mr-1" :src="`https://vertylo.github.io/wakassets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
                      <div>Level: {{ item.level }}</div>
                    </div>
                  </div>
                  <div class="flex-grow-1" />

                  <p-button icon="pi pi-plus" class="equip-button" @click="onEquipItem(item)" />
                </div>

                <div class="effects-wrapper flex flex-wrap">
                  <template v-for="effect in item.equipEffects" :key="effect.id">
                    <div v-if="getEffectData(effect.id)" class="effect-line pl-2 py-1" :style="{ width: effect.longEntry ? '100%' : '50%' }">
                      <span>{{ getEffectData(effect.id)?.isNegative ? '-' : '+' }}{{ effect.values[0] }}</span>
                      <span>{{ getEffectData(effect.id).text.charAt(0) === '%' ? getEffectData(effect.id).text : ' ' + getEffectData(effect.id).text }}</span>
                    </div>
                  </template>
                </div>
              </div>

              <tippy v-else :delay="[0, 0]" duration="0" interactive position="top" :offset="[0, -2]" :append-to="() => documentVar.body">
                <div class="item-card">
                  <div class="flex px-2 pt-2">
                    <p-image :src="`https://vertylo.github.io/wakassets/items/${item.imageId}.png`" image-style="width: 40px" />
                    <div class="flex flex-column">
                      <div class="item-name mr-2 truncate" style="max-width: 15ch">{{ item.name }}</div>
                      <div class="flex">
                        <p-image class="mr-1" :src="`https://vertylo.github.io/wakassets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
                        <p-image class="mr-1" :src="`https://vertylo.github.io/wakassets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
                        <div>Level: {{ item.level }}</div>
                      </div>
                    </div>
                    <div class="flex-grow-1" />

                    <p-button icon="pi pi-plus" class="equip-button" @click="onEquipItem(item)" />
                  </div>
                </div>

                <template v-slot:content>
                  <div class="item-card-tooltip">
                    <div class="effect-header flex pt-2 px-1">
                      <p-image :src="`https://vertylo.github.io/wakassets/items/${item.imageId}.png`" image-style="width: 40px" />
                      <div class="flex flex-column">
                        <div class="item-name mr-2">{{ item.name }}</div>
                        <div class="flex">
                          <p-image class="mr-1" :src="`https://vertylo.github.io/wakassets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
                          <p-image class="mr-1" :src="`https://vertylo.github.io/wakassets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
                          <div>Level: {{ item.level }}</div></div
                        >
                      </div>
                    </div>
                    <template v-for="(effect, index) in item.equipEffects" :key="`${item.id}-${effect.id}-${index}`">
                      <div v-if="getEffectData(effect.id)" class="effect-line px-2 py-1">
                        <span>{{ getEffectData(effect.id)?.isNegative ? '-' : '+' }}{{ effect.values[0] }}</span>
                        <span>{{ getEffectData(effect.id).text.charAt(0) === '%' ? getEffectData(effect.id).text : ' ' + getEffectData(effect.id).text }}</span>
                      </div>
                    </template>
                  </div>
                </template>
              </tippy>
            </template>
          </div>
          <div v-else> No items were found with those filters. Please revise your search. </div>
        </template>
      </p-virtualScroller>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, nextTick, computed, watch } from 'vue';

import { useItems } from '@/models/useItems';
import { ITEM_SLOT_DATA, EFFECT_TYPE_DATA } from '@/models/useConstants';

import ItemFilters from '@/components/ItemFilters.vue';

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

const onEquipmentClick = (slotKey) => {
  if (currentCharacter.value.equipment[slotKey] !== null) {
    // if we have an item equipped in that slot, remove it
    currentCharacter.value.equipment[slotKey] = null;
  } else {
    // here we filter our search by this slot type
  }
};

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
  } else {
    console.error('There was a problem picking the slot to equip that item');
  }
};

const getEffectData = (rawId) => {
  let effectEntryKey = Object.keys(EFFECT_TYPE_DATA).find((key) => EFFECT_TYPE_DATA[key].rawId === rawId);
  if (effectEntryKey === undefined) {
    return null;
  } else {
    return EFFECT_TYPE_DATA[effectEntryKey];
  }
};

defineExpose({
  showList,
});
</script>

<style lang="scss" scoped>
.equipment-slots-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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

  background: var(--bonta-blue-80);

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

    .effects-wrapper {
      overflow: hidden;
    }

    .effect-line {
      font-size: 12px;
      background: var(--bonta-blue-20);
      margin-bottom: 4px;
      border-right: 2px solid var(--bonta-blue);
      border-left: 2px solid var(--bonta-blue);
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

.item-card-tooltip {
  background-color: var(--bonta-blue);
  border-radius: 4px;
  border: 1px solid var(--bonta-blue-70);
  overflow: hidden;

  .effect-line:nth-child(2n-1) {
    background: var(--bonta-blue-20);
  }

  .effect-header {
    background: var(--bonta-blue-30);
  }
}
</style>
