<template>
  <div class="flex flex-column">
    <table class="effect-list-wrapper flex-grow-1" style="border-spacing: 0">
      <template v-for="effectId in combinedEffectKeys" :key="`${item.id}-${effectId}`">
        <tr v-if="!shouldSkipEffect(effectId)" class="effect-line" :class="{ 'with-comparison': conflictingItem && withComparisons }">
          <template v-if="conflictingItem && withComparisons">
            <td v-if="conflictingItemEffects[effectId]" class="equipped-item-effect" :class="{ 'long-entry': conflictingItemEffects[effectId].longEntry }">
              <div class="flex align-items-center w-full px-1 py-1">
                <div v-if="effectId === '304'" class="effect-text flex align-items-center">
                  <span>{{ $t('tooltips.addsStateLevels', { num_0: conflictingItemEffects[effectId].values[2] }) }}</span>
                  <MultiTooltip :state-id="`${conflictingItemEffects[effectId].values[0]}`" :current-level="conflictingItemEffects[effectId].values[2]" />
                </div>
                <div v-else class="effect-text">{{ getEffectText(conflictingItemEffects[effectId]) }}</div>
              </div>
            </td>
            <td v-else class="equipped-item-effect" style="min-width: 50px" />
          </template>

          <td v-if="itemEffects[effectId]" class="new-item-effect">
            <div class="flex align-items-center w-full px-1 py-1">
              <div v-if="conflictingItem" class="change-icon mr-1" :class="{ decrease: getEffectDifference(effectId) < 0, increase: getEffectDifference(effectId) > 0 }">
                {{ getEffectDifference(effectId) > 0 ? '+' : '' }}{{ getEffectDifference(effectId) }}
              </div>
              <div v-if="effectId === '304'" class="flex align-items-center">
                <span>{{ $t('tooltips.addsStateLevels', { num_0: itemEffects[effectId].values[2] }) }}</span>
                <MultiTooltip :state-id="`${itemEffects[effectId].values[0]}`" :current-level="itemEffects[effectId].values[2]" />
              </div>
              <div v-else>{{ getEffectText(itemEffects[effectId]) }}</div>
            </div>
          </td>
          <td v-else class="new-item-effect removed" :class="{ 'long-entry': conflictingItemEffects[effectId].longEntry }">
            <div class="flex align-items-center w-full px-1 py-1">
              <div v-if="conflictingItem" class="change-icon mr-1" :class="{ decrease: getEffectDifference(effectId) < 0, increase: getEffectDifference(effectId) > 0 }">
                {{ getEffectDifference(effectId) > 0 ? '+' : '' }}{{ getEffectDifference(effectId) }}
              </div>
              <div v-if="effectId === '304'" class="effect-text flex align-items-center">
                <span>{{ $t('tooltips.addsStateLevels', { num_0: conflictingItemEffects[effectId].values[2] }) }}</span>
                <MultiTooltip :state-id="`${conflictingItemEffects[effectId].values[0]}`" :current-level="conflictingItemEffects[effectId].values[2]" />
              </div>
              <div v-else class="effect-text">{{ getEffectText(conflictingItemEffects[effectId]) }}</div>
            </div>
          </td>
        </tr>
      </template>

      <tr v-if="conflictingItem || getTotalMastery(item) > 0 || getTotalMastery(conflictingItem) > 0" class="effect-line totals">
        <td v-if="conflictingItem && withComparisons" class="equipped-item-effect">
          <div class="flex align-items-center w-full px-1 py-1">{{ getTotalMastery(conflictingItem) }} Total Mastery</div>
        </td>
        <td class="new-item-effect">
          <div class="flex align-items-center w-full px-1 py-1">
            <div
              v-if="conflictingItem"
              class="change-icon mr-1"
              :class="{ decrease: getTotalMastery(item) - getTotalMastery(conflictingItem) < 0, increase: getTotalMastery(item) - getTotalMastery(conflictingItem) > 0 }"
            >
              {{ getTotalMastery(item) - getTotalMastery(conflictingItem) > 0 ? '+' : '' }}{{ getTotalMastery(item) - getTotalMastery(conflictingItem) }}
            </div>
            {{ getTotalMastery(item) }} Total Mastery
          </div>
        </td>
      </tr>

      <tr v-if="conflictingItem || getTotalResistance(item) > 0 || getTotalResistance(conflictingItem) > 0" class="effect-line totals">
        <td v-if="conflictingItem && withComparisons" class="equipped-item-effect">
          <div class="flex align-items-center w-full px-1 py-1">{{ getTotalResistance(conflictingItem) }} Total Resistance </div>
        </td>
        <td class="new-item-effect">
          <div class="flex align-items-center w-full px-1 py-1">
            <div
              v-if="conflictingItem"
              class="change-icon mr-1"
              :class="{
                decrease: getTotalResistance(item) - getTotalResistance(conflictingItem) < 0,
                increase: getTotalResistance(item) - getTotalResistance(conflictingItem) > 0,
              }"
            >
              {{ getTotalResistance(item) - getTotalResistance(conflictingItem) > 0 ? '+' : '' }}{{ getTotalResistance(item) - getTotalResistance(conflictingItem) }}
            </div>
            {{ getTotalResistance(item) }} Total Resistance
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
import { useI18n } from 'vue-i18n';

