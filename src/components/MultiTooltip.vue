<template>
  <tippy placement="bottom" duration="0" max-width="fit-content" :interactive="stickyCounter === 100" interactive-border="2000" @state="onStateChange">
    <slot name="trigger">
      <div class="inline-tooltip-trigger" style="width: fit-content">{{ $t(`states.${stateData?.name}`) }}</div>
    </slot>

    <template v-slot:content>
      <div class="multi-tooltip" :class="{ stuck: stickyCounter === 100 }">
        <slot name="content">
          <div class="state-description">
            <div class="flex flex-column">
              <template v-for="line in stateData?.descriptionData" :key="line.text">
                <div :class="{ 'pl-3': line.indented }" class="description-line pb-1" v-html="getLineText(line)" />
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
  return t(`states.${line.text}`, {
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
  });
};
</script>

<style lang="scss" scoped>
.multi-tooltip {
  background-color: var(--background-20);
  border-radius: 8px;
  border: 1px solid var(--highlight-90);
  overflow: hidden;
}

.state-description {
  padding: 4px 6px;
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

  .inline-img {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
