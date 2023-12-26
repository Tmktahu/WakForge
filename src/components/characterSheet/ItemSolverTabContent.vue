<template>
  <div class="flex flex-column h-full" style="overflow-y: auto">
    <EquipmentButtons :character="currentCharacter" />

    <div class="flex flex-column mt-4">
      <div class="flex">
        <OptionCheckbox
          v-model="considerCurrentItems"
          :label="$t('characterSheet.itemSolverContent.considerCurrentItems')"
          :tooltip-text="$t('characterSheet.itemSolverContent.considerCurrentItemsTooltip')"
        />
      </div>

      <div class="flex mt-3">
        <div class="setting-group flex flex-column mr-3 gap-2">
          <div class="mb-2">
            <tippy placement="top" duration="0">
              <i class="mdi mdi-information-outline" />
              <template v-slot:content>
                <div class="simple-tooltip">{{ $t('characterSheet.itemSolverContent.targetStatsInfo') }}</div>
              </template>
            </tippy>
            {{ $t('characterSheet.itemSolverContent.totalTargetStats') }}
          </div>
          <OptionNumInput v-model="targetApAmount" :label="$t('constants.actionPoints')" :tooltip-text="$t('characterSheet.itemSolverContent.apTooltip')" />
          <OptionNumInput v-model="targetMpAmount" :label="$t('constants.movementPoints')" :tooltip-text="$t('characterSheet.itemSolverContent.mpTooltip')" />
          <OptionNumInput v-model="targetRangeAmount" :label="$t('constants.range')" :tooltip-text="$t('characterSheet.itemSolverContent.rangeTooltip')" />
          <OptionNumInput v-model="targetWpAmount" :label="$t('constants.wakfuPoints')" :tooltip-text="$t('characterSheet.itemSolverContent.wakfuTooltip')" />
        </div>

        <div class="setting-group flex flex-column mr-3">
          <div class="flex flex-column gap-2">
            <div class="mb-2">
              <tippy placement="top" duration="0">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">{{ $t('characterSheet.itemSolverContent.prioritiesInfo') }}</div>
                </template>
              </tippy>
              {{ $t('characterSheet.itemSolverContent.priorities') }}
            </div>

            <div class="flex align-items-center">
              <div class="mr-2">{{ $t('constants.meleeMastery') }}</div>
              <p-dropdown v-model="meleeMasteryPriority" class="condensed-dropdown" option-label="label" :options="priorityOptions">
                <template v-slot:value="slotProps"> {{ $t(slotProps.value.label) }} </template>
                <template v-slot:option="slotProps">
                  <div class="px-2 py-1">{{ $t(slotProps.option.label) }}</div>
                </template>
              </p-dropdown>
            </div>

            <div class="flex align-items-center">
              <div class="mr-2">{{ $t('constants.distanceMastery') }}</div>
              <p-dropdown v-model="distanceMasteryPriority" class="condensed-dropdown" option-label="label" :options="priorityOptions">
                <template v-slot:value="slotProps"> {{ $t(slotProps.value.label) }} </template>
                <template v-slot:option="slotProps">
                  <div class="px-2 py-1">{{ $t(slotProps.option.label) }}</div>
                </template>
              </p-dropdown>
            </div>

            <div class="flex align-items-center">
              <div class="mr-2">{{ $t('constants.healingMastery') }}</div>
              <p-dropdown v-model="healingMasteryPriority" class="condensed-dropdown" option-label="label" :options="priorityOptions">
                <template v-slot:value="slotProps"> {{ $t(slotProps.value.label) }} </template>
                <template v-slot:option="slotProps">
                  <div class="px-2 py-1">{{ $t(slotProps.option.label) }}</div>
                </template>
              </p-dropdown>
            </div>

            <div class="flex align-items-center">
              <div class="mr-2">{{ $t('constants.rearMastery') }}</div>
              <p-dropdown v-model="rearMasteryPriority" class="condensed-dropdown" option-label="label" :options="priorityOptionsWithNegatives">
                <template v-slot:value="slotProps"> {{ $t(slotProps.value.label) }} </template>
                <template v-slot:option="slotProps">
                  <div class="px-2 py-1">{{ $t(slotProps.option.label) }}</div>
                </template>
              </p-dropdown>
            </div>

            <div class="flex align-items-center">
              <div class="mr-2">{{ $t('constants.berserkMastery') }}</div>
              <p-dropdown v-model="berserkMasteryPriority" class="condensed-dropdown" option-label="label" :options="priorityOptionsWithNegatives">
                <template v-slot:value="slotProps"> {{ $t(slotProps.value.label) }} </template>
                <template v-slot:option="slotProps">
                  <div class="px-2 py-1">{{ $t(slotProps.option.label) }}</div>
                </template>
              </p-dropdown>
            </div>
          </div>
        </div>

        <div class="flex flex-column">
          <div class="rarity-container">
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
              <template v-for="rarity in allowedRarities" :key="rarity.id">
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

          <div class="setting-group flex flex-column gap-2 mt-2">
            <div class="mb-2">
              <tippy placement="top" duration="0">
                <i class="mdi mdi-information-outline" />
                <template v-slot:content>
                  <div class="simple-tooltip">{{ $t('characterSheet.itemSolverContent.elementaryMasteryInfo') }}</div>
                </template>
              </tippy>
              {{ $t('constants.elementalMasteries') }}
            </div>

            <OptionCheckbox v-model="fireMastery" :label="$t('constants.fireMastery')" />
            <OptionCheckbox v-model="earthMastery" :label="$t('constants.earthMastery')" />
            <OptionCheckbox v-model="waterMastery" :label="$t('constants.waterMastery')" />
            <OptionCheckbox v-model="airMastery" :label="$t('constants.airMastery')" />
          </div>
        </div>
      </div>
      <div v-if="warningMessage !== null" class="warning-message mt-2 py-1 px-2">{{ warningMessage }}</div>
    </div>

    <div class="flex align-items-center mt-3">
      <p-button
        class="py-2 px-3 mr-2"
        :disabled="!hasValidValues"
        :label="filteredItemSet?.length ? $t('characterSheet.itemSolverContent.regenerateItemSet') : $t('characterSheet.itemSolverContent.generateItemSet')"
        @click="onCalculate"
      />
      <p-button class="py-2 px-3 mr-2" :disabled="!filteredItemSet?.length" :label="$t('characterSheet.itemSolverContent.equipAllItems')" @click="onEquipAll($event)" />

      <div class="flex-grow-1" />

      <div v-html="$t('characterSheet.itemSolverContent.poweredBy', { credit: getLinkText() })" />
    </div>

    <div class="flex align-items-center gap-4 mt-2">
      <OptionCheckbox v-model="showAllItems" :label="$t('characterSheet.itemSolverContent.showAllItems')" />
      <OptionCheckbox v-model="displayTotals" :label="$t('characterSheet.itemSolverContent.displayTotals')" />
      <OptionCheckbox v-model="withComparisons" :label="$t('characterSheet.equipmentContent.compareToEquipped')" />
    </div>

    <div v-if="!builderLoading" class="results-display flex flex-column flex-grow-1 mt-2">
      <div v-if="builderError" class="error-state px-3 py-3">
        <div v-if="builderError.debug" class="mt-1">
          {{ $t('characterSheet.itemSolverContent.sinbadErrorInfo') }}
        </div>
        <div v-else> {{ $t('characterSheet.itemSolverContent.problemMessage') }} </div>

        <div class="mt-3">
          <div>Error Code: {{ builderError.message }}</div>
          <div v-if="builderError.debug" class="mt-2">
            <div style="word-wrap: break-word; max-width: calc(200px)">Debug Code: {{ builderError.debug }}</div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredItemSet?.length">
        <div class="flex flex-wrap gap-1 mt-2">
          <template v-for="item in filteredItemSet" :key="item.id">
            <div class="item-card-wrapper">
              <ItemListCard :item="item" with-slot-label :with-comparisons="withComparisons" :with-totals="displayTotals" />
            </div>
          </template>
        </div>
      </div>

      <div v-else class="loading-state px-3 py-3">
        <div> {{ $t('characterSheet.itemSolverContent.instructions') }} </div>
        <div class="mt-2"> {{ $t('characterSheet.itemSolverContent.ifYouNeedHelp') }} </div>
      </div>
    </div>

    <div v-else class="loading-state flex flex-column flex-grow-1 w-full mt-3">
      <div class="text-center mt-2">{{ $t('characterSheet.itemSolverContent.loadingMessage') }}</div>
      <div class="text-center mb-5 mt-2">{{ $t('characterSheet.itemSolverContent.loadingDisclaimer') }}</div>
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
import { ref, watch, computed, inject } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useI18n } from 'vue-i18n';