import { EFFECT_TYPE_DATA, LEVELABLE_ITEMS } from '@/models/useConstants';

import MultiTooltip from '@/components/MultiTooltip.vue';

let props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  cardMode: {
    type: Boolean,
    default: false,
  },
  withComparisons: {
    type: Boolean,
    default: false,
  },
});

const { t } = useI18n();

const currentCharacter = inject('currentCharacter');

const conflictingItem = computed(() => {
  let validSlots = props.item.type.validSlots;
  let targetSlot = validSlots[0]; // how do we handle rings?
  if (currentCharacter.value.equipment[targetSlot]?.id !== props.item?.id) {
    return currentCharacter.value.equipment[targetSlot];
  } else {
    return null;
  }
});

const itemEffects = computed(() => {
  let effectsObject = {};

  props.item?.equipEffects?.forEach((effect) => {
    effectsObject[effect.id] = effect;
  });

  return effectsObject;
});

const conflictingItemEffects = computed(() => {
  let effectsObject = {};

  conflictingItem.value?.equipEffects?.forEach((effect) => {
    effectsObject[effect.id] = effect;
  });

  return effectsObject;
});

const combinedEffectKeys = computed(() => {
  return [...Object.keys(itemEffects.value), ...Object.keys(conflictingItemEffects.value)].filter((value, index, array) => array.indexOf(value) === index);
});

const shouldSkipEffect = (effectId) => {
  // some effects shouldn't be displayed
  let skippedEffectIds = ['400', '1020'];
  if (skippedEffectIds.includes(effectId)) {
    return true;
  } else {
    return false;
  }
};

const getEffectData = (rawId) => {
  let effectEntryKey = Object.keys(EFFECT_TYPE_DATA).find((key) => EFFECT_TYPE_DATA[key].rawIds.includes(rawId));
  if (effectEntryKey === undefined) {
    return null;
  } else {
    return EFFECT_TYPE_DATA[effectEntryKey];
  }
};

const getEffectText = (effect) => {
  if (effect.id === 1068) {
    return t('tooltips.randomMasteryValue', { num_0: effect.values[0], num_1: effect.values[2] });
  } else if (effect.id === 1069) {
    return t('tooltips.randomResistanceValue', { num_0: effect.values[0], num_1: effect.values[2] });
  } else {
    let effectValue = getEffectValue(effect);
    let effectText = t(getEffectData(effect.id).text);
    return `${effectValue > 0 ? '+' : ''}${effectValue}${effectText.charAt(0) === '%' ? '' : ' '}${effectText}`;
  }
};

const getEffectValue = (effect) => {
  // we need special logic to handle items that can level up.
  // for now, we lock them to level 50
  // index 0 => the starting value
  // index 1 => the per-level value

  let startingValue = effect.values[0];
  let finalValue = 0;
  if (LEVELABLE_ITEMS.includes(props.item.type.id)) {
    if (props.item.id === 12237) {
      // Dot is special and requires specific handling because screw the normal pattern right?
      finalValue = startingValue + 25 * effect.values[1];
    } else {
      finalValue = startingValue + 50 * effect.values[1];
    }
  } else {
    finalValue = startingValue;
  }

  return Math.floor(finalValue);
};

const getEffectDifference = (effectId) => {
  let currentValue = 0;
  let currentEffect = itemEffects.value[effectId];
  if (currentEffect) {
    currentValue = getEffectValue(currentEffect);
  }

  let newValue = 0;
  let newEffect = conflictingItemEffects.value[effectId];
  if (newEffect) {
    newValue = getEffectValue(newEffect);
  }

  return currentValue - newValue;
};

