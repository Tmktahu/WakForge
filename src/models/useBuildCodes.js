import { encode as base2048Encode, decode as base2048Decode } from '@/plugins/base2048/encoder';
import { encode as msgpackEncode, decode as msgpackDecode } from '@msgpack/msgpack';

import { CLASS_CONSTANTS, ELEMENT_TYPE_ENUM, ITEM_SLOT_DATA } from '@/models/useConstants';
import { useItems } from '@/models/useItems';

export const useBuildCodes = () => {
  //// so how dafuq is this gunna work

  // what is the bare min I need for a build

  /*
  id: null,
  name: 'New Character',

  class: null, // Should always use a class constant, string
  level: 1,

  characteristics: {
    intelligence: {
      percentHealthPoints: 0,
      elementalResistance: 0,
      barrier: 0,
      percentHealsReceived: 0,
      percentArmorHeathPoints: 0,
    },
    strength: {
      elementalMastery: 0,
      meleeMastery: 0,
      distanceMastery: 0,
      healthPoints: 0,
    },
    agility: {
      lock: 0,
      dodge: 0,
      initiative: 0,
      lockAndDodge: 0,
      forceOfWill: 0,
    },
    fortune: {
      percentCriticalHit: 0,
      percentBlock: 0,
      criticalMastery: 0,
      rearMastery: 0,
      berserkMastery: 0,
      healingMastery: 0,
      rearResistance: 0,
      criticalResistance: 0,
    },
    major: {
      actionPoints: 0,
      movementPointsAndDamage: 0,
      rangeAndDamage: 0,
      wakfuPoints: 0,
      controlAndDamage: 0,
      percentDamageInflicted: 0,
      elementalResistance: 0,
    },
  },

  spells: {
    activeSlot1: null,
    activeSlot2: null,
    activeSlot3: null,
    activeSlot4: null,
    activeSlot5: null,
    activeSlot6: null,
    activeSlot7: null,
    activeSlot8: null,
    activeSlot9: null,
    activeSlot10: null,
    activeSlot11: null,
    activeSlot12: null,

    passiveSlot1: null, // IDs
    passiveSlot2: null,
    passiveSlot3: null,
    passiveSlot4: null,
    passiveSlot5: null,
    passiveSlot6: null,
  },

  equipment: {
    [ITEM_SLOT_DATA.HEAD.id]: null, // ideally IDs, but we have to account for random allocations
    [ITEM_SLOT_DATA.NECK.id]: null,
    [ITEM_SLOT_DATA.BELT.id]: null,
    [ITEM_SLOT_DATA.LEGS.id]: null,
    [ITEM_SLOT_DATA.CHEST.id]: null,
    [ITEM_SLOT_DATA.BACK.id]: null,
    [ITEM_SLOT_DATA.SHOULDERS.id]: null,
    [ITEM_SLOT_DATA.LEFT_HAND.id]: null,
    [ITEM_SLOT_DATA.RIGHT_HAND.id]: null,
    [ITEM_SLOT_DATA.SECOND_WEAPON.id]: null,
    [ITEM_SLOT_DATA.FIRST_WEAPON.id]: null,
    [ITEM_SLOT_DATA.ACCESSORY.id]: null,
    [ITEM_SLOT_DATA.PET.id]: null,
    [ITEM_SLOT_DATA.MOUNT.id]: null,
  },
};

  */

  // CLASSINT:LEVELINT:

  // we need to convert this stuff to binary first

  const createBuildCode = (character) => {
    if (character === null) {
      return '';
    }

    let buildCode = '';
    let dataArray = [];

    // dataArray.push(character.name);

    let classIndex = Object.keys(CLASS_CONSTANTS).indexOf(character.class);
    dataArray.push(classIndex);

    let adjustedLevel = character.level; // we do this to keep it under 128
    dataArray.push(adjustedLevel);

    dataArray.push(character.characteristics.intelligence.percentHealthPoints);
    dataArray.push(character.characteristics.intelligence.elementalResistance);
    dataArray.push(character.characteristics.intelligence.barrier);
    dataArray.push(character.characteristics.intelligence.percentHealsReceived);
    dataArray.push(character.characteristics.intelligence.percentArmorHeathPoints);

    dataArray.push(character.characteristics.strength.elementalMastery);
    dataArray.push(character.characteristics.strength.meleeMastery);
    dataArray.push(character.characteristics.strength.distanceMastery);
    dataArray.push(character.characteristics.strength.healthPoints);

    dataArray.push(character.characteristics.agility.lock);
    dataArray.push(character.characteristics.agility.dodge);
    dataArray.push(character.characteristics.agility.initiative);
    dataArray.push(character.characteristics.agility.lockAndDodge);
    dataArray.push(character.characteristics.agility.forceOfWill);

    dataArray.push(character.characteristics.fortune.percentCriticalHit);
    dataArray.push(character.characteristics.fortune.percentBlock);
    dataArray.push(character.characteristics.fortune.criticalMastery);
    dataArray.push(character.characteristics.fortune.rearMastery);
    dataArray.push(character.characteristics.fortune.berserkMastery);
    dataArray.push(character.characteristics.fortune.healingMastery);
    dataArray.push(character.characteristics.fortune.rearResistance);
    dataArray.push(character.characteristics.fortune.criticalResistance);

    dataArray.push(character.characteristics.major.actionPoints);
    dataArray.push(character.characteristics.major.movementPointsAndDamage);
    dataArray.push(character.characteristics.major.rangeAndDamage);
    dataArray.push(character.characteristics.major.wakfuPoints);
    dataArray.push(character.characteristics.major.controlAndDamage);
    dataArray.push(character.characteristics.major.percentDamageInflicted);
    dataArray.push(character.characteristics.major.elementalResistance);

    Object.keys(character.equipment)
      .sort()
      .forEach((key, index) => {
        if (character.equipment[key] !== null) {
          let assignableEffect = null;

          character.equipment[key].equipEffects.forEach((effect) => {
            if (effect.id === 1068 || effect.id === 1069) {
              assignableEffect = effect;
            }
          });

          if (assignableEffect !== null) {
            if (assignableEffect.id === 1068) {
              // handling random mastery assignments
              dataArray.push([
                character.equipment[key].id,
                ELEMENT_TYPE_ENUM[assignableEffect.masterySlot1?.type] || -1,
                ELEMENT_TYPE_ENUM[assignableEffect.masterySlot2?.type] || -1,
                ELEMENT_TYPE_ENUM[assignableEffect.masterySlot3?.type] || -1,
              ]);
            }

            if (assignableEffect.id === 1069) {
              // handling random resistance assignments
              dataArray.push([
                character.equipment[key].id,
                ELEMENT_TYPE_ENUM[assignableEffect.resistanceSlot1?.type] || -1,
                ELEMENT_TYPE_ENUM[assignableEffect.resistanceSlot2?.type] || -1,
                ELEMENT_TYPE_ENUM[assignableEffect.resistanceSlot3?.type] || -1,
              ]);
            }
          } else {
            dataArray.push(character.equipment[key].id);
          }
        } else {
          dataArray.push(-1);
        }
      });

    let msgpackBinary = msgpackEncode(dataArray);
    buildCode = base2048Encode(msgpackBinary);

    return buildCode;
  };

  const decodeBuildCode = (buildCode) => {
    try {
      let decodedBase2048 = base2048Decode(buildCode);
      let decodedData = msgpackDecode(decodedBase2048);

      if (Array.isArray(decodedData) && decodedData.length === 47) {
        return decodedData;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const parseBuildData = (buildData) => {
    let characterData = {
      characteristics: {
        intelligence: {},
        strength: {},
        agility: {},
        fortune: {},
        major: {},
      },

      equipment: {
        [ITEM_SLOT_DATA.HEAD.id]: null,
        [ITEM_SLOT_DATA.NECK.id]: null,
        [ITEM_SLOT_DATA.BELT.id]: null,
        [ITEM_SLOT_DATA.LEGS.id]: null,
        [ITEM_SLOT_DATA.CHEST.id]: null,
        [ITEM_SLOT_DATA.BACK.id]: null,
        [ITEM_SLOT_DATA.SHOULDERS.id]: null,
        [ITEM_SLOT_DATA.LEFT_HAND.id]: null,
        [ITEM_SLOT_DATA.RIGHT_HAND.id]: null,
        [ITEM_SLOT_DATA.SECOND_WEAPON.id]: null,
        [ITEM_SLOT_DATA.FIRST_WEAPON.id]: null,
        [ITEM_SLOT_DATA.ACCESSORY.id]: null,
        [ITEM_SLOT_DATA.PET.id]: null,
        [ITEM_SLOT_DATA.MOUNT.id]: null,
      },
    };

    characterData.class = Object.keys(CLASS_CONSTANTS)[buildData.shift()] || null;
    characterData.level = buildData.shift();

    // Characteristics handling
    characterData.characteristics.intelligence.percentHealthPoints = buildData.shift();
    characterData.characteristics.intelligence.elementalResistance = buildData.shift();
    characterData.characteristics.intelligence.barrier = buildData.shift();
    characterData.characteristics.intelligence.percentHealsReceived = buildData.shift();
    characterData.characteristics.intelligence.percentArmorHeathPoints = buildData.shift();

    characterData.characteristics.strength.elementalMastery = buildData.shift();
    characterData.characteristics.strength.meleeMastery = buildData.shift();
    characterData.characteristics.strength.distanceMastery = buildData.shift();
    characterData.characteristics.strength.healthPoints = buildData.shift();

    characterData.characteristics.agility.lock = buildData.shift();
    characterData.characteristics.agility.dodge = buildData.shift();
    characterData.characteristics.agility.initiative = buildData.shift();
    characterData.characteristics.agility.lockAndDodge = buildData.shift();
    characterData.characteristics.agility.forceOfWill = buildData.shift();

    characterData.characteristics.fortune.percentCriticalHit = buildData.shift();

    characterData.characteristics.fortune.percentBlock = buildData.shift();
    characterData.characteristics.fortune.criticalMastery = buildData.shift();
    characterData.characteristics.fortune.rearMastery = buildData.shift();
    characterData.characteristics.fortune.berserkMastery = buildData.shift();
    characterData.characteristics.fortune.healingMastery = buildData.shift();
    characterData.characteristics.fortune.rearResistance = buildData.shift();
    characterData.characteristics.fortune.criticalResistance = buildData.shift();

    characterData.characteristics.major.actionPoints = buildData.shift();

    characterData.characteristics.major.movementPointsAndDamage = buildData.shift();
    characterData.characteristics.major.rangeAndDamage = buildData.shift();
    characterData.characteristics.major.wakfuPoints = buildData.shift();
    characterData.characteristics.major.controlAndDamage = buildData.shift();
    characterData.characteristics.major.percentDamageInflicted = buildData.shift();
    characterData.characteristics.major.elementalResistance = buildData.shift();

    // Equipment handling

    Object.keys(characterData.equipment)
      .sort()
      .forEach((key) => {
        characterData.equipment[key] = reassembleItemData(buildData.shift());
      });

    // characterData.equipment[ITEM_SLOT_DATA.HEAD.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.NECK.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.BELT.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.LEGS.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.CHEST.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.BACK.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.SHOULDERS.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.RIGHT_HAND.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.ACCESSORY.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.PET.id] = reassembleItemData(buildData.shift());
    // characterData.equipment[ITEM_SLOT_DATA.MOUNT.id] = reassembleItemData(buildData.shift());

    // equipment: {
    //   [ITEM_SLOT_DATA.LEFT_HAND.id]: null,
    //   [ITEM_SLOT_DATA.RIGHT_HAND.id]: null,
    //   [ITEM_SLOT_DATA.SECOND_WEAPON.id]: null,
    //   [ITEM_SLOT_DATA.FIRST_WEAPON.id]: null,
    //   [ITEM_SLOT_DATA.ACCESSORY.id]: null,
    //   [ITEM_SLOT_DATA.PET.id]: null,
    //   [ITEM_SLOT_DATA.MOUNT.id]: null,
    // },

    // characterData.spells.activeSlot1 = buildData.shift();
    // characterData.spells.activeSlot2 = buildData.shift();
    // characterData.spells.activeSlot3 = buildData.shift();
    // characterData.spells.activeSlot4 = buildData.shift();
    // characterData.spells.activeSlot5 = buildData.shift();
    // characterData.spells.activeSlot6 = buildData.shift();
    // characterData.spells.activeSlot7 = buildData.shift();
    // characterData.spells.activeSlot8 = buildData.shift();
    // characterData.spells.activeSlot9 = buildData.shift();
    // characterData.spells.activeSlot10 = buildData.shift();
    // characterData.spells.activeSlot11 = buildData.shift();
    // characterData.spells.activeSlot12 = buildData.shift();

    // characterData.spells.passiveSlot1 = buildData.shift();
    // characterData.spells.passiveSlot2 = buildData.shift();
    // characterData.spells.passiveSlot3 = buildData.shift();
    // characterData.spells.passiveSlot4 = buildData.shift();
    // characterData.spells.passiveSlot5 = buildData.shift();
    // characterData.spells.passiveSlot6 = buildData.shift();

    return characterData;
  };

  const reassembleItemData = (itemData) => {
    const { getItemById } = useItems();

    if (Array.isArray(itemData)) {
      let item = getItemById(itemData[0]);
      let randomEffect = item.equipEffects.find((effect) => {
        return effect.id === 1068 || effect.id === 1069;
      });

      if (randomEffect.id === 1068) {
        for (let slotIndex = 1; slotIndex < 4; slotIndex++) {
          if (itemData[slotIndex] !== -1) {
            randomEffect[`masterySlot${slotIndex}`] = {
              type: Object.keys(ELEMENT_TYPE_ENUM)[itemData[slotIndex]],
              value: randomEffect.values[0],
            };
          }
        }
      }

      if (randomEffect.id === 1069) {
        for (let slotIndex = 1; slotIndex < 4; slotIndex++) {
          if (itemData[slotIndex] !== -1) {
            randomEffect[`resistanceSlot${slotIndex}`] = {
              type: Object.keys(ELEMENT_TYPE_ENUM)[itemData[slotIndex]],
              value: randomEffect.values[0],
            };
          }
        }
      }

      return item;
    } else {
      return getItemById(itemData);
    }
  };

  return {
    createBuildCode,
    decodeBuildCode,
    parseBuildData,
  };
};
