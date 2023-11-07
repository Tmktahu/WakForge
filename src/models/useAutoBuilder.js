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
        builderError.value = { type: 'noSolution', messages: [] };
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

      selectedRarityIds: paramData.rarityIds,

      currentItemIds: paramData.currentItemIds,
    };

    if (paramData.currentCharacter) {
      params.currentStatParams = {
        ap: paramData.currentCharacter.actionPoints - calcItemContribution(EFFECT_TYPE_DATA.actionPoints.rawId),
        mp: paramData.currentCharacter.movementPoints - calcItemContribution(EFFECT_TYPE_DATA.movementPoints.rawId),
        wp: paramData.currentCharacter.wakfuPoints - calcItemContribution(EFFECT_TYPE_DATA.wakfuPoints.rawId),
        ra: paramData.currentCharacter.stats.range - calcItemContribution(EFFECT_TYPE_DATA.range.rawId),
        crit: paramData.currentCharacter.stats.criticalHit - calcItemContribution(EFFECT_TYPE_DATA.criticalHit.rawId),
        crit_mastery: paramData.currentCharacter.masteries.critical - calcItemContribution(EFFECT_TYPE_DATA.criticalMastery.rawId),
        distance_mastery: paramData.currentCharacter.masteries.distance - calcItemContribution(EFFECT_TYPE_DATA.distanceMastery.rawId),
        rear_mastery: paramData.currentCharacter.masteries.rear - calcItemContribution(EFFECT_TYPE_DATA.rearMastery.rawId),
        heal_mastery: paramData.currentCharacter.masteries.healing - calcItemContribution(EFFECT_TYPE_DATA.healingMastery.rawId),
        beserk_mastery: paramData.currentCharacter.masteries.berserk - calcItemContribution(EFFECT_TYPE_DATA.berserkMastery.rawId),
        melee_mastery: paramData.currentCharacter.masteries.melee - calcItemContribution(EFFECT_TYPE_DATA.meleeMastery.rawId),
        control: paramData.currentCharacter.stats.control - calcItemContribution(EFFECT_TYPE_DATA.control.rawId),
        block: paramData.currentCharacter.stats.block - calcItemContribution(EFFECT_TYPE_DATA.percentBlock.rawId),
        heals_performed: paramData.currentCharacter.stats.healsPerformed - calcItemContribution(EFFECT_TYPE_DATA.healsPerformed.rawId),
        lock: paramData.currentCharacter.stats.lock - calcItemContribution(EFFECT_TYPE_DATA.lock.rawId),
        dodge: paramData.currentCharacter.stats.dodge - calcItemContribution(EFFECT_TYPE_DATA.dodge.rawId),
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
