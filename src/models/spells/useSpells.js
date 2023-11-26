import { watch } from 'vue';
import { marked } from 'marked';
import { useI18n } from 'vue-i18n';

import { SHARED_PASSIVE_SPELLS, PASSIVE_SPELL_LEVEL_MAP } from '@/models/useConstants';

import spellData from './spell_data.json';
import { assembleSpellTooltipData } from './spellTooltipDefs';
let localT = null;

export const SPELL_CATEGORIES = {
  passive: 'passive',
  active: 'active',
  elemental: 'elemental',
};

export const useSpells = (currentCharacter) => {
  const setup = () => {
    const { t } = useI18n();
    localT = t;

    watch(
      () => currentCharacter.value?.class,
      () => {
        if (currentCharacter.value?.spells) {
          Object.keys(currentCharacter.value.spells).forEach((slotKey) => {
            if (currentCharacter.value.spells[slotKey]?.class !== currentCharacter.value.class && currentCharacter.value.spells[slotKey]?.class !== 'all') {
              currentCharacter.value.spells[slotKey] = null;
            }
          });
        }
      }
    );

    return {};
  };

  const getClassPassiveSpells = (targetClass) => {
    if (targetClass === 'all') {
      return SHARED_PASSIVE_SPELLS;
    } else if (targetClass) {
      let targetClassEntry = spellData.find((classEntry) => {
        return classEntry.className.toLowerCase() === targetClass;
      });

      let spells = targetClassEntry.spells.filter((spellEntry) => {
        return spellEntry.category === SPELL_CATEGORIES.passive;
      });

      return spells;
    } else {
      return [];
    }
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

  const getSpellLevel = (spell) => {
    if (spell.category === SPELL_CATEGORIES.passive) {
      let levelCheckpoint = PASSIVE_SPELL_LEVEL_MAP[spell.id];
      if (currentCharacter.value.level >= levelCheckpoint) {
        return 2;
      } else {
        return 1;
      }
    } else {
      return currentCharacter.value.level;
    }
  };

  const getSpellHtml = (spell) => {
    let tooltipData = assembleSpellTooltipData(localT);

    let tooltipDataEntry = tooltipData[spell.id];

    if (tooltipDataEntry) {
      let markdown = tooltipDataEntry.markdown;

      if (tooltipDataEntry.value1) {
        markdown = markdown.replaceAll('{value1}', tooltipDataEntry.value1(getSpellLevel(spell)));
      }

      if (tooltipDataEntry.value2) {
        markdown = markdown.replaceAll('{value2}', tooltipDataEntry.value2(getSpellLevel(spell)));
      }

      if (tooltipDataEntry.value3) {
        markdown = markdown.replaceAll('{value3}', tooltipDataEntry.value3(getSpellLevel(spell)));
      }

      if (tooltipDataEntry.img1) {
        markdown = markdown.replaceAll('{img1}', `![](https://tmktahu.github.io/WakfuAssets/misc/${tooltipDataEntry.img1})`);
      }

      let html = marked.parse(markdown, { breaks: true });
      return html;
    } else {
      let spellLevel = getSpellLevel(spell);
      return (spell?.normalEffects[spellLevel]?.html || '')
        .replaceAll('<img src="http://staticns.ankama.com/wakfu/portal/game/element/b.png">', '') // wtf even is this?? a bold effect via an image? excuse me?
        .replaceAll('http://staticns.ankama.com/wakfu/portal/game/element', 'https://tmktahu.github.io/WakfuAssets/misc');
    }
  };

  const getSpellById = (spellId) => {
    let possibleSpell = null;
    spellData.some((classEntry) => {
      classEntry.spells.some((spell) => {
        if (spell.id === spellId) {
          possibleSpell = spell;
          return true;
        }
      });
      return possibleSpell !== null;
    });

    return possibleSpell;
  };

  return {
    setup,
    getClassPassiveSpells,
    getClassActiveSpells,
    getSpellData,
    getSpellHtml,
    getSpellLevel,
    getSpellById,
  };
};
