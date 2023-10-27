import { ref } from 'vue';
import itemData from './item_data.json';

import { ITEM_SLOT_SORT_ORDER } from '@/models/useConstants';

const itemSet = ref(null);
const autoBuilderIsReady = ref(false);
const builderLoading = ref(false);
let worker = new Worker('autoBuilderWorker.js');

export const useAutoBuilder = () => {
  const targetLevel = ref(0);
  const targetClass = ref(null);
  const targetEffect = ref(null);

  const setup = async () => {
    worker.onmessage = (message) => {
      if (message.data === 'workerReady') {
        autoBuilderIsReady.value = true;
      }

      if (message.data.items) {
        itemSet.value = message.data.items;
        builderLoading.value = false;
      }
    };
  };

  const runCalculations = (params) => {
    builderLoading.value = true;
    worker.postMessage({ params, itemData, ITEM_SLOT_SORT_ORDER }); //, itemData, ITEM_SLOT_SORT_ORDER });
  };

  return {
    setup,
    autoBuilderIsReady,
    targetLevel,
    targetClass,
    targetEffect,
    runCalculations,
    builderLoading,
    itemSet,
  };
};
