<template>
  <div class="flex align-items-center flex-wrap mt-3">
    <p-inputText v-model="searchTerm" :placeholder="$t('characterSheet.equipmentContent.itemFilters.searchItems')" class="search-input mr-2" @input="onSearchInput" />
    <div class="flex align-items-center mr-2" style="width: 100%; max-width: 400px">
      <p-inputNumber v-model="levelRange[0]" class="number-input" :min="0" :max="230" :allow-empty="false" @input="onLevelRangeTextInput($event, 'min')" />
      <p-slider v-model="levelRange" class="flex-grow-1 mx-3" range :min="0" :max="230" @change="onLevelRangeChange" />
      <p-inputNumber v-model="levelRange[1]" class="number-input" :min="0" :max="230" :allow-empty="false" @input="onLevelRangeTextInput($event, 'max')" />
    </div>
    <p-button class="filter-button" :label="$t('characterSheet.equipmentContent.itemFilters.resetFilters')" @click="onResetFilters" />
  </div>

  <div class="checkmarks-container flex gap-2">
    <div class="rarity-container mt-2">
      <div class="flex align-items-center mb-1">
        <p-button class="filter-button item-filter-action mr-2" :label="$t('characterSheet.equipmentContent.itemFilters.all')" @click="onSelectAllRarities" />
        <tippy placement="top">
          <i class="mdi mdi-information-outline" />
          <template v-slot:content>
            <div class="simple-tooltip">{{ $t('characterSheet.equipmentContent.itemFilters.ctrlClickToSelectOne') }}</div>
          </template>
        </tippy>
        <div class="mr-2 ml-1">{{ $t('characterSheet.equipmentContent.itemFilters.rarities') }}</div>
        <p-button class="filter-button item-filter-action" :label="$t('characterSheet.equipmentContent.itemFilters.none')" @click="onClearAllRarities" />
      </div>
      <div class="rarity-button-wrapper">
        <template v-for="rarity in rarityFilters" :key="rarity.id">
          <tippy duration="0">
            <p-checkbox v-model="rarity.checked" :binary="true" class="rarity-checkbox" @change="onRarityClick($event, rarity.id)">
              <template v-slot:icon="slotProps">
                <div class="flex justify-content-center align-items-center">
                  <p-image :class="{ disabled: !slotProps.checked }" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${rarity.id}.png`" image-style="width: 14px;" />
                </div>
              </template>
            </p-checkbox>

            <template v-slot:content>
              <div class="simple-tooltip">
                {{ $t(rarity.name) }}
              </div>
            </template>
          </tippy>
        </template>
      </div>
    </div>

    <div class="item-types-container mt-2">
      <div class="flex align-items-center justify-content-center mb-1 w-full">
        <p-button class="filter-button item-filter-action mr-2" :label="$t('characterSheet.equipmentContent.itemFilters.all')" @click="onSelectAllItemTypes" />
        <tippy placement="top">
          <i class="mdi mdi-information-outline" />
          <template v-slot:content>
            <div class="simple-tooltip">{{ $t('characterSheet.equipmentContent.itemFilters.ctrlClickToSelectOne') }}</div>
          </template>
        </tippy>
        <div class="mr-2 ml-1">{{ $t('characterSheet.equipmentContent.itemFilters.itemTypes') }}</div>
        <tippy>
          <p-checkbox v-model="showAdvancedFilters" class="mr-2" :binary="true" />

          <template v-slot:content>
            <div class="simple-tooltip">{{ $t('characterSheet.equipmentContent.itemFilters.showAllFilters') }}</div>
          </template>
        </tippy>
        <p-button class="filter-button item-filter-action" :label="$t('characterSheet.equipmentContent.itemFilters.none')" @click="onClearAllItemTypes" />
      </div>
      <div class="item-types-button-wrapper">
        <div class="filter-category-wrapper">
          <template v-for="itemType in itemTypeFilters.filter((entry) => entry.category === 'armor')" :key="itemType.id">
            <tippy v-if="!itemType.advanced || showAdvancedFilters" duration="0">
              <p-checkbox v-model="itemType.checked" :binary="true" class="item-type-checkbox" @change="onItemTypeClick($event, itemType.id)">
                <template v-slot:icon="slotProps">
                  <div class="flex justify-content-center align-items-center">
                    <p-image
                      v-if="itemType.rawId"
                      :class="{ disabled: !slotProps.checked }"
                      :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${itemType.rawId}.png`"
                      image-style="width: 16px;"
                    />

                    <p-image
                      v-else
                      :class="{ disabled: !slotProps.checked }"
                      :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${itemType.rawIds[0]}.png`"
                      image-style="width: 16px;"
                    />
                  </div>
                </template>
              </p-checkbox>

              <template v-slot:content>
                <div class="simple-tooltip">
                  {{ $t(itemType.name) }}
                </div>
              </template>
            </tippy>
          </template>
        </div>

        <div class="filter-category-wrapper">
          <template v-for="itemType in itemTypeFilters.filter((entry) => entry.category === 'weapons')" :key="itemType.id">
            <tippy v-if="!itemType.advanced || showAdvancedFilters" duration="0">
              <p-checkbox v-model="itemType.checked" :binary="true" class="item-type-checkbox" @change="updateFilters(itemType)">
                <template v-slot:icon="slotProps">
                  <div class="flex justify-content-center align-items-center">
                    <p-image
                      v-if="itemType.rawId"
                      :class="{ disabled: !slotProps.checked }"
                      :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${itemType.rawId}.png`"
                      image-style="width: 16px;"
                    />

                    <p-image
                      v-else
                      :class="{ disabled: !slotProps.checked }"
                      :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${itemType.rawIds[0]}.png`"
                      image-style="width: 16px;"
                    />
                  </div>
                </template>
              </p-checkbox>

              <template v-slot:content>
                <div class="simple-tooltip">
                  {{ $t(itemType.name) }}
                </div>
              </template>
            </tippy>
          </template>
        </div>

        <div class="filter-category-wrapper">
          <template v-for="itemType in itemTypeFilters.filter((entry) => entry.category === 'miscellaneous')" :key="itemType.id">
            <tippy v-if="!itemType.advanced || showAdvancedFilters" duration="0">
              <p-checkbox v-model="itemType.checked" :binary="true" class="item-type-checkbox" @change="updateFilters">
                <template v-slot:icon="slotProps">
                  <div class="flex justify-content-center align-items-center">
                    <p-image
                      v-if="itemType.rawId"
                      :class="{ disabled: !slotProps.checked }"
                      :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${itemType.rawId}.png`"
                      image-style="width: 16px;"
                    />

                    <p-image
                      v-else
                      :class="{ disabled: !slotProps.checked }"
                      :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${itemType.rawIds[0]}.png`"
                      image-style="width: 16px;"
                    />
                  </div>
                </template>
              </p-checkbox>

              <template v-slot:content>
                <div class="simple-tooltip">
                  {{ $t(itemType.name) }}
                </div>
              </template>
            </tippy>
          </template>
        </div>
      </div>
    </div>
  </div>

  <div class="filter-list-wrapper mt-3">
    <p-button icon="pi pi-plus" class="filter-button" :label="$t('characterSheet.equipmentContent.itemFilters.newFilter')" @click="onAddFilter" />

    <template v-for="filter in effectFilters" :key="filter.id">
      <div class="filter-entry">
        <p-dropdown v-model="filter.type" class="filter-type-dropdown" :options="filterTypeOptions" filter auto-filter-focus option-label="text" @change="updateFilters">
          <template v-slot:value="slotProps"> {{ $t(slotProps.value.text) }} </template>
          <template v-slot:option="slotProps">
            <div class="px-2 py-1">{{ $t(slotProps.option.text) }}</div>
          </template>
        </p-dropdown>
        <p-dropdown v-model="filter.comparator" class="filter-comparator-dropdown" :options="COMPARATORS" option-label="text" @change="updateFilters">
          <template v-slot:value="slotProps"> {{ slotProps.value.symbol }} </template>
          <template v-slot:option="slotProps">
            <div class="px-2 py-1">{{ $t(slotProps.option.text) }}</div>
          </template>
        </p-dropdown>
        <p-inputNumber v-model="filter.value" class="filter-value-input" :allow-empty="false" @input="updateFilters" />
        <p-button class="remove-filter-button" icon="pi pi-trash" @click="onRemoveFilter(filter)" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { debounce } from 'lodash';

import { EFFECT_TYPE_DATA } from '@/models/useConstants.js';

const COMPARATORS = [
  {
    id: 'equalTo',
    text: 'characterSheet.equipmentContent.itemFilters.equalTo',
    symbol: '=',
  },
  {
    id: 'lessThanOrEqualTo',
    text: 'characterSheet.equipmentContent.itemFilters.lessThanOrEqualTo',
    symbol: '<=',
  },
  {
    id: 'greaterThanOrEqualTo',
    text: 'characterSheet.equipmentContent.itemFilters.greaterThanOrEqualTo',
    symbol: '>=',
  },
];

const FILTER_TYPE_IDS = [
  EFFECT_TYPE_DATA.healthPoints.id,
  EFFECT_TYPE_DATA.healingMastery.id,
  EFFECT_TYPE_DATA.actionPoints.id,
  EFFECT_TYPE_DATA.movementPoints.id,
  EFFECT_TYPE_DATA.rearResistance.id,
  EFFECT_TYPE_DATA.elementalResistance.id,
  EFFECT_TYPE_DATA.fireResistance.id,
  EFFECT_TYPE_DATA.waterResistance.id,
  EFFECT_TYPE_DATA.earthResistance.id,
  EFFECT_TYPE_DATA.airResistance.id,
  EFFECT_TYPE_DATA.elementalMastery.id,
  EFFECT_TYPE_DATA.fireMastery.id,
  EFFECT_TYPE_DATA.earthMastery.id,
  EFFECT_TYPE_DATA.waterMastery.id,
  EFFECT_TYPE_DATA.airMastery.id,
  EFFECT_TYPE_DATA.criticalMastery.id,
  EFFECT_TYPE_DATA.criticalHit.id,
  EFFECT_TYPE_DATA.range.id,
  EFFECT_TYPE_DATA.prospecting.id,
  EFFECT_TYPE_DATA.wisdom.id,
  EFFECT_TYPE_DATA.initiative.id,
  EFFECT_TYPE_DATA.lock.id,
  EFFECT_TYPE_DATA.dodge.id,
  EFFECT_TYPE_DATA.forceOfWill.id,
  EFFECT_TYPE_DATA.rearMastery.id,
  EFFECT_TYPE_DATA.control.id,
  EFFECT_TYPE_DATA.wakfuPoints.id,
  EFFECT_TYPE_DATA.percentBlock.id,
  EFFECT_TYPE_DATA.criticalResistance.id,
  EFFECT_TYPE_DATA.meleeMastery.id,
  EFFECT_TYPE_DATA.distanceMastery.id,
  EFFECT_TYPE_DATA.berserkMastery.id,
  EFFECT_TYPE_DATA.randomElementalMasteries.id,
  EFFECT_TYPE_DATA.randomElementalResistances.id,
  EFFECT_TYPE_DATA.harvestingQuantity.id,
  EFFECT_TYPE_DATA.armorGiven.id,
  EFFECT_TYPE_DATA.armorReceived.id,
];

const filterTypeOptions = FILTER_TYPE_IDS.map((typeId) => {
  return {
    value: typeId,
    text: EFFECT_TYPE_DATA[typeId].text,
  };
});

const itemFilters = inject('itemFilters');

const searchTerm = ref('');
const levelRange = ref([itemFilters.startLevel, itemFilters.endLevel]);

const effectFilters = ref([]);
const rarityFilters = ref(itemFilters.rarityFilters);
const itemTypeFilters = ref(itemFilters.itemTypeFilters);
const showAdvancedFilters = ref(false);

const onSearchInput = () => {
  updateFilters();
};

const onLevelRangeTextInput = (event, type) => {
  if (type === 'min') {
    levelRange.value[0] = event.value;
  }

  if (type === 'max') {
    levelRange.value[1] = event.value;
  }

  updateFilters();
};

const onLevelRangeChange = () => {
  updateFilters();
};

const onItemTypeClick = (event, itemTypeId) => {
  if (event.ctrlKey) {
    // we want to remove all rarity filters and have just the clicked one
    itemFilters.itemTypeFilters.forEach((filter) => {
      if (filter.id !== itemTypeId) {
        filter.checked = false;
      } else {
        filter.checked = true;
      }
    });
  }
  updateFilters();
};

const onRarityClick = (event, rarityId) => {
  if (event.ctrlKey) {
    // we want to remove all rarity filters and have just the clicked one
    itemFilters.rarityFilters.forEach((filter) => {
      if (filter.id !== rarityId) {
        filter.checked = false;
      } else {
        filter.checked = true;
      }
    });
  }
  updateFilters();
};

const updateFilters = debounce((itemTypeFilter) => {
  itemFilters.searchTerm = searchTerm.value;
  itemFilters.startLevel = levelRange.value[0];
  itemFilters.endLevel = levelRange.value[1];
  itemFilters.effectFilters = effectFilters.value;
  itemFilters.rarityFilters = rarityFilters.value;

  if (itemTypeFilter && itemTypeFilter.rawIds?.length) {
    handleGroupItemTypeFilter(itemTypeFilter);
  } else {
    itemFilters.itemTypeFilters = itemTypeFilters.value;
  }
}, 100);

const handleGroupItemTypeFilter = (itemTypeFilter) => {
  itemTypeFilter.rawIds.forEach((targetFilterRawId) => {
    let targetFilter = itemTypeFilters.value.find((filter) => filter.rawId === targetFilterRawId);
    targetFilter.checked = itemTypeFilter.checked;
  });
};

const onAddFilter = () => {
  let newFilter = {
    type: filterTypeOptions[0],
    comparator: COMPARATORS[2],
    value: 0,
  };

  effectFilters.value.push(newFilter);
  updateFilters();
};

const onRemoveFilter = (filter) => {
  let targetIndex = effectFilters.value.indexOf(filter);
  effectFilters.value.splice(targetIndex, 1);
  updateFilters();
};

const onResetFilters = () => {
  itemFilters.resetFilters();
  searchTerm.value = itemFilters.searchTerm;
  levelRange.value[0] = itemFilters.startLevel;
  levelRange.value[1] = itemFilters.endLevel;
  effectFilters.value = itemFilters.effectFilters;
  rarityFilters.value = itemFilters.rarityFilters;
  itemTypeFilters.value = itemFilters.itemTypeFilters;
};

const onSelectAllRarities = () => {
  itemFilters.rarityFilters.forEach((filter) => {
    filter.checked = true;
  });
  updateFilters();
};

const onClearAllRarities = () => {
  itemFilters.rarityFilters.forEach((filter) => {
    filter.checked = false;
  });
  updateFilters();
};

const onSelectAllItemTypes = () => {
  itemFilters.itemTypeFilters.forEach((filter) => {
    filter.checked = true;
  });
  updateFilters();
};

const onClearAllItemTypes = () => {
  itemFilters.itemTypeFilters.forEach((filter) => {
    filter.checked = false;
  });
  updateFilters();
};
</script>

<style lang="scss" scoped>
.search-input {
  padding: 4px 6px;
}

.filter-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

:deep(.filter-button) {
  padding: 4px 6px;
  background-color: var(--background-20);
  font-weight: 400;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  &.item-filter-action {
    background-color: var(--background-20);
  }
}

:deep(.filter-entry) {
  height: fit-content;
  // border: 1px solid var(--primary-60);
  .filter-type-dropdown {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    .p-dropdown-label {
      padding: 4px 6px;
    }
  }

  .filter-comparator-dropdown {
    border-radius: 0;
    .p-dropdown-label {
      padding: 4px 6px;
    }
  }

  .filter-value-input {
    .p-inputtext {
      width: 4rem;
      border-radius: 0;
      padding: 4px 6px;
    }
  }

  .remove-filter-button {
    width: 30px;
    padding: 4px 6px;
    background-color: #1e1e1e;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;

    &:hover {
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
  }
}

.rarity-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--highlight-50);
  border-radius: 8px;
  padding: 4px 6px;
  width: fit-content;

  .rarity-button-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
  }
}

:deep(.rarity-checkbox) {
  width: 26px;
  height: 26px;
  box-shadow: none !important;

  &:hover {
    .p-checkbox-box {
      background-color: var(--primary-40);
    }
  }

  .p-checkbox-box {
    width: 26px;
    height: 26px;
    border-color: var(--highlight-50);
    background-color: var(--primary-30);

    &:has(.disabled) {
      background-color: var(--background-10);
    }
  }

  .disabled img {
    filter: grayscale(1);
    opacity: 0.5;
  }

  .p-image.p-component {
    height: 20px;
    margin-right: 0px;
  }
}

.item-types-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--highlight-50);
  border-radius: 8px;
  padding: 4px 6px;
  width: fit-content;

  .item-types-button-wrapper {
    display: flex;
    gap: 0.25rem;
  }

  .filter-category-wrapper {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    border: 1px solid var(--primary-50);
    border-radius: 8px;
    padding: 6px 6px;
  }
}

:deep(.item-type-checkbox) {
  width: 26px;
  height: 26px;
  box-shadow: none !important;

  &:hover {
    .p-checkbox-box {
      background-color: var(--primary-40);
    }
  }

  .p-checkbox-box {
    width: 26px;
    height: 26px;
    border-color: var(--highlight-50);
    background-color: var(--primary-40);

    &:has(.disabled) {
      background-color: var(--background-10);
    }
  }

  .disabled {
    img {
      filter: grayscale(1);
      opacity: 0.5;
    }
  }

  .p-image.p-component {
    height: 16px;
    margin-right: 0px;
  }
}

@media (max-width: 1024px) {
  .checkmarks-container {
    flex-direction: column;
  }
}
</style>
