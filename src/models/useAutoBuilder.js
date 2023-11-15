import { ref } from 'vue';
import deepUnref from '@/plugins/deepUnref.js';

import itemData from './item_data.json';
// eslint-disable-next-line import/no-unresolved
import workerThing from '@/models/autoBuilderWorker?worker&url';

import { ITEM_SLOT_SORT_ORDER, EFFECT_TYPE_DATA } from '@/models/useConstants';
import { useStats } from '@/models/useStats';

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
        builderError.value = { type: 'noSolution', messages: ['No possible solution found.'] };
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
    const { calcItemContribution } = useStats(ref(paramData.currentCharacter));

    let params = {
      targetLevel: paramData.targetLevel,

      meleeMastery: paramData.meleeMastery,
      distanceMastery: paramData.distanceMastery,
      healingMastery: paramData.healingMastery,
      rearMastery: paramData.rearMastery,
      berserkMastery: paramData.berserkMastery,

      targetNumElements: paramData.targetNumElements,

      currentStatParams: {},

      targetStatParams: {
        ap: paramData.targetApAmount,
        mp: paramData.targetMpAmount,
        ra: paramData.targetRangeAmount,
        wp: paramData.targetWpAmount,
      },

      selectedRarityIds: paramData.selectedRarityIds,

      currentItemIds: paramData.currentItemIds,
    };

    if (paramData.currentCharacter) {
      params.currentStatParams = {
        ap: paramData.currentCharacter.actionPoints - calcItemContribution(EFFECT_TYPE_DATA.actionPoints),
        mp: paramData.currentCharacter.movementPoints - calcItemContribution(EFFECT_TYPE_DATA.movementPoints),
        wp: paramData.currentCharacter.wakfuPoints - calcItemContribution(EFFECT_TYPE_DATA.wakfuPoints),
        ra: paramData.currentCharacter.stats.range - calcItemContribution(EFFECT_TYPE_DATA.range),
        crit: paramData.currentCharacter.stats.criticalHit - calcItemContribution(EFFECT_TYPE_DATA.criticalHit),
        crit_mastery: paramData.currentCharacter.masteries.critical - calcItemContribution(EFFECT_TYPE_DATA.criticalMastery),
        distance_mastery: paramData.currentCharacter.masteries.distance - calcItemContribution(EFFECT_TYPE_DATA.distanceMastery),
        rear_mastery: paramData.currentCharacter.masteries.rear - calcItemContribution(EFFECT_TYPE_DATA.rearMastery),
        heal_mastery: paramData.currentCharacter.masteries.healing - calcItemContribution(EFFECT_TYPE_DATA.healingMastery),
        beserk_mastery: paramData.currentCharacter.masteries.berserk - calcItemContribution(EFFECT_TYPE_DATA.berserkMastery),
        melee_mastery: paramData.currentCharacter.masteries.melee - calcItemContribution(EFFECT_TYPE_DATA.meleeMastery),
        control: paramData.currentCharacter.stats.control - calcItemContribution(EFFECT_TYPE_DATA.control),
        block: paramData.currentCharacter.stats.block - calcItemContribution(EFFECT_TYPE_DATA.percentBlock),
        heals_performed: paramData.currentCharacter.stats.healsPerformed - calcItemContribution(EFFECT_TYPE_DATA.healsPerformed),
        lock: paramData.currentCharacter.stats.lock - calcItemContribution(EFFECT_TYPE_DATA.lock),
        dodge: paramData.currentCharacter.stats.dodge - calcItemContribution(EFFECT_TYPE_DATA.dodge),
      };
    }

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
