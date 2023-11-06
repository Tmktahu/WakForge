<template>
  <div class="flex flex-column h-full" style="overflow-y: auto">
    <EquipmentButtons :character="currentCharacter" />

    <div class="flex flex-column mt-4">
      <div class="flex">
        <OptionCheckbox
          v-model="considerCurrentItems"
          label="Consider Current Items"
          tooltip-text="Should the currently equipped items be taken into consideration?"
        />
      </div>

      <div class="flex mt-1">
        <div class="flex flex-column mr-3">
          <OptionNumInput v-model="targetApAmount" label="Action Points" tooltip-text="How many total Action Points you want." />
          <OptionNumInput v-model="targetMpAmount" label="Movement Points" tooltip-text="How many total Movement Points you want." />
          <OptionNumInput v-model="targetRangeAmount" label="Range" tooltip-text="How many total Range you want." />
          <OptionNumInput v-model="targetWpAmount" label="Wakfu Points" tooltip-text="How many total Wakfu Points you want." />
          <OptionNumInput v-model="targetNumElements" label="Num Elements" tooltip-text="How many elemental bonuses you want on each item." />
        </div>

        <div class="flex flex-column">
          <div class="flex flex-column mt-2">
            <OptionCheckbox v-model="meleeMastery" label="Melee Mastery" tooltip-text="Should Melee Mastery be included if possible?" />
            <OptionCheckbox v-model="distanceMastery" label="Distance Mastery" tooltip-text="Should Distance Mastery be included if possible?" />
            <OptionCheckbox v-model="healingMastery" label="Healing Mastery" tooltip-text="Should Healing Mastery be included if possible?" />
            <OptionCheckbox v-model="rearMastery" label="Rear Mastery" tooltip-text="Should Rear Mastery be included if possible?" />
            <OptionCheckbox v-model="berserkMastery" label="Berserk Mastery" tooltip-text="Should Berserk Mastery be included if possible?" />
          </div>
        </div>
      </div>
    </div>

    <div>
      <div class="rarity-container">
        <div class="flex align-items-center mb-1">
          <p-button class="filter-button item-filter-action" label="All" @click="onSelectAllRarities" />
          <div class="mx-2">Rarities</div>
          <p-button class="filter-button item-filter-action" label="None" @click="onClearAllRarities" />
        </div>
        <div class="rarity-button-wrapper">
          <template v-for="rarity in allowedRarities" :key="rarity.id">
            <tippy duration="0">
              <p-checkbox v-model="rarity.checked" :binary="true" class="rarity-checkbox">
                <template v-slot:icon="slotProps">
                  <div class="flex justify-content-center align-items-center">
                    <p-image
                      :class="{ disabled: !slotProps.checked }"
                      :src="`https://tmktahu.github.io/WakfuAssets/rarities/${rarity.id}.png`"
                      image-style="width: 14px;"
                    />
                  </div>
                </template>
              </p-checkbox>

              <template v-slot:content>
                <div class="simple-tooltip">
                  {{ rarity.name }}
                </div>
              </template>
            </tippy>
          </template>
        </div>
      </div>
    </div>

    <div class="flex align-items-center mt-3">
      <p-button
        class="py-2 px-3 mr-2"
        :disabled="!hasValidValues"
        :label="filteredItemSet?.length ? 'Re-Generate Item Set' : 'Generate Item Set'"
        @click="onCalculate"
      />
      <p-button class="py-2 px-3" :disabled="!filteredItemSet?.length" label="Equip All Items" @click="onEquipAll($event)" />
      <!-- <div class="ml-3">warning message</div> -->
    </div>

    <div v-if="!builderLoading" class="results-display flex flex-column flex-grow-1 mt-2">
      <div v-if="filteredItemSet?.length">
        <div class="flex flex-wrap gap-1 mt-2">
          <template v-for="item in filteredItemSet" :key="item.id">
            <ItemListCard :item="item" />
          </template>
        </div>
      </div>
    </div>

    <div v-else class="loading-state flex flex-column flex-grow-1 w-full">
      <div class="text-center mb-5">Jimmy is doing the math and stuff... Please wait...</div>
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
import { useConfirm } from 'primevue/useconfirm';

