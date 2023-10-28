import { ref } from 'vue';
import itemData from './item_data.json';
import workerThing from '@/models/autoBuilderWorker?worker&url';

import { ITEM_SLOT_SORT_ORDER } from '@/models/useConstants';

const itemSet = ref(null);
const autoBuilderIsReady = ref(false);
const builderLoading = ref(false);
const builderError = ref(null);

let worker = new Worker(import.meta.env.MODE === 'development' ? 'src/models/autoBuilderWorker.js' : workerThing);

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

      if (message.data === 'No possible solution found') {
        builderError.value = 'noSolution';
        builderLoading.value = false;
      }
    };
  };

  const runCalculations = (params) => {
    builderError.value = null;
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
    builderError,
  };
};
