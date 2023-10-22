import { CLASS_CONSTANTS } from '@/models/useConstants';

export const useLevels = () => {
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
    getBaseStatsForLevel,
  };
};