import { ITEM_RARITY_DATA, EFFECT_TYPE_DATA } from '@/models/useConstants';
import { useAutoBuilder } from '@/models/useAutoBuilder';
import { useItems } from '@/models/useItems';
import { useStats } from '@/models/useStats';

import EquipmentButtons from '@/components/EquipmentButtons.vue';
import OptionCheckbox from '@/components/itemSolver/OptionCheckbox.vue';
import OptionNumInput from '@/components/itemSolver/OptionNumInput.vue';
import ItemListCard from '@/components/ItemListCard.vue';

const confirm = useConfirm();

const currentCharacter = inject('currentCharacter');

const { calcItemContribution } = useStats(currentCharacter);
const { equipItem } = useItems(currentCharacter);
const { runCalculations, autoBuilderIsReady, itemSet, builderLoading, builderError } = useAutoBuilder();

const filteredItemSet = computed(() => {
  return itemSet.value;
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
});

const targetApAmount = ref(currentCharacter.value.actionPoints);
const targetMpAmount = ref(currentCharacter.value.movementPoints);
const targetRangeAmount = ref(currentCharacter.value.stats.range);
const targetWpAmount = ref(currentCharacter.value.wakfuPoints);
const targetNumElements = ref(3);

const meleeMastery = ref(false);
const distanceMastery = ref(false);
const healingMastery = ref(false);
const rearMastery = ref(false);
const berserkMastery = ref(false);

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
  // updateFilters();
};

const onClearAllRarities = () => {
  allowedRarities.value.forEach((filter) => {
    filter.checked = false;
  });
  // updateFilters();
};

const hasValidValues = computed(() => {
  return autoBuilderIsReady.value && currentCharacter.value.class !== null;
});

const onCalculate = async () => {
  let currentItemIds = null;
  if (considerCurrentItems.value) {
    currentItemIds = Object.keys(currentCharacter.value.equipment)
      .map((key) => {
        if (currentCharacter.value.equipment[key]) {
          return currentCharacter.value.equipment[key].id;
        }
      })
      .filter((id) => id !== undefined);
  }

  let rarityIds = allowedRarities.value.filter((rarity) => rarity.checked).map((rarity) => rarity.id);

  let params = {
    targetLevel: currentCharacter.value.level,
    // targetClass: currentCharacter.value.class,

    meleeMastery: meleeMastery.value,
    distanceMastery: distanceMastery.value,
    healingMastery: healingMastery.value,
    rearMastery: rearMastery.value,
    berserkMastery: berserkMastery.value,

    targetNumElements: targetNumElements.value,

    currentCharacter: currentCharacter.value,

    targetStats: {
      actionPoints: targetApAmount.value,
      movementPoints: targetMpAmount.value,
      range: targetRangeAmount.value,
      wakfuPoints: targetWpAmount.value,
    },

    selectedRarityIds: rarityIds,

    currentItemIds,
  };

  runCalculations(params);
};

const onEquipAll = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Are you sure? This will replace any other items you have equipped right now in conflicting slots.',
    accept: () => {
      itemSet.value.forEach((item) => {
        equipItem(item);
      });
    },
  });
};
</script>

<style lang="scss" scoped>
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

.rarity-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--bonta-blue-60);
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
      background-color: var(--bonta-blue-30);
    }
  }

  .p-checkbox-box {
    width: 26px;
    height: 26px;
    border-color: var(--bonta-blue-70);
    background-color: var(--bonta-blue);

    &:has(.disabled) {
      background-color: var(--charcoal);
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
  color: white;
  font-weight: 400;
  border: 1px solid rgba(255, 255, 255, 0.3);

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  &.item-filter-action {
    background-color: var(--bonta-blue-30);
  }
}
</style>