const getTotalMastery = (item) => {
  let totalValue = 0;
  let masteryEffectIds = [
    ...EFFECT_TYPE_DATA.elementalMastery.rawIds,
    ...EFFECT_TYPE_DATA.fireMastery.rawIds,
    ...EFFECT_TYPE_DATA.earthMastery.rawIds,
    ...EFFECT_TYPE_DATA.waterMastery.rawIds,
    ...EFFECT_TYPE_DATA.airMastery.rawIds,
    ...EFFECT_TYPE_DATA.rearMastery.rawIds,
    ...EFFECT_TYPE_DATA.meleeMastery.rawIds,
    ...EFFECT_TYPE_DATA.distanceMastery.rawIds,
    ...EFFECT_TYPE_DATA.berserkMastery.rawIds,
    ...EFFECT_TYPE_DATA.berserkMastery.rawIds,
  ];

  item?.equipEffects?.forEach((effect) => {
    if (EFFECT_TYPE_DATA.randomElementalMasteries.rawIds.includes(effect.id)) {
      totalValue += effect.values[0] * effect.values[2];
    } else if (masteryEffectIds.includes(effect.id)) {
      totalValue += effect.values[0];
    }
  });

  return totalValue;
};

const getTotalResistance = (item) => {
  let totalValue = 0;
  let masteryEffectIds = [
    ...EFFECT_TYPE_DATA.rearResistance.rawIds,
    ...EFFECT_TYPE_DATA.elementalResistance.rawIds,
    ...EFFECT_TYPE_DATA.fireResistance.rawIds,
    ...EFFECT_TYPE_DATA.waterResistance.rawIds,
    ...EFFECT_TYPE_DATA.earthResistance.rawIds,
    ...EFFECT_TYPE_DATA.airResistance.rawIds,
    ...EFFECT_TYPE_DATA.criticalResistance.rawIds,
  ];

  item?.equipEffects?.forEach((effect) => {
    if (EFFECT_TYPE_DATA.randomElementalResistances.rawIds.includes(effect.id)) {
      totalValue += effect.values[0] * effect.values[2];
    } else if (masteryEffectIds.includes(effect.id)) {
      totalValue += effect.values[0];
    }
  });

  return totalValue;
};
</script>

<style lang="scss" scoped>
:deep(.effect-list-wrapper) {
  overflow: hidden;
  flex-direction: column;

  .new-item-effect {
    background-color: var(--primary-10);

    &.removed {
      .effect-text {
        text-decoration: line-through;
        opacity: 0.5;
      }
    }

    &.long-entry {
      white-space: break-spaces;
      max-width: 100px;
    }

    .change-icon {
      display: flex;
      align-items: center;
      font-weight: 800;
      font-size: 12px;
      border-radius: 10px;
      color: white;
      background-color: var(--background-10);
      white-space: nowrap;
      border: 1px solid white;
      padding: 2px 6px;
      line-height: 12px;

      &.decrease {
        background-color: var(--error-60);
      }

      &.increase {
        background-color: green;
      }
    }
  }

  .equipped-item-effect {
    background-color: var(--secondary-10);
    border-right: 2px solid var(--highlight-80);
    white-space: nowrap;

    &.long-entry {
      white-space: break-spaces;
      max-width: 100px;
    }
  }

  .effect-line {
    font-size: 12px;

    &.totals {
      .new-item-effect {
        background-color: var(--primary-40) !important;
        color: black;
        font-weight: 800;
        font-size: 14px;
        border-top: 2px solid var(--primary-10);
      }

      .equipped-item-effect {
        background-color: var(--secondary-40) !important;
        color: black;
        font-weight: 800;
        font-size: 14px;
        border-top: 2px solid var(--secondary-10);
      }
    }
  }

  .effect-line:nth-child(2n-1) {
    .new-item-effect {
      background-color: var(--primary-30);
    }

    .equipped-item-effect {
      background-color: var(--secondary-30);
    }
  }

  .effect-line:last-child {
    .equipped-item-effect {
      border-bottom: 1px solid var(--highlight-90);
    }
  }

  .effect-line.with-comparison:first-child {
    .new-item-effect {
      border-top: 1px solid var(--highlight-90);
    }
  }
}
</style>
