import { ref } from 'vue';
import deepUnref from '@/plugins/deepUnref.js';

import itemData from './item_data.json';
// eslint-disable-next-line import/no-unresolved
import workerThing from '@/models/autoBuilderWorker?worker&url';

import { ITEM_SLOT_SORT_ORDER, ELEMENT_TYPE_ENUM } from '@/models/useConstants';

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

      if (message.data.items !== null) {
        itemSet.value = message.data.items;
        builderLoading.value = false;
      } else if (message.data.error) {
        builderError.value = { message: message.data.error, debug: message.data.debugInfo };
        builderLoading.value = false;
      }
    };
  };

  const runCalculations = (paramData) => {
    builderError.value = null;
    builderLoading.value = true;
    let params = prepareInputParams(paramData);
    let isValid = validateInputParams(params);
    if (isValid) {
      let unreffedParams = deepUnref(params);
      worker.postMessage({ params: unreffedParams, itemData, ITEM_SLOT_SORT_ORDER });
    }
  };

  const validateInputParams = (params) => {
    let isValid = true;
    let messages = [];

    // if (params.targetClass === null) {
    //   messages.push('A class must be selected.');
    //   isValid = false;
    // }

    if (!isValid) {
      builderError.value = { type: 'invalidParams', messages };
    }

    return isValid;
  };

  const prepareInputParams = (paramData) => {
    let elementPriorities = 0;

    if (paramData.fireMastery) {
      elementPriorities += ELEMENT_TYPE_ENUM['fire'];
    }

    if (paramData.earthMastery) {
      elementPriorities += ELEMENT_TYPE_ENUM['earth'];
    }

    if (paramData.waterMastery) {
      elementPriorities += ELEMENT_TYPE_ENUM['water'];
    }

    if (paramData.airMastery) {
      elementPriorities += ELEMENT_TYPE_ENUM['air'];
    }

    let params = {
      buildCode: paramData.buildCode,

      meleeMastery: paramData.meleeMasteryPriority.value,
      distanceMastery: paramData.distanceMasteryPriority.value,
      healingMastery: paramData.healingMasteryPriority.value,
      rearMastery: paramData.rearMasteryPriority.value,
      berserkMastery: paramData.berserkMasteryPriority.value,

      selectedRarityIds: paramData.selectedRarityIds,

      elementPriorities,

      targetStatParams: {
        ap: paramData.targetApAmount,
        mp: paramData.targetMpAmount,
        ra: paramData.targetRangeAmount,
        wp: paramData.targetWpAmount,
      },
    };

    return params;
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
    prepareInputParams,
  };
};
