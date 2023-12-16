<template>
  <div class="flex flex-column h-full" style="overflow-y: auto">
    <EquipmentButtons :character="currentCharacter" />

    <ItemFilters />

    <p-divider class="mt-3 mb-2" />

    <div class="flex align-items-center">
      <div>{{ $t('characterSheet.equipmentContent.sortBy') }}:</div>
      <p-dropdown v-model="itemFilters.sortBy" class="sort-dropdown ml-2" option-label="label" filter auto-filter-focus :options="sortByOptions">
        <template v-slot:value="slotProps"> {{ $t(slotProps.value.label) }} </template>
        <template v-slot:option="slotProps">
          <div class="px-2 py-1">{{ $t(slotProps.option.label) }}</div>
        </template>
      </p-dropdown>
      <p-dropdown v-model="itemFilters.sortOrder" class="sort-dropdown ml-2" option-label="label" :options="sortOrderOptions">
        <template v-slot:value="slotProps"> {{ $t(slotProps.value.label) }} </template>
        <template v-slot:option="slotProps">
          <div class="px-2 py-1">{{ $t(slotProps.option.label) }}</div>
        </template>
      </p-dropdown>
      <div class="flex-grow-1" />
      <div class="ml-2">
        {{ currentItemList.length }} {{ $t('characterSheet.equipmentContent.resultsOutOf') }} {{ getNumTotalItems() }}
        {{ $t('characterSheet.equipmentContent.itemsTotal') }}
      </div>
      <div class="flex-grow-1" />
      <span class="mr-1">{{ $t('characterSheet.equipmentContent.displayTotals') }}</span>
      <p-checkbox v-model="displayTotalValues" :binary="true" />
      <span class="mr-1 ml-3">{{ $t('characterSheet.equipmentContent.displayStats') }}</span>
      <p-checkbox v-model="displayStatsInList" :binary="true" />
    </div>

    <div v-if="showItemList && !itemListLoading" ref="itemResultsWrapper" class="item-results-wrapper flex flex-grow-1 mt-2">
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
                    <div class="item-name mr-2 truncate" style="max-width: 15ch">{{ $t(`items.${item.id}`) }}</div>
                    <div class="flex">
                      <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
                      <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
                      <div v-if="LEVELABLE_ITEMS.includes(item.type.id)"> {{ $t('characterSheet.equipmentContent.itemLevel') }}: {{ item.id === 12237 ? '25' : '50' }} </div>
                      <div v-else>Lvl: {{ item.level }}</div>
                      <div v-if="item.type.validSlots[0] === ITEM_SLOT_DATA.FIRST_WEAPON.id" class="ml-1">
                        {{ item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) ? '(2H)' : '(1H)' }}
                      </div>
                    </div>
                  </div>
                  <div class="flex-grow-1" />

                  <div class="flex flex-column gap-1">
                    <p-button icon="pi pi-plus" class="equip-button" @click="onEquipItem(item, $event)" />
                    <p-button icon="pi pi-question-circle" class="equip-button" @click="onGotoEncyclopedia(item)" />
                  </div>
                </div>

                <ItemStatList card-mode :item="item" />
              </div>

              <ItemListCard v-else :item="item" :with-totals="displayTotalValues" />
            </template>
          </div>
          <div v-else> {{ $t('characterSheet.equipmentContent.noItemsFound') }} </div>
        </template>
      </p-virtualScroller>
    </div>

    <div v-else class="loading-state flex flex-column flex-grow-1 w-full mt-3">
      <div class="text-center mt-2">{{ $t('characterSheet.itemSolverContent.loadingMessage') }}</div>
      <div class="flex justify-content-center">
        <div style="position: relative; width: 100px; height: 100px; margin-bottom: 20px">
          <p-progressSpinner class="first-spinner" stroke-width="4" style="width: 50px; height: 50px" />
          <p-progressSpinner class="second-spinner" animation-duration="1s" stroke-width="2" style="width: 100px; height: 100px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, nextTick, computed, watch } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useI18n } from 'vue-i18n';

import { useItems, sortByOptions, sortOrderOptions } from '@/models/useItems';
import { ITEM_SLOT_DATA, LEVELABLE_ITEMS } from '@/models/useConstants';
import { useEncyclopedia } from '@/models/useEncyclopedia';

import EquipmentButtons from '@/components/characterSheet/EquipmentButtons.vue';
import ItemFilters from '@/components/characterSheet/ItemFilters.vue';
import ItemStatList from '@/components/characterSheet/ItemStatList.vue';
import ItemListCard from '@/components/characterSheet/ItemListCard.vue';

const confirm = useConfirm();
const { t } = useI18n();

const currentCharacter = inject('currentCharacter');
const currentItemList = inject('currentItemList');
const itemListLoading = inject('itemListLoading');
const itemFilters = inject('itemFilters');

const itemResultsWrapper = ref(null);
const numItemsPerRow = ref(4);
const { getNumTotalItems } = useItems();
let documentVar = document;

