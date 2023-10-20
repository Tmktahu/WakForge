import spellData from './spell_data.json';

export const useSpells = () => {
  const getClassSpells = (targetClass) => {
    let spells = spellData.filter((spell) => {
      return spell.class === targetClass;
    });

    return spells;
  };

  return {
    getClassSpells,
  };
};
