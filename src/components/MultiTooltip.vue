<template>
  <tippy placement="bottom" duration="0" max-width="fit-content" :interactive="stickyCounter === 100" interactive-border="2000" @state="onStateChange">
    <slot name="trigger">
      <div class="inline-tooltip-trigger" style="width: fit-content">{{ $t(`states.${stateData?.name}`) }}</div>
    </slot>

    <template v-slot:content>
      <div class="multi-tooltip" :class="{ stuck: stickyCounter === 100 }">
        <slot name="content">
          <div class="state-title py-2 px-2">
            <span>{{ $t(`states.${stateData.name}`) }}</span>
            <span class="mx-1">State at level</span>
            <span>{{ currentLevel }}</span>
          </div>
          <div class="state-description">
            <div class="flex flex-column">
              <template v-for="line in stateData?.descriptionData" :key="line.text">
                <div :class="{ 'pl-3': line.indented, 'px-2': !line.indented, indented: line.indented }" class="description-line py-1" v-html="getLineText(line)" />
              </template>
            </div>

            <!-- <div v-if="tooltipData.childTooltips?.length" class="flex">
            <template v-for="childTooltipId in tooltipData.childTooltips" :key="childTooltipId">
              <div>
                <MultiTooltip :tooltip-id="childTooltipId" />
              </div>
            </template>
          </div> -->
          </div>
        </slot>

        <p-progressBar
          :value="stickyCounter"
          :pt="{
            value: { style: { transition: 'none' } },
          }"
        />
      </div>
    </template>
  </tippy>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import stateDate from '@/models/state_data.json';

const props = defineProps({
  stateId: {
    type: String,
    default: '',
  },
  currentLevel: {
    type: Number,
    default: 1,
  },
});

const { t } = useI18n();

const stateData = computed(() => stateDate.find((entry) => entry.id === props.stateId));

let currentInterval = null;

const stickyCounter = ref(0);

const onStateChange = (state) => {
  if (state.isVisible && stickyCounter.value === 0) {
    currentInterval = setInterval(timer, 10);
  } else {
    clearInterval(currentInterval);
    stickyCounter.value = 0;
  }
};

const timer = () => {
  stickyCounter.value++;

  if (stickyCounter.value === 100) {
    clearInterval(currentInterval);
  }
};

const getLineText = (line) => {
  return `${line.indented ? '<i class="mdi mdi-arrow-right-bottom" style="margin-top: -2px; margin-right: 4px;"></i>' : ''}${t(`states.${line.text}`, {
    img_fire: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/FIRE.png" /></div>',
    img_earth: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/EARTH.png" /></div>',
    img_water: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/WATER.png" /></div>',
    img_air: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/AIR.png" /></div>',
    img_physical: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/PHYSICAL.png" /></div>',
    img_light: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/LIGHT.png" /></div>',
    img_ecnbi: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/ecnbi.png" /></div>',
    img_ecnbr: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/ecnbr.png" /></div>',
    img_ally: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/ally.png" /></div>',
    img_enemy: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/enemy.png" /></div>',
    img_circling: '<div class="inline-img"><img src="https://tmktahu.github.io/WakfuAssets/misc/CIRCLERING.png" /></div>',
    num_0: `${line.num_0?.[`level_${props.currentLevel}`]}`,
    num_1: `${line.num_1?.[`level_${props.currentLevel}`]}`,
    num_2: `${line.num_2?.[`level_${props.currentLevel}`]}`,
    num_3: `${line.num_3?.[`level_${props.currentLevel}`]}`,
    num_4: `${line.num_4?.[`level_${props.currentLevel}`]}`, // there is no num_4 ever used from what I can tell, but we do it just in case
  })}`;
};
</script>

<style lang="scss" scoped>
.multi-tooltip {
  background-color: var(--background-20);
  border-radius: 8px;
  border: 1px solid var(--highlight-90);
  overflow: hidden;
}

.state-title {
  display: flex;
  background-color: var(--primary-30);
}

.inline-tooltip-trigger {
  color: var(--primary-50);
  margin-left: 4px;
  margin-right: 4px;
  font-weight: 500;
  cursor: pointer;
}

.stuck {
  border: 2px solid var(--primary-50);
}

:deep(.description-line) {
  white-space: pre;
  display: flex;
  border-bottom: 2px solid var(--background-10);

  &.indented {
    background-color: var(--background-10);
    border-bottom: 1px solid var(--highlight-20);
  }

  .inline-img {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
