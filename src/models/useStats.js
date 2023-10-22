import { ref, inject, watch } from 'vue';
import { EventBus, Events } from '../eventBus';
import { masterData } from '@/models/useStorage.js';
import { CLASS_CONSTANTS } from '@/models/useConstants';

export const useStats = (currentCharacter) => {
  const setup = () => {
    EventBus.on(Events.UPDATE_STATS, () => {
      updateStats();
    });

    watch(
      masterData,
      () => {
        // this watch handles live saving to local storage
        updateStats();
      },
      { immediate: true }
    );

    // updateStats();
  };

  const updateStats = () => {
    if (currentCharacter.value) {
      currentCharacter.value.healthPoints = Math.floor(
        50 +
          currentCharacter.value.characteristics.strength.healthPoints * 20 +
          10 * currentCharacter.value.level * (1 + currentCharacter.value.characteristics.intelligence.percentHealthPoints * 0.04)
      );
      currentCharacter.value.actionPoints = 6 + currentCharacter.value.characteristics.major.actionPoints;
      currentCharacter.value.movementPoints = 3 + currentCharacter.value.characteristics.major.movementPointsAndDamage;
      currentCharacter.value.wakfuPoints =
        (currentCharacter.value.class === CLASS_CONSTANTS.xelor ? 12 : 6) + currentCharacter.value.characteristics.major.wakfuPoints * 2;
      currentCharacter.value.quadrumentalBreeze =
        (currentCharacter.value.class === CLASS_CONSTANTS.huppermage ? 500 : 0) + currentCharacter.value.characteristics.major.wakfuPoints * 150;

      // Elemental masteries
      currentCharacter.value.masteries.water = calcElemMasteryBonus();
      currentCharacter.value.masteries.air = calcElemMasteryBonus();
      currentCharacter.value.masteries.earth = calcElemMasteryBonus();
      currentCharacter.value.masteries.fire = calcElemMasteryBonus();

      // Other masteries
      currentCharacter.value.masteries.melee = currentCharacter.value.characteristics.strength.meleeMastery * 8;
      currentCharacter.value.masteries.distance = currentCharacter.value.characteristics.strength.distanceMastery * 8;
      currentCharacter.value.masteries.critical = currentCharacter.value.characteristics.fortune.criticalMastery * 1;
      currentCharacter.value.masteries.rear = currentCharacter.value.characteristics.fortune.rearMastery * 6;
      currentCharacter.value.masteries.berserk = currentCharacter.value.characteristics.fortune.berserkMastery * 8;
      currentCharacter.value.masteries.healing = currentCharacter.value.characteristics.fortune.healingMastery * 6;

      // Resistances
      currentCharacter.value.resistances.water = calcElemResistanceBonus();
      currentCharacter.value.resistances.air = calcElemResistanceBonus();
      currentCharacter.value.resistances.earth = calcElemResistanceBonus();
      currentCharacter.value.resistances.fire = calcElemResistanceBonus();

      currentCharacter.value.resistances.critical = currentCharacter.value.characteristics.fortune.criticalResistance * 4;
      currentCharacter.value.resistances.rear = currentCharacter.value.characteristics.fortune.rearResistance * 4;

      // Other stats
      currentCharacter.value.stats.lock =
        currentCharacter.value.characteristics.agility.lock * 6 + currentCharacter.value.characteristics.agility.lockAndDodge * 4;
      currentCharacter.value.stats.dodge =
        currentCharacter.value.characteristics.agility.dodge * 6 + currentCharacter.value.characteristics.agility.lockAndDodge * 4;
      currentCharacter.value.stats.initiative = currentCharacter.value.characteristics.agility.initiative * 6;
      currentCharacter.value.stats.forceOfWill = currentCharacter.value.characteristics.agility.forceOfWill * 1;

      currentCharacter.value.stats.criticalHit = currentCharacter.value.characteristics.fortune.percentCriticalHit * 0.01 * 100;
      currentCharacter.value.stats.damageInflicted = currentCharacter.value.characteristics.major.percentDamageInflicted * 0.1 * 100;

      currentCharacter.value.stats.range = currentCharacter.value.characteristics.major.rangeAndDamage;
      currentCharacter.value.stats.control = currentCharacter.value.characteristics.major.controlAndDamage * 2;

      console.log('updated stats');
    }
  };

  const calcElemMasteryBonus = () => {
    let bonus =
      currentCharacter.value.characteristics.strength.elementalMastery * 5 +
      currentCharacter.value.characteristics.major.movementPointsAndDamage * 20 +
      currentCharacter.value.characteristics.major.rangeAndDamage * 40 +
      currentCharacter.value.characteristics.major.controlAndDamage * 40;
    return bonus;
  };

  const calcElemResistanceBonus = () => {
    let bonus = currentCharacter.value.characteristics.major.elementalResistance * 50;
    return bonus;
  };

  return {
    setup,
  };
};
