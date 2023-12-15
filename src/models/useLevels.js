import { watch } from 'vue';
import { debounce } from 'lodash';
import { CLASS_CONSTANTS } from '@/models/useConstants';

export const useLevels = (currentCharacter) => {
  const setup = () => {
    watch(
      () => currentCharacter.value?.level,
      debounce(() => {
        if (currentCharacter.value) {
          setCharacteristicLimits(currentCharacter.value);
        }
      }, 100),
      { immediate: true }
    );
  };

  const setCharacteristicLimits = (currentCharacter) => {
    currentCharacter.characteristics.limits.intelligence = Math.floor((currentCharacter.level + 2) / 4);
    currentCharacter.characteristics.limits.strength = Math.floor((currentCharacter.level + 1) / 4);
    currentCharacter.characteristics.limits.agility = Math.floor(currentCharacter.level / 4);
    currentCharacter.characteristics.limits.fortune = Math.floor((currentCharacter.level - 1) / 4);
    currentCharacter.characteristics.limits.major = Math.min(Math.floor((currentCharacter.level + 25) / 50), 4);
  };

  const getBaseStatsForLevel = (level, classType) => {
    let baseStats = {
      healthPoints: 50 + 10 * level,
      actionPoints: 6,
      movementPoints: 3,
      wakfuPoints: classType === CLASS_CONSTANTS.xelor.id ? 12 : 6,
      quadrumentalBreeze: classType === CLASS_CONSTANTS.huppermage.id ? 500 : 0,
    };

    return baseStats;
  };

  return {
    setup,
    getBaseStatsForLevel,
    setCharacteristicLimits,
  };
};
