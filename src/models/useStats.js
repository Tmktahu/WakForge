import { watch } from 'vue';
import { EventBus, Events } from '@/eventBus';
import { masterData } from '@/models/useStorage.js';
import {
  CLASS_CONSTANTS,
  EFFECT_TYPE_DATA,
  LEVELABLE_ITEMS,
  PASSIVE_SPELL_LEVEL_MAP,
  RUNE_MASTERY_LEVEL_VALUES,
  RUNE_RESISTANCE_LEVEL_VALUES,
  RUNE_DODGE_LOCK_LEVEL_VALUES,
  RUNE_INITIATIVE_ELEMENTAL_MASTERY_LEVEL_VALUES,
  RUNE_HEALTH_LEVEL_VALUES,
  RUNE_TYPES,
  ITEM_SLOT_DATA,
} from '@/models/useConstants';
import { SPELL_CATEGORIES, useSpells } from '@/models/spells/useSpells';

const { getSpellData } = useSpells();

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
          calcRuneContribution(RUNE_TYPES.healthPoints) +
          calcPassivesContribution(EFFECT_TYPE_DATA.healthPointsFromLevel.rawId) * 0.01 * currentCharacter.value.level +
          10 * currentCharacter.value.level) *
          (1 + currentCharacter.value.characteristics.intelligence.percentHealthPoints * 0.04)
      );

      // armor points are capped at 50% of the character's max health
      currentCharacter.value.armorPoints = Math.min(
        currentCharacter.value.healthPoints * 0.5,
        Math.floor(currentCharacter.value.healthPoints * currentCharacter.value.characteristics.intelligence.percentArmorHeathPoints * 0.04)
      );
      currentCharacter.value.actionPoints =
        6 + currentCharacter.value.characteristics.major.actionPoints + calcItemContribution(EFFECT_TYPE_DATA.actionPoints.rawId);
      currentCharacter.value.movementPoints =
        3 +
        currentCharacter.value.characteristics.major.movementPointsAndDamage +
        calcItemContribution(EFFECT_TYPE_DATA.movementPoints.rawId) +
        calcPassivesContribution(EFFECT_TYPE_DATA.movementPoints.rawId);

      // wakfu points are capped at 20
      currentCharacter.value.wakfuPoints = Math.min(
        20,
        (currentCharacter.value.class === CLASS_CONSTANTS.xelor ? 12 : 6) +
          currentCharacter.value.characteristics.major.wakfuPoints * 2 +
          calcItemContribution(EFFECT_TYPE_DATA.wakfuPoints.rawId) +
          calcPassivesContribution(EFFECT_TYPE_DATA.wakfuPoints.rawId)
      );
      currentCharacter.value.quadrumentalBreeze =
        (currentCharacter.value.class === CLASS_CONSTANTS.huppermage ? 500 : 0) + currentCharacter.value.characteristics.major.wakfuPoints * 150;

      // Elemental masteries
      currentCharacter.value.masteries.water = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.waterMastery.rawId);
      currentCharacter.value.masteries.air = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.airMastery.rawId);
      currentCharacter.value.masteries.earth = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.earthMastery.rawId);
      currentCharacter.value.masteries.fire = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.fireMastery.rawId);

      // Other masteries
      currentCharacter.value.masteries.melee =
        currentCharacter.value.characteristics.strength.meleeMastery * 8 +
        calcItemContribution(EFFECT_TYPE_DATA.meleeMastery.rawId) +
        calcRuneContribution(RUNE_TYPES.meleeMastery);
      currentCharacter.value.masteries.distance =
        currentCharacter.value.characteristics.strength.distanceMastery * 8 +
        calcItemContribution(EFFECT_TYPE_DATA.distanceMastery.rawId) +
        calcPassivesContribution(EFFECT_TYPE_DATA.distanceMastery.rawId) +
        calcRuneContribution(RUNE_TYPES.distanceMastery);
      currentCharacter.value.masteries.critical =
        currentCharacter.value.characteristics.fortune.criticalMastery * 4 +
        calcItemContribution(EFFECT_TYPE_DATA.criticalMastery.rawId) +
        calcRuneContribution(RUNE_TYPES.criticalMastery);
      currentCharacter.value.masteries.rear =
        currentCharacter.value.characteristics.fortune.rearMastery * 6 +
        calcItemContribution(EFFECT_TYPE_DATA.rearMastery.rawId) +
        calcRuneContribution(RUNE_TYPES.rearMastery);
      currentCharacter.value.masteries.berserk =
        currentCharacter.value.characteristics.fortune.berserkMastery * 8 +
        calcItemContribution(EFFECT_TYPE_DATA.berserkMastery.rawId) +
        calcRuneContribution(RUNE_TYPES.berserkMastery);
      currentCharacter.value.masteries.healing =
        currentCharacter.value.characteristics.fortune.healingMastery * 6 +
        calcItemContribution(EFFECT_TYPE_DATA.healingMastery.rawId) +
        calcRuneContribution(RUNE_TYPES.healingMastery);

      // Resistances
      currentCharacter.value.resistances.water =
        calcElemResistanceBonus() +
        calcItemContribution(EFFECT_TYPE_DATA.waterResistance.rawId) +
        calcPassivesContribution(EFFECT_TYPE_DATA.elementalResistance.rawId) +
        calcRuneContribution(RUNE_TYPES.waterResistance);
      currentCharacter.value.resistances.air =
        calcElemResistanceBonus() +
        calcItemContribution(EFFECT_TYPE_DATA.airResistance.rawId) +
        calcPassivesContribution(EFFECT_TYPE_DATA.elementalResistance.rawId) +
        calcRuneContribution(RUNE_TYPES.airResistance);
      currentCharacter.value.resistances.earth =
        calcElemResistanceBonus() +
        calcItemContribution(EFFECT_TYPE_DATA.earthResistance.rawId) +
        calcPassivesContribution(EFFECT_TYPE_DATA.elementalResistance.rawId) +
        calcRuneContribution(RUNE_TYPES.earthResistance);
      currentCharacter.value.resistances.fire =
        calcElemResistanceBonus() +
        calcItemContribution(EFFECT_TYPE_DATA.fireResistance.rawId) +
        calcPassivesContribution(EFFECT_TYPE_DATA.elementalResistance.rawId) +
        calcRuneContribution(RUNE_TYPES.fireResistance);

      currentCharacter.value.resistances.critical =
        currentCharacter.value.characteristics.fortune.criticalResistance * 4 + calcItemContribution(EFFECT_TYPE_DATA.criticalResistance.rawId);
      currentCharacter.value.resistances.rear =
        currentCharacter.value.characteristics.fortune.rearResistance * 4 + calcItemContribution(EFFECT_TYPE_DATA.rearResistance.rawId);

      // Other stats
      currentCharacter.value.stats.lock =
        (currentCharacter.value.characteristics.agility.lock * 6 +
          currentCharacter.value.characteristics.agility.lockAndDodge * 4 +
          calcItemContribution(EFFECT_TYPE_DATA.lock.rawId) +
          calcPassivesContribution(EFFECT_TYPE_DATA.lockFromLevel.rawId) * 0.01 * currentCharacter.value.level) *
        calcPassivesContribution(EFFECT_TYPE_DATA.lockOverride.rawId) *
        calcPassivesContribution(EFFECT_TYPE_DATA.lockDoubled.rawId);

      currentCharacter.value.stats.dodge = Math.floor(
        (currentCharacter.value.characteristics.agility.dodge * 6 +
          currentCharacter.value.characteristics.agility.lockAndDodge * 4 +
          calcItemContribution(EFFECT_TYPE_DATA.dodge.rawId) +
          calcRuneContribution(RUNE_TYPES.dodge) +
          calcPassivesContribution(EFFECT_TYPE_DATA.dodge.rawId) +
          calcPassivesContribution(EFFECT_TYPE_DATA.dodgeFromLevel.rawId) * 0.01 * currentCharacter.value.level) *
          (1 + calcPassivesContribution(EFFECT_TYPE_DATA.percentDodge.rawId) * 0.01) *
          calcPassivesContribution(EFFECT_TYPE_DATA.dodgeOverride.rawId)
      );

      currentCharacter.value.stats.initiative =
        currentCharacter.value.characteristics.agility.initiative * 6 +
        calcItemContribution(EFFECT_TYPE_DATA.initiative.rawId) +
        calcRuneContribution(RUNE_TYPES.initiative);

      currentCharacter.value.stats.forceOfWill =
        currentCharacter.value.characteristics.agility.forceOfWill * 1 +
        calcItemContribution(EFFECT_TYPE_DATA.forceOfWill.rawId) +
        calcPassivesContribution(EFFECT_TYPE_DATA.forceOfWill.rawId);

      currentCharacter.value.stats.armorReceived = calcPassivesContribution(EFFECT_TYPE_DATA.armorReceived.rawId);

      currentCharacter.value.stats.healsPerformed = calcPassivesContribution(EFFECT_TYPE_DATA.healsPerformed.rawId);

      // block has a cap of 100%
      currentCharacter.value.stats.block = Math.min(
        100,
        Math.floor(
          (currentCharacter.value.characteristics.fortune.percentBlock * 0.01 +
            calcItemContribution(EFFECT_TYPE_DATA.percentBlock.rawId) * 0.01 +
            calcRuneContribution(RUNE_TYPES.lock) +
            calcPassivesContribution(EFFECT_TYPE_DATA.percentBlock.rawId) * 0.01) *
            100
        )
      );

      // crit has a cap of 100% and a base of 3%
      currentCharacter.value.stats.criticalHit = Math.min(
        Math.floor(
          (0.03 + currentCharacter.value.characteristics.fortune.percentCriticalHit * 0.01 + calcItemContribution(EFFECT_TYPE_DATA.criticalHit.rawId) * 0.01) *
            100
        )
      );
      currentCharacter.value.stats.damageInflicted = Math.floor(
        currentCharacter.value.characteristics.major.percentDamageInflicted * 0.1 * 100 + calcPassivesContribution(EFFECT_TYPE_DATA.damageInflicted.rawId)
      );

      currentCharacter.value.stats.range =
        currentCharacter.value.characteristics.major.rangeAndDamage +
        calcItemContribution(EFFECT_TYPE_DATA.range.rawId) +
        calcPassivesContribution(EFFECT_TYPE_DATA.range.rawId);

      currentCharacter.value.stats.control =
        currentCharacter.value.characteristics.major.controlAndDamage * 2 +
        calcItemContribution(EFFECT_TYPE_DATA.control.rawId) +
        calcPassivesContribution(EFFECT_TYPE_DATA.control.rawId);

      currentCharacter.value.stats.indirectDamage = calcPassivesContribution(EFFECT_TYPE_DATA.indirectDamageInflicted.rawId);
      currentCharacter.value.stats.healsReceived = calcPassivesContribution(EFFECT_TYPE_DATA.healsReceived.rawId);
      currentCharacter.value.stats.armorGiven = calcPassivesContribution(EFFECT_TYPE_DATA.armorGiven.rawId);
    }
  };

  const calcElemMasteryBonus = () => {
    let bonus =
      currentCharacter.value.characteristics.strength.elementalMastery * 5 +
      currentCharacter.value.characteristics.major.movementPointsAndDamage * 20 +
      currentCharacter.value.characteristics.major.rangeAndDamage * 40 +
      currentCharacter.value.characteristics.major.controlAndDamage * 40 +
      calcItemContribution(EFFECT_TYPE_DATA.elementalMastery.rawId) +
      calcRuneContribution(RUNE_TYPES.elementalMastery);

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

  const calcPassivesContribution = (targetEffectRawId) => {
    let contribution = 0;
    let isOverride = targetEffectRawId === EFFECT_TYPE_DATA.dodgeOverride.rawId || targetEffectRawId === EFFECT_TYPE_DATA.lockOverride.rawId;
    let isDouble = targetEffectRawId === EFFECT_TYPE_DATA.lockDoubled.rawId;

    if (isOverride || isDouble) {
      // these we multiple because the overrides are used to set the value to 0
      contribution = 1;
    }

    Object.keys(currentCharacter.value.spells).forEach((slotKey) => {
      if (slotKey.includes(SPELL_CATEGORIES.passive) && currentCharacter.value.spells[slotKey] !== null) {
        let spellData = currentCharacter.value.spells[slotKey];
        let targetEffects = null;
        if (currentCharacter.value.level >= PASSIVE_SPELL_LEVEL_MAP[spellData.id]) {
          targetEffects = spellData?.normalEffects['2'];
        } else {
          targetEffects = spellData?.normalEffects['1'];
        }

        if (targetEffects) {
          targetEffects.equipEffects.forEach((equipEffect) => {
            if (equipEffect.rawId === targetEffectRawId) {
              if (isOverride || isDouble) {
                contribution = equipEffect.value;
              } else {
                contribution += equipEffect.value;
              }
            }
          });
        }
      }
    });

    return contribution;
  };

  const calcRuneContribution = (targetRuneId) => {
    let contribution = 0;

    Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
      // if the item slot has an item assigned, we're good to go
      if (currentCharacter.value.equipment[slotKey] !== null) {
        // grab the item
        let item = currentCharacter.value.equipment[slotKey];

        for (let runeSlotIndex = 1; runeSlotIndex <= 4; runeSlotIndex++) {
          let possibleRune = item[`runeSlot${runeSlotIndex}`];
          if (possibleRune && possibleRune.rune.id === targetRuneId) {
            let value = getRuneValue(possibleRune.rune, possibleRune.level, slotKey);
            contribution += value;
          }
        }
      }
    });

    return contribution;
  };

  const calcElemResistancePercentage = (resistanceValue) => {
    // the resistance values are actually floored like this for damage calculations. weird
    // in addition, there is a max of 90%
    return Math.min(90, Math.floor((1 - Math.pow(0.8, resistanceValue / 100)) * 100));
  };

  const getRuneValue = (rune, level, itemSlotKey) => {
    // we have this stuff hardcoded because ankama is dumb and their method of calculating this stuff was literally dreamed up by someone on shrooms
    let baseValue = 0;

    if (
      rune.id === RUNE_TYPES.meleeMastery ||
      rune.id === RUNE_TYPES.distanceMastery ||
      rune.id === RUNE_TYPES.berserkMastery ||
      rune.id === RUNE_TYPES.criticalMastery ||
      rune.id === RUNE_TYPES.rearMastery ||
      rune.id === RUNE_TYPES.healingMastery
    ) {
      baseValue = RUNE_MASTERY_LEVEL_VALUES[level - 1];
    } else if (
      rune.id === RUNE_TYPES.earthResistance ||
      rune.id === RUNE_TYPES.fireResistance ||
      rune.id === RUNE_TYPES.waterResistance ||
      rune.id === RUNE_TYPES.airResistance
    ) {
      baseValue = RUNE_RESISTANCE_LEVEL_VALUES[level - 1];
    } else if (rune.id === RUNE_TYPES.lock || rune.id === RUNE_TYPES.dodge) {
      baseValue = RUNE_DODGE_LOCK_LEVEL_VALUES[level - 1];
    } else if (rune.id === RUNE_TYPES.initiative || rune.id === RUNE_TYPES.elementalMastery) {
      baseValue = RUNE_INITIATIVE_ELEMENTAL_MASTERY_LEVEL_VALUES[level - 1];
    } else if (rune.id === RUNE_TYPES.healthPoints) {
      baseValue = RUNE_HEALTH_LEVEL_VALUES[level - 1];
    }

    let finalValue = baseValue;

    if (itemSlotKey) {
      let slotRawId = ITEM_SLOT_DATA[itemSlotKey].rawId;
      if (rune.shardsParameters.doubleBonusPosition.includes(slotRawId)) {
        finalValue = finalValue * 2;
      }
    }

    return finalValue;
  };

  return {
    setup,
    calcElemResistancePercentage,
    calcItemContribution,
    getRuneValue,
  };
};
