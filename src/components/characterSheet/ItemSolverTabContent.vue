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

      <div class="flex mt-3">
        <div class="flex flex-column mr-3">
          <OptionNumInput v-model="targetApAmount" label="Action Points" tooltip-text="How many total Action Points you want." />
          <OptionNumInput v-model="targetMpAmount" label="Movement Points" tooltip-text="How many total Movement Points you want." />
          <OptionNumInput v-model="targetRangeAmount" label="Range" tooltip-text="How many total Range you want." />
          <OptionNumInput v-model="targetWpAmount" label="Wakfu Points" tooltip-text="How many total Wakfu Points you want." />
          <OptionNumInput v-model="targetNumElements" label="Num Elements" tooltip-text="How many elemental bonuses you want on each item." />
        </div>

        <div class="flex flex-column">
          <div class="flex flex-column gap-2 mt-2">
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
      <p-button class="py-2 px-3 mr-2" :disabled="!filteredItemSet?.length" label="Equip All Items" @click="onEquipAll($event)" />
      <OptionCheckbox v-model="showAllItems" label="Show All Items" />
      <div class="flex-grow-1" />
      <div>Powered by <a href="https://github.com/mikeshardmind/wakfu-utils" target="_blank">Keeper of Time (sinbad)</a>'s code.</div>
    </div>

    <div v-if="!builderLoading" class="results-display flex flex-column flex-grow-1 mt-2">
      <div v-if="builderError" class="error-state px-3 py-3">
        <div> There was a problem with the auto solver. If you believe this is a bug, please contact Fryke on Discord. </div>
        <div v-if="builderError" class="mt-3">
          <span>Code: {{ builderError.type }}</span>
          <div v-for="message in builderError.messages" :key="message" class="mt-1">
            {{ message }}
          </div>
        </div>
      </div>

      <div v-else-if="filteredItemSet?.length">
        <div class="flex flex-wrap gap-1 mt-2">
          <template v-for="item in filteredItemSet" :key="item.id">
            <ItemListCard :item="item" />
          </template>
        </div>
      </div>

      <div v-else class="loading-state px-3 py-3">
        <div> Enter your parameters above and click "Generate Item Set". </div>
        <div class="mt-2">If you need any guidance, feel free to poke us on Discord with questions.</div>
      </div>
    </div>

    <div v-else class="loading-state flex flex-column flex-grow-1 w-full mt-3">
      <div class="text-center mt-2">Jimmy is doing the math and stuff... Please wait...</div>
      <div class="text-center mb-5 mt-2">Note that depending on your above options, this can take some time.</div>
      <div class="flex justify-content-center">
        <div style="position: relative; width: 100px; height: 100px">
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

import { ITEM_RARITY_DATA } from '@/models/useConstants';
import { useAutoBuilder } from '@/models/useAutoBuilder';
import { useItems } from '@/models/useItems';

import EquipmentButtons from '@/components/characterSheet/EquipmentButtons.vue';
import OptionCheckbox from '@/components/itemSolver/OptionCheckbox.vue';
import OptionNumInput from '@/components/itemSolver/OptionNumInput.vue';
import ItemListCard from '@/components/characterSheet/ItemListCard.vue';

const confirm = useConfirm();

const currentCharacter = inject('currentCharacter');

const { equipItem } = useItems(currentCharacter);
const { runCalculations, autoBuilderIsReady, itemSet, builderLoading, builderError } = useAutoBuilder();

const showAllItems = ref(false);

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
const targetNumElements = ref(2);

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
};

const onClearAllRarities = () => {
  allowedRarities.value.forEach((filter) => {
    filter.checked = false;
  });
};

const hasValidValues = computed(() => {
  return autoBuilderIsReady.value;
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

    meleeMastery: meleeMastery.value,
    distanceMastery: distanceMastery.value,
    healingMastery: healingMastery.value,
    rearMastery: rearMastery.value,
    berserkMastery: berserkMastery.value,

    targetNumElements: targetNumElements.value || 0,

    currentCharacter: currentCharacter.value,

    targetApAmount: targetApAmount.value || 0,
    targetMpAmount: targetMpAmount.value || 0,
    targetRangeAmount: targetRangeAmount.value || 0,
    targetWpAmount: targetWpAmount.value || 0,

    selectedRarityIds: rarityIds,

    currentItemIds,
  };

  runCalculations(params);
};

const onEquipAll = (event) => {
  confirm.require({
    group: 'popup',
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
  border: 1px solid var(--bonta-blue-100);
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
