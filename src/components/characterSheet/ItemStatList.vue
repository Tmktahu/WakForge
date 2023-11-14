<template>
  <div v-if="!cardMode" class="tooltip-effect-list">
    <template v-for="(effect, index) in item.equipEffects" :key="`${item.id}-${effect.id}-${index}`">
      <div v-if="getEffectData(effect.id) && !shouldSkipEffect(effect)" class="effect-line px-2 py-1">
        <div v-if="effect.id === 1068">+{{ effect.values[0] }} Mastery of {{ effect.values[2] }} random elements</div>
        <div v-else-if="effect.id === 1069"> +{{ effect.values[0] }} Resistance of {{ effect.values[2] }} random elements </div>
        <div v-else>
          <span>{{ getEffectValue(effect) > 0 ? '+' : '' }}{{ getEffectValue(effect) }}</span>
          <span>{{ getEffectData(effect.id).text.charAt(0) === '%' ? getEffectData(effect.id).text : ' ' + getEffectData(effect.id).text }}</span>
        </div>
      </div>
    </template>
  </div>

  <div v-else class="effects-wrapper flex flex-wrap">
    <template v-for="effect in item.equipEffects" :key="effect.id">
      <div v-if="getEffectData(effect.id) && !shouldSkipEffect(effect)" class="effect-line pl-2 py-1" :style="{ width: effect.longEntry ? '100%' : '50%' }">
        <div v-if="effect.id === 1068">+{{ effect.values[0] }} Mastery of {{ effect.values[2] }} random elements</div>
        <div v-else-if="effect.id === 1069"> +{{ effect.values[0] }} Resistance of {{ effect.values[2] }} random elements </div>
        <div v-else>
          <span>{{ getEffectValue(effect) > 0 ? '+' : '' }}{{ getEffectValue(effect) }}</span>
          <span>{{ getEffectData(effect.id).text.charAt(0) === '%' ? getEffectData(effect.id).text : ' ' + getEffectData(effect.id).text }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { EFFECT_TYPE_DATA, LEVELABLE_ITEMS } from '@/models/useConstants';

let props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  cardMode: {
    type: Boolean,
    default: false,
  },
});

const shouldSkipEffect = (effect) => {
  // some effects shouldn't be displayed
  let skippedEffectIds = [400];
  if (skippedEffectIds.includes(effect.id)) {
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

const getEffectValue = (effect) => {
  // we need special logic to handle items that can level up.
  // for now, we lock them to level 50
  // index 0 => the starting value
  // index 1 => the per-level value

  let startingValue = effect.values[0];
  let finalValue = 0;
  if (LEVELABLE_ITEMS.includes(props.item.type.id)) {
    finalValue = startingValue + 50 * effect.values[1];
  } else {
    finalValue = startingValue;
  }

  return Math.floor(finalValue);
};
</script>

<style lang="scss" scoped>
.effect-line {
  font-size: 12px;
  background: var(--bonta-blue);
  // border-right: 2px solid var(--bonta-blue);
  // border-left: 2px solid var(--bonta-blue);
}

.effects-wrapper {
  overflow: hidden;
}

.tooltip-effect-list {
  .effect-line:nth-child(2n-1) {
    background: var(--bonta-blue-20);
  }
}
</style>