import { ITEM_RARITY_DATA } from '@/models/useConstants';
import { useAutoBuilder } from '@/models/useAutoBuilder';
import { useItems } from '@/models/useItems';
import { useBuildCodes } from '@/models/useBuildCodes';

import EquipmentButtons from '@/components/characterSheet/EquipmentButtons.vue';
import OptionCheckbox from '@/components/itemSolver/OptionCheckbox.vue';
import OptionNumInput from '@/components/itemSolver/OptionNumInput.vue';
import ItemListCard from '@/components/characterSheet/ItemListCard.vue';

const { t } = useI18n();
const confirm = useConfirm();

const currentCharacter = inject('currentCharacter');

const { equipItem } = useItems(currentCharacter);
const { runCalculations, autoBuilderIsReady, itemSet, builderLoading, builderError } = useAutoBuilder();
const { createBuildCode } = useBuildCodes();

const showAllItems = ref(false);
const displayTotals = ref(false);
const withComparisons = ref(false);

const filteredItemSet = computed(() => {
  if (showAllItems.value) {
    return itemSet.value;
  } else {
    let currentItemIds = Object.keys(currentCharacter.value.equipment)
      .map((key) => {
        if (currentCharacter.value.equipment[key]) {
          return currentCharacter.value.equipment[key].id;
        }
      })
      .filter((id) => id !== undefined);

    if (itemSet.value) {
      return itemSet.value.filter((item) => {
        return !currentItemIds.includes(item.id);
      });
    } else {
      return [];
    }
  }
});

