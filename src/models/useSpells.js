import { watch } from 'vue';

import { masterData } from '@/models/useStorage.js';
import { SHARED_PASSIVE_SPELLS } from '@/models/useConstants';

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
        if (currentCharacter.value.spells[slotKey]?.class !== currentCharacter.value.class && currentCharacter.value.spells[slotKey]?.class !== 'all') {
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

    return [...spells, ...SHARED_PASSIVE_SPELLS];
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

    let mergedSpellData = [...classEntry.spells, ...SHARED_PASSIVE_SPELLS];

    let targetSpellData = mergedSpellData.find((spellEntry) => {
      return parseInt(spellEntry.id) === spellId;
    });

    return targetSpellData;
  };

  const getSpellHtml = (spell) => {
    return (spell?.normalEffects['1']?.html || '')
      .replaceAll('<img src="http://staticns.ankama.com/wakfu/portal/game/element/b.png">', '') // wtf even is this?? a bold effect via an image? excuse me?
      .replaceAll('http://staticns.ankama.com/wakfu/portal/game/element', 'https://tmktahu.github.io/WakfuAssets/misc');
  };

  return {
    setup,
    getClassPassiveSpells,
    getClassActiveSpells,
    getSpellData,
    getSpellHtml,
  };
};
