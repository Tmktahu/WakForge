import { encode as base2048Encode, decode as base2048Decode } from '@mikeshardmind/base2048';
import { encode as msgpackEncode, decode as msgpackDecode } from '@msgpack/msgpack';
import zlib from 'zlib';
import { Buffer } from 'buffer';

import { CLASS_CONSTANTS, ELEMENT_TYPE_ENUM, ITEM_SLOT_DATA } from '@/models/useConstants';
import { useItems } from '@/models/useItems';
import { useSpells } from '@/models/spells/useSpells';

const BUILD_CODE_VERSION = 1;

export const useBuildCodes = () => {
  const createBuildCode = (character) => {
    if (character === null) {
      return '';
    }

    let buildCode = '';
    let dataArray = [];

    dataArray.push(BUILD_CODE_VERSION);

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

    // Handling items
    Object.keys(character.equipment)
      .sort()
      .forEach((key, index) => {
        if (character.equipment[key] !== null) {
          let assignableEffect = null;
          let itemDataArray = [];

          // index 0 is the item ID
          itemDataArray.push(character.equipment[key].id);

          character.equipment[key].equipEffects.forEach((effect) => {
            if (effect.id === 1068 || effect.id === 1069) {
              assignableEffect = effect;
            }
          });

          // index 1 is an array of 3 values for random stat allocation
          let assignableData = 0;
          if (assignableEffect !== null) {
            if (assignableEffect.id === 1068) {
              // handling random mastery assignments
              assignableData =
                (ELEMENT_TYPE_ENUM[assignableEffect.masterySlot1?.type] || 0) +
                (ELEMENT_TYPE_ENUM[assignableEffect.masterySlot2?.type] || 0) +
                (ELEMENT_TYPE_ENUM[assignableEffect.masterySlot3?.type] || 0);
            }

            if (assignableEffect.id === 1069) {
              // handling random resistance assignments
              assignableData =
                (ELEMENT_TYPE_ENUM[assignableEffect.resistanceSlot1?.type] || 0) +
                (ELEMENT_TYPE_ENUM[assignableEffect.resistanceSlot2?.type] || 0) +
                (ELEMENT_TYPE_ENUM[assignableEffect.resistanceSlot3?.type] || 0);
            }
          }

          itemDataArray.push(assignableData);

          // index 2, will be arrays for rune information
          itemDataArray.push([
            [
              character.equipment[key]?.runeSlot1?.rune?.id || -1,
              character.equipment[key]?.runeSlot1?.level || -1,
              character.equipment[key]?.runeSlot1?.color || -1,
            ],
            [
              character.equipment[key]?.runeSlot2?.rune?.id || -1,
              character.equipment[key]?.runeSlot2?.level || -1,
              character.equipment[key]?.runeSlot2?.color || -1,
            ],
            [
              character.equipment[key]?.runeSlot3?.rune?.id || -1,
              character.equipment[key]?.runeSlot3?.level || -1,
              character.equipment[key]?.runeSlot3?.color || -1,
            ],
            [
              character.equipment[key]?.runeSlot4?.rune?.id || -1,
              character.equipment[key]?.runeSlot4?.level || -1,
              character.equipment[key]?.runeSlot4?.color || -1,
            ],
          ]); // each will include ID, color, level

          // index 3 will be for sublimations
          itemDataArray.push([]);

          dataArray.push(itemDataArray);
        } else {
          dataArray.push([]);
        }
      });

    // Handling spells
    dataArray.push(character.spells.activeSlot1?.id || -1);
    dataArray.push(character.spells.activeSlot2?.id || -1);
    dataArray.push(character.spells.activeSlot3?.id || -1);
    dataArray.push(character.spells.activeSlot4?.id || -1);
    dataArray.push(character.spells.activeSlot5?.id || -1);
    dataArray.push(character.spells.activeSlot6?.id || -1);
    dataArray.push(character.spells.activeSlot7?.id || -1);
    dataArray.push(character.spells.activeSlot8?.id || -1);
    dataArray.push(character.spells.activeSlot9?.id || -1);
    dataArray.push(character.spells.activeSlot10?.id || -1);
    dataArray.push(character.spells.activeSlot11?.id || -1);
    dataArray.push(character.spells.activeSlot12?.id || -1);

    dataArray.push(character.spells.passiveSlot1?.id || -1);
    dataArray.push(character.spells.passiveSlot2?.id || -1);
    dataArray.push(character.spells.passiveSlot3?.id || -1);
    dataArray.push(character.spells.passiveSlot4?.id || -1);
    dataArray.push(character.spells.passiveSlot5?.id || -1);
    dataArray.push(character.spells.passiveSlot6?.id || -1);

    let msgpackBinary = msgpackEncode(dataArray);
    let intermediatyBuffer = Buffer(msgpackBinary.buffer, msgpackBinary.byteOffset, msgpackBinary.byteLength);
    let zlibData = zlib.deflateRawSync(intermediatyBuffer, { windowBits: 15, level: 9 });
    buildCode = base2048Encode(zlibData);

    return buildCode;
  };

  const decodeBuildCode = (buildCode) => {
    buildCode.replaceAll('\n', ''); // catch for stray newlines when people triple-click-copy a code

    try {
      let decodedBase2048 = base2048Decode(buildCode);
      let intermediatyBuffer = Buffer(decodedBase2048.buffer);
      let decidedZlibData = zlib.inflateRawSync(intermediatyBuffer, { windowBits: 15, level: 9 });
      let decodedData = msgpackDecode(decidedZlibData);

      if (Array.isArray(decodedData)) {
        return decodedData;
      } else {
        return null;
      }
    } catch (error) {
      // console.error(error);
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

      spells: {},
    };

    let buildCodeVersion = buildData.shift();

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

    const { getSpellById } = useSpells();

    for (let activeSpellIndex = 1; activeSpellIndex <= 12; activeSpellIndex++) {
      characterData.spells[`activeSlot${activeSpellIndex}`] = getSpellById(buildData.shift());
    }

    for (let activeSpellIndex = 1; activeSpellIndex <= 6; activeSpellIndex++) {
      characterData.spells[`passiveSlot${activeSpellIndex}`] = getSpellById(buildData.shift());
    }

    return characterData;
  };

  const reassembleItemData = (itemData) => {
    if (!itemData.length) {
      return null;
    }

    const { getItemById, getRuneById } = useItems();
    let item = getItemById(itemData[0]);

    if (!item) {
      return null;
    }

    let randomEffect = item.equipEffects?.find((effect) => {
      return effect.id === 1068 || effect.id === 1069;
    });

    if (randomEffect) {
      let bitNumberString = itemData[1].toString(2);
      let elementIdArray = [];

      if (parseInt(bitNumberString[3]) === 1) {
        elementIdArray.push('fire'); // has fire
      }

      if (parseInt(bitNumberString[2]) === 1) {
        elementIdArray.push('earth'); // has earth
      }

      if (parseInt(bitNumberString[1]) === 1) {
        elementIdArray.push('water'); // has water
      }

      if (parseInt(bitNumberString[0]) === 1) {
        elementIdArray.push('air'); // has air
      }

      elementIdArray.sort();
      elementIdArray.push(...['empty', 'empty', 'empty']); // we buffer this incase there are empty slots

      for (let slotIndex = 1; slotIndex < randomEffect.values[2] + 1; slotIndex++) {
        let slotKey = `${randomEffect.id === 1068 ? 'mastery' : 'resistance'}Slot${slotIndex}`;

        randomEffect[slotKey] = {
          type: elementIdArray[slotIndex - 1],
          value: randomEffect.values[0],
        };
      }
    }

    let runeData = itemData[2];
    runeData.forEach((runeDataArray, index) => {
      let runeId = runeDataArray[0];
      if (runeId && runeId !== -1) {
        let rune = getItemById(runeId);

        if (rune) {
          item[`runeSlot${index + 1}`] = {
            rune: rune,
            level: runeDataArray[1],
            color: runeDataArray[2],
          };
        }
      }
    });

    return item;
  };

  return {
    createBuildCode,
    decodeBuildCode,
    parseBuildData,
  };
};