const targetApAmount = ref(currentCharacter.value.actionPoints);
const targetMpAmount = ref(currentCharacter.value.movementPoints);
const targetRangeAmount = ref(currentCharacter.value.stats.range);
const targetWpAmount = ref(currentCharacter.value.wakfuPoints);

const fireMastery = ref(false);
const earthMastery = ref(false);
const waterMastery = ref(false);
const airMastery = ref(false);

const priorityOptions = [
  {
    value: 0,
    label: 'characterSheet.itemSolverContent.normal',
  },
  {
    value: 1,
    label: 'characterSheet.itemSolverContent.prioritized',
  },
];

const priorityOptionsWithNegatives = [
  ...priorityOptions,
  {
    value: 2,
    label: 'characterSheet.itemSolverContent.preferNoNegatives',
  },
  {
    value: 4,
    label: 'characterSheet.itemSolverContent.heavilyPreferNoNegatives',
  },
];

const meleeMasteryPriority = ref(priorityOptions[0]);
const distanceMasteryPriority = ref(priorityOptions[0]);
const healingMasteryPriority = ref(priorityOptions[0]);
const rearMasteryPriority = ref(priorityOptions[0]);
const berserkMasteryPriority = ref(priorityOptions[0]);

const considerCurrentItems = ref(true);

const allowedRarities = ref(
  ITEM_RARITY_DATA.map((rarityEntry) => {
    return {
      ...rarityEntry,
      checked: true,
    };
  })
);

const initLoading = ref(true);

watch(autoBuilderIsReady, () => {
  initLoading.value = false;
});

const onSelectAllRarities = () => {
  allowedRarities.value.forEach((filter) => {
    filter.checked = true;
  });
};

const onClearAllRarities = () => {
  allowedRarities.value.forEach((filter) => {
    filter.checked = false;
  });
};

const hasValidValues = computed(() => {
  return autoBuilderIsReady.value;
});