const { getItemEncyclopediaUrl } = useEncyclopedia();

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
const displayTotalValues = ref(true);

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
  let isRing = item.type.validSlots.includes(ITEM_SLOT_DATA.LEFT_HAND.id) || item.type.validSlots.includes(ITEM_SLOT_DATA.RIGHT_HAND.id);
  // this one handles equipping a 2H weaon while a second weapon is equipped
  let twoHandedWeaponConflict = item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) && currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] !== null;
  // this one handles equipping a second weapon while a 2H one is equipped
  let secondWeaponConflict =
    item.type.validSlots[0] === ITEM_SLOT_DATA.SECOND_WEAPON.id &&
    currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] !== null &&
    currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id].type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id);

  let hasRelicConflict = false;
  let existingRelicSlotId = null;
  let hasEpicConflict = false;
  let existingEpicSlotId = null;

  Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
    if (item.rarity === 5 && currentCharacter.value.equipment[slotKey] !== null && currentCharacter.value.equipment[slotKey].rarity === 5) {
      hasRelicConflict = true;
      existingRelicSlotId = slotKey;
    }

    if (item.rarity === 7 && currentCharacter.value.equipment[slotKey] !== null && currentCharacter.value.equipment[slotKey].rarity === 7) {
      hasEpicConflict = true;
      existingEpicSlotId = slotKey;
    }
  });

  let confirmMessage = null;
  if (hasRelicConflict) {
    confirmMessage = t('characterSheet.equipmentContent.hasRelicWarning');
  }

  if (hasEpicConflict) {
    confirmMessage = t('characterSheet.equipmentContent.hasEpicWarning');
  }

  if (twoHandedWeaponConflict) {
    confirmMessage = t('characterSheet.equipmentContent.twoHandedWeaponWarning');
  }

  if (secondWeaponConflict) {
    confirmMessage = t('characterSheet.equipmentContent.secondWeaponWarning');
  }

  if (hasRelicConflict && twoHandedWeaponConflict) {
    confirmMessage = t('characterSheet.equipmentContent.relicAndTwoHandedWarning');
  }

  if (hasRelicConflict && secondWeaponConflict) {
    confirmMessage = t('characterSheet.equipmentContent.relicAndSecondWeaponWarning');
  }

  if (hasEpicConflict && twoHandedWeaponConflict) {
    confirmMessage = t('characterSheet.equipmentContent.epicAndTwoHandedWarning');
  }

  if (hasEpicConflict && secondWeaponConflict) {
    confirmMessage = t('characterSheet.equipmentContent.epicAndSecondWeaponWarning');
  }

  let hasConflict = twoHandedWeaponConflict || secondWeaponConflict || hasRelicConflict || hasEpicConflict;

  if (hasConflict) {
    confirm.require({
      group: 'popup',
      target: event.currentTarget,
      message: confirmMessage,
      accept: () => {
        if (isRing) {
          if (currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] === null) {
            currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] = item;
          } else {
            currentCharacter.value.equipment[ITEM_SLOT_DATA.RIGHT_HAND.id] = item;
          }
        }

        if (twoHandedWeaponConflict) {
          currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] = item;
          currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] = null;
        }

        if (secondWeaponConflict) {
          currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] = null;
          currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] = item;
        }

        if (hasRelicConflict) {
          // there is a relic conflict and they have opted to remove it
          currentCharacter.value.equipment[existingRelicSlotId] = null;
          currentCharacter.value.equipment[item.type.validSlots[0]] = item;
        }

        if (hasEpicConflict) {
          // there is a relic conflict and they have opted to remove it
          currentCharacter.value.equipment[existingEpicSlotId] = null;
          currentCharacter.value.equipment[item.type.validSlots[0]] = item;
        }
      },
    });
  } else {
    // no conflicts, just equip it normally
    if (isRing) {
      if (currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] === null) {
        currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] = item;
      } else {
        currentCharacter.value.equipment[ITEM_SLOT_DATA.RIGHT_HAND.id] = item;
      }
    } else if (item.type.validSlots.length > 1) {
      console.log('There is an item type with 2 valid slots that we are not handling', item.type);
    } else {
      currentCharacter.value.equipment[item.type.validSlots[0]] = item;
    }
  }
};

const onGotoEncyclopedia = (item) => {
  let url = getItemEncyclopediaUrl(item);
  window.open(url, '_blank');
};

defineExpose({
  showList,
});
</script>

<style lang="scss" scoped>
:deep(.item-results-wrapper) {
  min-height: 300px;
  .item-card {
    border: 1px solid var(--highlight-50);
    width: 230px;
    height: 60px;
    margin-right: 5px;
    margin-bottom: 5px;
    border-radius: 8px;
    background: var(--background-20);
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

:deep(.sort-dropdown) {
  .p-dropdown-label {
    padding: 4px 6px;
  }
}

.loading-state {
  border: 1px solid var(--primary-50);
  border-radius: 8px;
  .first-spinner {
    position: absolute;
    left: 25px;
    top: 25px;
  }

  .second-spinner {
    position: absolute;
  }
}
</style>
