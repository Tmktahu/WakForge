import { watch } from 'vue';

import { masterData } from '@/models/useStorage.js';

import spellData from './spell_data.json';

export const SPELL_CATEGORIES = {
  passive: 'passive',
  active: 'active',
  elemental: 'elemental',
};

export const SPELL_SLOT_DEFS = {
  activeSlot1: 0,
  activeSlot2: 0,
  activeSlot3: 0,
  activeSlot4: 0,
  activeSlot5: 0,
  activeSlot6: 0,
  activeSlot7: 10,
  activeSlot8: 20,
  activeSlot9: 30,
  activeSlot10: 40,
  activeSlot11: 60,
  activeSlot12: 80,

  passiveSlot1: 10,
  passiveSlot2: 30,
  passiveSlot3: 50,
  passiveSlot4: 100,
  passiveSlot5: 150,
  passiveSlot6: 200,
};

export const useSpells = (currentCharacter) => {
  const setup = () => {
    watch(masterData, () => {
      Object.keys(currentCharacter.value.spells).forEach((slotKey) => {
        if (currentCharacter.value.spells[slotKey]?.class !== currentCharacter.value.class) {
          currentCharacter.value.spells[slotKey] = null;
        }
      });
    });

    return {};
  };

  const getClassPassiveSpells = (targetClass) => {
    let targetClassEntry = spellData.find((classEntry) => {
      return classEntry.className.toLowerCase() === targetClass;
    });

    let spells = targetClassEntry.spells.filter((spellEntry) => {
      return spellEntry.category === SPELL_CATEGORIES.passive;
    });

    return spells;
  };

  const getClassActiveSpells = (targetClass) => {
    let spells = spellData.filter((spell) => {
      return spell.className === targetClass && spell.category === SPELL_CATEGORIES.active;
    });

    return spells;
  };

  const getSpellData = (spellId, className) => {
    let classEntry = spellData.find((classEntry) => {
      return classEntry.className.toLowerCase() === className;
    });

    let targetSpellData = classEntry.spells.find((spellEntry) => {
      return parseInt(spellEntry.id) === spellId;
    });

    return targetSpellData;
  };

  return {
    setup,
    getClassPassiveSpells,
    getClassActiveSpells,
    getSpellData,
  };
};
