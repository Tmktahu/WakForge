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
  RUNE_ELEMENTAL_MASTERY_LEVEL_VALUES,
  RUNE_INITIATIVE_LEVEL_VALUES,
  RUNE_HEALTH_LEVEL_VALUES,
  RUNE_TYPES,
  ITEM_SLOT_DATA,
} from '@/models/useConstants';
import { SPELL_CATEGORIES } from '@/models/spells/useSpells';
import { useStates } from '@/models/useStates';

export const useStats = (currentCharacter) => {
  const { getStatesFromCharacter } = useStates();

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
      let states = getStatesFromCharacter(currentCharacter);
      console.log(states);

      // Health Points
      currentCharacter.value.healthPoints = Math.floor(
        (50 +
          currentCharacter.value.characteristics.strength.healthPoints * 20 + // from strength characteristic
          calcItemContribution(EFFECT_TYPE_DATA.healthPoints) + // from items
          calcRuneContribution(RUNE_TYPES.healthPoints) + // from runes
          calcPassivesContribution(EFFECT_TYPE_DATA.healthPointsFromLevel) * 0.01 * currentCharacter.value.level + // from passives
          10 * currentCharacter.value.level) * // the base amount of health
          (1 + currentCharacter.value.characteristics.intelligence.percentHealthPoints * 0.04) // all multiplied by the intelligent characteristic multiplier
      );

      // Armor Points are capped at 50% of the character's max health
      currentCharacter.value.armorPoints = Math.min(
        currentCharacter.value.healthPoints * 0.5,
        Math.floor(currentCharacter.value.healthPoints * currentCharacter.value.characteristics.intelligence.percentArmorHeathPoints * 0.04)
      );

      // Action Points
      currentCharacter.value.actionPoints =
        6 +
        currentCharacter.value.characteristics.major.actionPoints +
        calcItemContribution(EFFECT_TYPE_DATA.actionPoints) +
        calcStateContribution(states, EFFECT_TYPE_DATA.actionPoints);

      // Movement Points
      currentCharacter.value.movementPoints =
        3 +
        currentCharacter.value.characteristics.major.movementPointsAndDamage +
        calcItemContribution(EFFECT_TYPE_DATA.movementPoints) +
        calcPassivesContribution(EFFECT_TYPE_DATA.movementPoints);

      // wakfu Points are capped at 20
      currentCharacter.value.wakfuPoints = Math.min(
        20,
        (currentCharacter.value.class === CLASS_CONSTANTS.xelor.id ? 12 : 6) +
          currentCharacter.value.characteristics.major.wakfuPoints * 2 +
          calcItemContribution(EFFECT_TYPE_DATA.wakfuPoints) +
          calcPassivesContribution(EFFECT_TYPE_DATA.wakfuPoints)
      );

      // Quadrumental Breeze
      currentCharacter.value.quadrumentalBreeze =
        (currentCharacter.value.class === CLASS_CONSTANTS.huppermage.id ? 500 : 0) +
        (currentCharacter.value.characteristics.major.wakfuPoints * 2 +
          calcItemContribution(EFFECT_TYPE_DATA.wakfuPoints) +
          calcPassivesContribution(EFFECT_TYPE_DATA.wakfuPoints)) *
          150;

      // Elemental masteries
      currentCharacter.value.masteries.water = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.waterMastery);
      currentCharacter.value.masteries.air = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.airMastery);
      currentCharacter.value.masteries.earth = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.earthMastery);
      currentCharacter.value.masteries.fire = calcElemMasteryBonus() + calcItemContribution(EFFECT_TYPE_DATA.fireMastery);

      // Melee Mastery
      currentCharacter.value.masteries.melee =
        currentCharacter.value.characteristics.strength.meleeMastery * 8 + calcItemContribution(EFFECT_TYPE_DATA.meleeMastery) + calcRuneContribution(RUNE_TYPES.meleeMastery);

      // Distance Mastery
      currentCharacter.value.masteries.distance =
        currentCharacter.value.characteristics.strength.distanceMastery * 8 +
        calcItemContribution(EFFECT_TYPE_DATA.distanceMastery) +
        calcPassivesContribution(EFFECT_TYPE_DATA.distanceMastery) +
        calcRuneContribution(RUNE_TYPES.distanceMastery);

      // Critical Mastery
      currentCharacter.value.masteries.critical =
        currentCharacter.value.characteristics.fortune.criticalMastery * 4 +
        calcItemContribution(EFFECT_TYPE_DATA.criticalMastery) +
        calcRuneContribution(RUNE_TYPES.criticalMastery);

      // Rear Mastery
      currentCharacter.value.masteries.rear =
        currentCharacter.value.characteristics.fortune.rearMastery * 6 + calcItemContribution(EFFECT_TYPE_DATA.rearMastery) + calcRuneContribution(RUNE_TYPES.rearMastery);

      // Berserk Mastery
      currentCharacter.value.masteries.berserk =
        currentCharacter.value.characteristics.fortune.berserkMastery * 8 + calcItemContribution(EFFECT_TYPE_DATA.berserkMastery) + calcRuneContribution(RUNE_TYPES.berserkMastery);

      // Healing Mastery
      currentCharacter.value.masteries.healing =
        currentCharacter.value.characteristics.fortune.healingMastery * 6 + calcItemContribution(EFFECT_TYPE_DATA.healingMastery) + calcRuneContribution(RUNE_TYPES.healingMastery);

      // Resistances
      currentCharacter.value.resistances.water =
        calcElemResistanceBonus() +
        calcItemContribution(EFFECT_TYPE_DATA.waterResistance) +
        calcPassivesContribution(EFFECT_TYPE_DATA.elementalResistance) +
        calcRuneContribution(RUNE_TYPES.waterResistance);
      currentCharacter.value.resistances.air =
        calcElemResistanceBonus() +
        calcItemContribution(EFFECT_TYPE_DATA.airResistance) +
        calcPassivesContribution(EFFECT_TYPE_DATA.elementalResistance) +
        calcRuneContribution(RUNE_TYPES.airResistance);
      currentCharacter.value.resistances.earth =
        calcElemResistanceBonus() +
        calcItemContribution(EFFECT_TYPE_DATA.earthResistance) +
        calcPassivesContribution(EFFECT_TYPE_DATA.elementalResistance) +
        calcRuneContribution(RUNE_TYPES.earthResistance);
      currentCharacter.value.resistances.fire =
        calcElemResistanceBonus() +
        calcItemContribution(EFFECT_TYPE_DATA.fireResistance) +
        calcPassivesContribution(EFFECT_TYPE_DATA.elementalResistance) +
        calcRuneContribution(RUNE_TYPES.fireResistance);

      // Critical Resistance
      currentCharacter.value.resistances.critical =
        currentCharacter.value.characteristics.fortune.criticalResistance * 4 + calcItemContribution(EFFECT_TYPE_DATA.criticalResistance);

      // Rear Resistance
      currentCharacter.value.resistances.rear = currentCharacter.value.characteristics.fortune.rearResistance * 4 + calcItemContribution(EFFECT_TYPE_DATA.rearResistance);

      // Lock
      currentCharacter.value.stats.lock =
        (currentCharacter.value.characteristics.agility.lock * 6 +
          currentCharacter.value.characteristics.agility.lockAndDodge * 4 +
          calcRuneContribution(RUNE_TYPES.lock) +
          calcItemContribution(EFFECT_TYPE_DATA.lock) +
          calcPassivesContribution(EFFECT_TYPE_DATA.lockFromLevel) * 0.01 * currentCharacter.value.level) *
        calcPassivesContribution(EFFECT_TYPE_DATA.lockOverride) *
        calcPassivesContribution(EFFECT_TYPE_DATA.lockDoubled);

      // Dodge
      currentCharacter.value.stats.dodge = Math.floor(
        (currentCharacter.value.characteristics.agility.dodge * 6 +
          currentCharacter.value.characteristics.agility.lockAndDodge * 4 +
          calcItemContribution(EFFECT_TYPE_DATA.dodge) +
          calcRuneContribution(RUNE_TYPES.dodge) +
          calcPassivesContribution(EFFECT_TYPE_DATA.dodge) +
          calcPassivesContribution(EFFECT_TYPE_DATA.dodgeFromLevel) * 0.01 * currentCharacter.value.level) *
          (1 + calcPassivesContribution(EFFECT_TYPE_DATA.percentDodge) * 0.01) *
          calcPassivesContribution(EFFECT_TYPE_DATA.dodgeOverride)
      );

      // Initiative
      currentCharacter.value.stats.initiative =
        currentCharacter.value.characteristics.agility.initiative * 4 + calcItemContribution(EFFECT_TYPE_DATA.initiative) + calcRuneContribution(RUNE_TYPES.initiative);

      // Force of Will
      currentCharacter.value.stats.forceOfWill =
        currentCharacter.value.characteristics.agility.forceOfWill * 1 +
        calcItemContribution(EFFECT_TYPE_DATA.forceOfWill) +
        calcPassivesContribution(EFFECT_TYPE_DATA.forceOfWill) +
        calcStateContribution(states, EFFECT_TYPE_DATA.forceOfWill);

      // Armor Received
      currentCharacter.value.stats.armorReceived = calcPassivesContribution(EFFECT_TYPE_DATA.armorReceived);

      // Heals Performed
      currentCharacter.value.stats.healsPerformed = calcPassivesContribution(EFFECT_TYPE_DATA.healsPerformed);

      // Block has a cap of 100%
      currentCharacter.value.stats.block = Math.min(
        100,
        Math.floor(
          (currentCharacter.value.characteristics.fortune.percentBlock * 0.01 +
            calcItemContribution(EFFECT_TYPE_DATA.percentBlock) * 0.01 +
            calcPassivesContribution(EFFECT_TYPE_DATA.percentBlock) * 0.01) *
            100
        )
      );

      // Critical Hit has a cap of 100%, a base of 3%, and a min of -10%
      currentCharacter.value.stats.criticalHit = Math.min(
        Math.max(
          3 + // the base value
            currentCharacter.value.characteristics.fortune.percentCriticalHit + // from the fortune characteristic
            calcItemContribution(EFFECT_TYPE_DATA.criticalHit) + // from items
            calcStateContribution(states, EFFECT_TYPE_DATA.criticalHit), // from states
          -10 // the min
        ),
        100 // the max
      );

      // Damage Inflicted
      currentCharacter.value.stats.damageInflicted = Math.floor(
        currentCharacter.value.characteristics.major.percentDamageInflicted * 0.1 * 100 +
          calcPassivesContribution(EFFECT_TYPE_DATA.damageInflicted) +
          calcStateContribution(states, EFFECT_TYPE_DATA.damageInflicted)
      );

      // Range
      currentCharacter.value.stats.range =
        currentCharacter.value.characteristics.major.rangeAndDamage + calcItemContribution(EFFECT_TYPE_DATA.range) + calcPassivesContribution(EFFECT_TYPE_DATA.range);

      // Control
      currentCharacter.value.stats.control =
        currentCharacter.value.characteristics.major.controlAndDamage * 2 + calcItemContribution(EFFECT_TYPE_DATA.control) + calcPassivesContribution(EFFECT_TYPE_DATA.control);

      // Indirect Damage
      currentCharacter.value.stats.indirectDamage = calcPassivesContribution(EFFECT_TYPE_DATA.indirectDamageInflicted);

      // Heals Received
      currentCharacter.value.stats.healsReceived = calcPassivesContribution(EFFECT_TYPE_DATA.healsReceived);

      // Armor Given
      currentCharacter.value.stats.armorGiven = calcPassivesContribution(EFFECT_TYPE_DATA.armorGiven) + calcStateContribution(states, EFFECT_TYPE_DATA.armorGiven);
    }
  };

  const calcElemMasteryBonus = () => {
    let bonus =
      currentCharacter.value.characteristics.strength.elementalMastery * 5 +
      currentCharacter.value.characteristics.major.movementPointsAndDamage * 20 +
      currentCharacter.value.characteristics.major.rangeAndDamage * 40 +
      currentCharacter.value.characteristics.major.controlAndDamage * 40 +
      calcItemContribution(EFFECT_TYPE_DATA.elementalMastery) +
      calcRuneContribution(RUNE_TYPES.elementalMastery);

    return bonus;
  };

  const calcElemResistanceBonus = () => {
    let bonus =
      currentCharacter.value.characteristics.major.elementalResistance * 50 +
      currentCharacter.value.characteristics.intelligence.elementalResistance * 10 +
      calcItemContribution(EFFECT_TYPE_DATA.elementalResistance);
    return bonus;
  };

  const calcItemContribution = (targetEffect) => {
    let contribution = 0;

    // So to pull this off we need to iterate over each item slot
    Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
      // if the item slot has an item assigned, we're good to go
      if (currentCharacter.value.equipment[slotKey].item !== null) {
        // grab the item
        let item = currentCharacter.value.equipment[slotKey].item;

        // now we have to go over each of the item's effects and look for the one we want
        item.equipEffects?.forEach((effect) => {
          // we specifically compare the raw IDs here because that's what we get from the JSON
          if (targetEffect.rawIds.includes(effect.id)) {
            // if we have a match
            if (LEVELABLE_ITEMS.includes(item.type.id)) {
              // for items that level, we currently assume they are maxed at level 50
              if (item.id === 12237) {
                // this is for the pet Dot specifically because they are 'special' and only max out at level 25
                contribution += effect.values[0] + effect.values[1] * 25; // TODO make this dynamic?
              } else {
                contribution += effect.values[0] + effect.values[1] * 50; // TODO make this dynamic?
              }
            } else {
              // for normal items we just use the first value
              contribution += effect.values[0];
            }
          } else if (effect.id === 1068 || effect.id === 1069) {
            contribution += handleRandomStatEffects(targetEffect, effect);
            // we need custom logic to handle the random mastery and resistance effects
          }
        });
      }
    });

    // at this point we have iterated over all the items, so we should be done
    return contribution;
  };

  const handleRandomStatEffects = (targetEffect, effect) => {
    let contribution = 0;
    let validTargetEffectIds = [
      EFFECT_TYPE_DATA.waterMastery.id,
      EFFECT_TYPE_DATA.earthMastery.id,
      EFFECT_TYPE_DATA.airMastery.id,
      EFFECT_TYPE_DATA.fireMastery.id,
      EFFECT_TYPE_DATA.waterResistance.id,
      EFFECT_TYPE_DATA.earthResistance.id,
      EFFECT_TYPE_DATA.airResistance.id,
      EFFECT_TYPE_DATA.fireResistance.id,
    ];

    if (!validTargetEffectIds.includes(targetEffect.id)) {
      return contribution;
    }

    if (effect.id === 1068) {
      if (`${effect['masterySlot1']?.type}Mastery` === targetEffect.id) {
        contribution = effect['masterySlot1']?.value;
      }

      if (`${effect['masterySlot2']?.type}Mastery` === targetEffect.id) {
        contribution = effect['masterySlot2']?.value;
      }

      if (`${effect['masterySlot3']?.type}Mastery` === targetEffect.id) {
        contribution = effect['masterySlot3']?.value;
      }
    }

    if (effect.id === 1069) {
      if (`${effect['resistanceSlot1']?.type}Resistance` === targetEffect.id) {
        contribution = effect['resistanceSlot1']?.value;
      }

      if (`${effect['resistanceSlot2']?.type}Resistance` === targetEffect.id) {
        contribution = effect['resistanceSlot2']?.value;
      }

      if (`${effect['resistanceSlot3']?.type}Resistance` === targetEffect.id) {
        contribution = effect['resistanceSlot3']?.value;
      }
    }

    return contribution;
  };

  const calcPassivesContribution = (targetEffect) => {
    let contribution = 0;
    let isOverride = targetEffect.id === EFFECT_TYPE_DATA.dodgeOverride.id || targetEffect.id === EFFECT_TYPE_DATA.lockOverride.id;
    let isDouble = targetEffect.id === EFFECT_TYPE_DATA.lockDoubled.id;

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
            if (targetEffect.rawIds.includes(equipEffect.rawId)) {
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
      if (currentCharacter.value.equipment[slotKey].item !== null) {
        // grab the item
        let item = currentCharacter.value.equipment[slotKey].item;

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
    } else if (rune.id === RUNE_TYPES.earthResistance || rune.id === RUNE_TYPES.fireResistance || rune.id === RUNE_TYPES.waterResistance || rune.id === RUNE_TYPES.airResistance) {
      baseValue = RUNE_RESISTANCE_LEVEL_VALUES[level - 1];
    } else if (rune.id === RUNE_TYPES.lock || rune.id === RUNE_TYPES.dodge) {
      baseValue = RUNE_DODGE_LOCK_LEVEL_VALUES[level - 1];
    } else if (rune.id === RUNE_TYPES.initiative) {
      baseValue = RUNE_INITIATIVE_LEVEL_VALUES[level - 1];
    } else if (rune.id === RUNE_TYPES.elementalMastery) {
      baseValue = RUNE_ELEMENTAL_MASTERY_LEVEL_VALUES[level - 1];
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

  const calcStateContribution = (states, targetEffect) => {
    // note we pass states in as a param so we only have to assemble them once
    let contribution = 0;

    if (!states) {
      return contribution;
    }

    Object.keys(states).forEach((stateId) => {
      let stateEntry = states[stateId];

      if (stateEntry.state?.equipEffects) {
        stateEntry.state?.equipEffects?.forEach((effect) => {
          if (targetEffect.rawIds.includes(effect.rawId)) {
            if (stateEntry.level === 6 && !effect.values[stateEntry.level]) {
              console.error('Level 6 state detected that we dont have a value for.', stateId);
            } else {
              contribution += effect.values[stateEntry.level];
            }
          }
        });
      }
    });

    console.log(targetEffect, contribution);

    return contribution;
  };

  const calcTotalMastery = (targetMasteryKeys) => {
    let totalMastery = 0;

    targetMasteryKeys?.forEach((masteryKey) => {
      totalMastery += currentCharacter.value?.masteries?.[masteryKey];
    });

    return totalMastery;
  };

  const calcEffectiveHp = (damageType) => {
    let startingHP = currentCharacter.value?.healthPoints;

    let effectiveHp = startingHP / (1 - calcElemResistancePercentage(currentCharacter.value?.resistances?.[damageType]) / 100);
    return Math.round(effectiveHp);
  };

  return {
    setup,
    calcElemResistancePercentage,
    calcItemContribution,
    getRuneValue,
    calcTotalMastery,
    calcEffectiveHp,
  };
};