const buildCode = computed(() => {
  return createBuildCode(currentCharacter.value);
});

const warningMessage = ref(null);

watch([targetApAmount, targetMpAmount, targetRangeAmount, targetWpAmount], () => {
  warningMessage.value = null;
  if (targetApAmount.value - currentCharacter.value.actionPoints >= 6) {
    warningMessage.value = t('characterSheet.itemSolverContent.apWarning');
  } else if (targetRangeAmount.value - currentCharacter.value.stats.range > 5) {
    warningMessage.value = t('characterSheet.itemSolverContent.rangeImpossibleWarning');
  } else if (currentCharacter.value.level < 35) {
    if (targetRangeAmount.value - currentCharacter.value.stats.range > 0) {
      warningMessage.value = t('characterSheet.itemSolverContent.rangeForLevelWarning');
    }
  } else if (currentCharacter.value.level < 50) {
    if (targetRangeAmount.value - currentCharacter.value.stats.range > 1) {
      warningMessage.value = t('characterSheet.itemSolverContent.rangeForLevelWarning');
    } else if (targetApAmount.value - currentCharacter.value.actionPoints + targetMpAmount.value - currentCharacter.value.movementPoints > 4) {
      warningMessage.value = t('characterSheet.itemSolverContent.combinedApMpWarning');
    }
  } else if (currentCharacter.value.level < 80) {
    if (targetRangeAmount.value - currentCharacter.value.stats.range > 3) {
      warningMessage.value = t('characterSheet.itemSolverContent.rangeForLevelWarning');
    }
  }
});

const onCalculate = async () => {
  let rarityIds = allowedRarities.value.filter((rarity) => rarity.checked).map((rarity) => rarity.id);

  let params = {
    buildCode: buildCode.value,

    meleeMasteryPriority: meleeMasteryPriority.value,
    distanceMasteryPriority: distanceMasteryPriority.value,
    healingMasteryPriority: healingMasteryPriority.value,
    rearMasteryPriority: rearMasteryPriority.value,
    berserkMasteryPriority: berserkMasteryPriority.value,

    fireMastery: fireMastery.value,
    earthMastery: earthMastery.value,
    waterMastery: waterMastery.value,
    airMastery: airMastery.value,

    targetApAmount: targetApAmount.value || 0,
    targetMpAmount: targetMpAmount.value || 0,
    targetRangeAmount: targetRangeAmount.value || 0,
    targetWpAmount: targetWpAmount.value || 0,

    selectedRarityIds: rarityIds,

    ignoreEquippedItems: !considerCurrentItems.value,
  };

  runCalculations(params);
};

const onEquipAll = (event) => {
  confirm.require({
    group: 'popup',
    target: event.currentTarget,
    message: t('confirms.willReplaceItems'),
    accept: () => {
      itemSet.value.forEach((item) => {
        equipItem(item);
      });
    },
  });
};

const onRarityClick = (event, rarityId) => {
  if (event.ctrlKey) {
    // we want to remove all rarity filters and have just the clicked one
    allowedRarities.value.forEach((filter) => {
      if (filter.id !== rarityId) {
        filter.checked = false;
      } else {
        filter.checked = true;
      }
    });
  }
};

const getLinkText = () => {
  return `<a href="//github.com/mikeshardmind/wakfu-utils" target="_blank">Keeper of Time (sinbad)</a>`;
};
</script>

<style lang="scss" scoped>
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

.error-state {
  border: 1px solid var(--error);
  border-radius: 8px;
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
    background-color: var(--primary-20);

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

:deep(.filter-button) {
  padding: 4px 6px;
  background-color: #1e1e1e;
  font-weight: 400;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  &.item-filter-action {
    background-color: var(--primary-40-30);
  }
}

.setting-group {
  padding: 12px 12px;
  border: 1px solid var(--highlight-50);
  border-radius: 8px;
}

.warning-message {
  width: fit-content;
  border: 1px solid var(--error);
  border-radius: 8px;
}

.item-card-wrapper {
  border: 1px solid var(--highlight-90);
  border-radius: 8px;
  overflow: hidden;
}
</style>
