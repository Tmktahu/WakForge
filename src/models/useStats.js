import { watch } from 'vue';
import { EventBus, Events } from '@/eventBus';
import { masterData } from '@/models/useStorage.js';
import { CLASS_CONSTANTS, EFFECT_TYPE_DATA, LEVELABLE_ITEMS } from '@/models/useConstants';

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
        (50 +
          currentCharacter.value.characteristics.strength.healthPoints * 20 +
          calcItemContribution(EFFECT_TYPE_DATA.healthPoints.rawId) +
          10 * currentCharacter.value.level) *
          (1 + currentCharacter.value.characteristics.intelligence.percentHealthPoints * 0.04)
      );
      currentCharacter.value.actionPoints =
        6 + currentCharacter.value.characteristics.major.actionPoints + calcItemContribution(EFFECT_TYPE_DATA.actionPoints.rawId);
      currentCharacter.value.movementPoints =
        3 + currentCharacter.value.characteristics.major.movementPointsAndDamage + calcItemContribution(EFFECT_TYPE_DATA.movementPoints.rawId);
      currentCharacter.value.wakfuPoints =
        (currentCharacter.value.class === CLASS_CONSTANTS.xelor ? 12 : 6) +
        currentCharacter.value.characteristics.major.wakfuPoints * 2 +
        calcItemContribution(EFFECT_TYPE_DATA.wakfuPoints.rawId);
      currentCharacter.value.quadrumentalBreeze =
        (currentCharacter.value.class === CLASS_CONSTANTS.huppermage ? 500 : 0) + currentCharacter.value.characteristics.major.wakfuPoints * 150;

      // Elemental masteries
      currentCharacter.value.masteries.water = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.waterMastery.rawId);
      currentCharacter.value.masteries.air = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.airMastery.rawId);
      currentCharacter.value.masteries.earth = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.earthMastery.rawId);
      currentCharacter.value.masteries.fire = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.fireMastery.rawId);

      // Other masteries
      currentCharacter.value.masteries.melee =
        currentCharacter.value.characteristics.strength.meleeMastery * 8 + calcItemContribution(EFFECT_TYPE_DATA.meleeMastery.rawId);
      currentCharacter.value.masteries.distance =
        currentCharacter.value.characteristics.strength.distanceMastery * 8 + calcItemContribution(EFFECT_TYPE_DATA.distanceMastery.rawId);
      currentCharacter.value.masteries.critical =
        currentCharacter.value.characteristics.fortune.criticalMastery * 1 + calcItemContribution(EFFECT_TYPE_DATA.criticalMastery.rawId);
      currentCharacter.value.masteries.rear =
        currentCharacter.value.characteristics.fortune.rearMastery * 6 + calcItemContribution(EFFECT_TYPE_DATA.rearMastery.rawId);
      currentCharacter.value.masteries.berserk =
        currentCharacter.value.characteristics.fortune.berserkMastery * 8 + calcItemContribution(EFFECT_TYPE_DATA.berserkMastery.rawId);
      currentCharacter.value.masteries.healing =
        currentCharacter.value.characteristics.fortune.healingMastery * 6 + calcItemContribution(EFFECT_TYPE_DATA.healingMastery.rawId);

      // Resistances
      currentCharacter.value.resistances.water = calcElemResistanceBonus() + calcItemContribution(EFFECT_TYPE_DATA.waterResistance.rawId);
      currentCharacter.value.resistances.air = calcElemResistanceBonus() + calcItemContribution(EFFECT_TYPE_DATA.airResistance.rawId);
      currentCharacter.value.resistances.earth = calcElemResistanceBonus() + calcItemContribution(EFFECT_TYPE_DATA.earthResistance.rawId);
      currentCharacter.value.resistances.fire = calcElemResistanceBonus() + calcItemContribution(EFFECT_TYPE_DATA.fireResistance.rawId);

      currentCharacter.value.resistances.critical =
        currentCharacter.value.characteristics.fortune.criticalResistance * 4 + calcItemContribution(EFFECT_TYPE_DATA.criticalResistance.rawId);
      currentCharacter.value.resistances.rear =
        currentCharacter.value.characteristics.fortune.rearResistance * 4 + calcItemContribution(EFFECT_TYPE_DATA.rearResistance.rawId);

      // Other stats
      currentCharacter.value.stats.lock =
        currentCharacter.value.characteristics.agility.lock * 6 +
        currentCharacter.value.characteristics.agility.lockAndDodge * 4 +
        calcItemContribution(EFFECT_TYPE_DATA.lock.rawId);
      currentCharacter.value.stats.dodge =
        currentCharacter.value.characteristics.agility.dodge * 6 +
        currentCharacter.value.characteristics.agility.lockAndDodge * 4 +
        calcItemContribution(EFFECT_TYPE_DATA.dodge.rawId);
      currentCharacter.value.stats.initiative =
        currentCharacter.value.characteristics.agility.initiative * 6 + calcItemContribution(EFFECT_TYPE_DATA.initiative.rawId);
      currentCharacter.value.stats.forceOfWill =
        currentCharacter.value.characteristics.agility.forceOfWill * 1 + calcItemContribution(EFFECT_TYPE_DATA.forceOfWill.rawId);

      currentCharacter.value.stats.block = (
        (currentCharacter.value.characteristics.fortune.percentBlock * 0.01 + calcItemContribution(EFFECT_TYPE_DATA.percentBlock.rawId) * 0.01) *
        100
      ).toFixed(2);
      currentCharacter.value.stats.criticalHit = (
        (currentCharacter.value.characteristics.fortune.percentCriticalHit * 0.01 + calcItemContribution(EFFECT_TYPE_DATA.criticalHit.rawId) * 0.01) *
        100
      ).toFixed(2);
      currentCharacter.value.stats.damageInflicted = (currentCharacter.value.characteristics.major.percentDamageInflicted * 0.1 * 100).toFixed(2);

      currentCharacter.value.stats.range = currentCharacter.value.characteristics.major.rangeAndDamage + calcItemContribution(EFFECT_TYPE_DATA.range.rawId);
      currentCharacter.value.stats.control =
        currentCharacter.value.characteristics.major.controlAndDamage * 2 + calcItemContribution(EFFECT_TYPE_DATA.control.rawId);
    }
  };

  const calcElemMasteryBonus = () => {
    let bonus =
      currentCharacter.value.characteristics.strength.elementalMastery * 5 +
      currentCharacter.value.characteristics.major.movementPointsAndDamage * 20 +
      currentCharacter.value.characteristics.major.rangeAndDamage * 40 +
      currentCharacter.value.characteristics.major.controlAndDamage * 40 +
      calcItemContribution(EFFECT_TYPE_DATA.elementalMastery.rawId);

    return bonus;
  };

  const calcElemResistanceBonus = () => {
    let bonus =
      currentCharacter.value.characteristics.major.elementalResistance * 50 +
      currentCharacter.value.characteristics.intelligence.elementalResistance * 10 +
      calcItemContribution(EFFECT_TYPE_DATA.elementalResistance.rawId);
    return bonus;
  };

  const calcItemContribution = (targetEffectRawId) => {
    let contribution = 0;

    // So to pull this off we need to iterate over each item slot
    Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
      // if the item slot has an item assigned, we're good to go
      if (currentCharacter.value.equipment[slotKey] !== null) {
        // grab the item
        let item = currentCharacter.value.equipment[slotKey];

        // now we have to go over each of the item's effects and look for the one we want
        item.equipEffects.forEach((effect) => {
          // we specifically compare the raw IDs here because that's what we get from the JSON
          if (targetEffectRawId === effect.id) {
            // if we have a match
            if (LEVELABLE_ITEMS.includes(item.type.id)) {
              // for items that level, we currently assume they are maxed at level 50
              contribution += effect.values[0] + effect.values[1] * 50; // TODO make this dynamic?
            } else {
              // for normal items we just use the first value
              contribution += effect.values[0];
            }
          } else if (effect.id === 1068 || effect.id === 1069) {
            contribution += handleRandomStatEffects(targetEffectRawId, effect);
            // we need custom logic to handle the random mastery and resistance effects
          }
        });
      }
    });

    // at this point we have iterated over all the items, so we should be done
    return contribution;
  };

  const handleRandomStatEffects = (targetEffectRawId, effect) => {
    let contribution = 0;
    let validTargetEffectIds = [
      EFFECT_TYPE_DATA.waterMastery.rawId,
      EFFECT_TYPE_DATA.earthMastery.rawId,
      EFFECT_TYPE_DATA.airMastery.rawId,
      EFFECT_TYPE_DATA.fireMastery.rawId,
      EFFECT_TYPE_DATA.waterResistance.rawId,
      EFFECT_TYPE_DATA.earthResistance.rawId,
      EFFECT_TYPE_DATA.airResistance.rawId,
      EFFECT_TYPE_DATA.fireResistance.rawId,
    ];

    if (!validTargetEffectIds.includes(targetEffectRawId)) {
      return contribution;
    }

    let targetEffectDataKey = Object.keys(EFFECT_TYPE_DATA).find((key) => {
      return EFFECT_TYPE_DATA[key].rawId === targetEffectRawId;
    });
    let targetEffectData = EFFECT_TYPE_DATA[targetEffectDataKey];

    if (effect.id === 1068) {
      if (`${effect['masterySlot1']?.type}Mastery` === targetEffectData.id) {
        contribution = effect['masterySlot1']?.value;
      }

      if (`${effect['masterySlot2']?.type}Mastery` === targetEffectData.id) {
        contribution = effect['masterySlot2']?.value;
      }

      if (`${effect['masterySlot3']?.type}Mastery` === targetEffectData.id) {
        contribution = effect['masterySlot3']?.value;
      }
    }

    if (effect.id === 1069) {
      if (`${effect['resistanceSlot1']?.type}Resistance` === targetEffectData.id) {
        contribution = effect['resistanceSlot1']?.value;
      }

      if (`${effect['resistanceSlot2']?.type}Resistance` === targetEffectData.id) {
        contribution = effect['resistanceSlot2']?.value;
      }

      if (`${effect['resistanceSlot3']?.type}Resistance` === targetEffectData.id) {
        contribution = effect['resistanceSlot3']?.value;
      }
    }

    return contribution;
  };

  const calcElemResistancePercentage = (resistanceValue) => {
    return ((1 - Math.pow(0.8, resistanceValue / 100)) * 100).toFixed(2);
  };

  return {
    setup,
    calcElemResistancePercentage,
  };
};