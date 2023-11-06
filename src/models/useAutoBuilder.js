import { ref } from 'vue';
import deepUnref from '@/plugins/deepUnref.js';

import itemData from './item_data.json';
// eslint-disable-next-line import/no-unresolved
import workerThing from '@/models/autoBuilderWorker?worker&url';

import { ITEM_SLOT_SORT_ORDER } from '@/models/useConstants';

const itemSet = ref(null);
const autoBuilderIsReady = ref(false);
const builderLoading = ref(false);
const builderError = ref(null);

let worker = new Worker(import.meta.env.MODE === 'development' ? '../src/models/autoBuilderWorker.js' : workerThing);

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
        builderError.value = { type: 'noSolution', messages: [] };
        builderLoading.value = false;
      }
    };
  };

  const runCalculations = (params) => {
    builderError.value = null;
    builderLoading.value = true;
    let isValid = validateInputParams(params);
    if (isValid) {
      let unreffedParams = deepUnref(params);
      worker.postMessage({ params: unreffedParams, itemData, ITEM_SLOT_SORT_ORDER });
    }
  };

  const validateInputParams = (params) => {
    let isValid = true;
    let messages = [];

    if (params.targetClass === null) {
      messages.push('A class must be selected.');
      isValid = false;
    }

    if (!isValid) {
      builderError.value = { type: 'invalidParams', messages };
    }

    return isValid;
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
