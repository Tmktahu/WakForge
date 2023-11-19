import { ref, inject, watch } from 'vue';
import { debounce } from 'lodash';
import { CLASS_CONSTANTS } from '@/models/useConstants';

export const useLevels = (currentCharacter) => {
  const setup = () => {
    watch(
      () => currentCharacter.value?.level,
      debounce(() => {
        if (currentCharacter.value) {
          currentCharacter.value.characteristics.limits.intelligence = Math.floor((currentCharacter.value.level + 2) / 4);
          currentCharacter.value.characteristics.limits.strength = Math.floor((currentCharacter.value.level + 1) / 4);
          currentCharacter.value.characteristics.limits.agility = Math.floor(currentCharacter.value.level / 4);
          currentCharacter.value.characteristics.limits.fortune = Math.floor((currentCharacter.value.level - 1) / 4);
          currentCharacter.value.characteristics.limits.major = Math.min(Math.floor((currentCharacter.value.level + 25) / 50), 4);
        }
      }, 100),
      { immediate: true }
    );
  };

  const getBaseStatsForLevel = (level, classType) => {
    let baseStats = {
      healthPoints: 50 + 10 * level,
      actionPoints: 6,
      movementPoints: 3,
      wakfuPoints: classType === CLASS_CONSTANTS.xelor ? 12 : 6,
      quadrumentalBreeze: classType === CLASS_CONSTANTS.huppermage ? 500 : 0,
    };

    return baseStats;
  };

  return {
    setup,
    getBaseStatsForLevel,
  };
};
