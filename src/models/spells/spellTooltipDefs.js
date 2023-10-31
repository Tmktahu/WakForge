export const SPELL_TOOLTIP_DATA = {
  // Evasion
  20000: {
    // The ID of the spell (this one is Evasion)
    // The markdown field is literally markdown. This is the least code-like I could get to
    markdown: '+{value1} Dodge\n\nAfter dodging (with loss):\n- +{value2} Dodge (3 turns)',
    value1: (level) => 60 + (level === 2 ? 120 : 0), // the values here get sloted into their placeholders. value1 => {value1}
    value2: (level) => 20 + (level === 2 ? 40 : 0), // they are functions that take the spell level as a parameter, so we can calc the value live
  },
  // Interception
  20001: {
    markdown: '+{value1} Lock\n\nAfter locking a {img1}:\n- +{value2} Lock (3 turns)',
    value1: (level) => 60 + (level === 2 ? 120 : 0),
    value2: (level) => 60 + (level === 2 ? 120 : 0),
    img1: 'fighter.png',
  },
  // Inhalation
  20002: {
    markdown: '+{value1} Initiative\n\n+{value2}% Damage inflicted to {img1} with more Initiative',
    value1: (level) => 60 * level,
    value2: (level) => 5 * level,
    img1: 'fighter.png',
  },
  // Motivation
  20003: {
    markdown: '+1 AP\n\n-20% Damage Inflicted\n\n{value1}',
    value1: (level) => (level === 2 ? '+10 Force of Will' : ''),
  },
  // Medicine
  20004: {
    markdown: '+{value1}% Heals Performed\n\n+{value2} Armor Given\n\n -15% Damage Inflicted',
    value1: (level) => 20 + level * 5,
    value2: (level) => 15 + level * 5,
  },
  // Rock
  20005: {
    markdown: '+{value1}% Health Points\n\n+{value2}% Heals Received\n\n-25% Damage Inflicted\n\n-50% Heals Performed',
    value1: (level) => 30 * level,
    value2: (level) => 15 + 5 * level,
  },
  // Carnage
  20006: {
    markdown: '+{value1}% Damage Inflicted\n\n+10% Damage Inflicted to {img1} with Armor\n\n-30% Heals Performed',
    value1: (level) => 5 + 5 * level,
    img1: 'fighter.png',
  },
  // Fluctuation
  20007: {
    markdown:
      'When you dodge a {img1}:\n\n- With losses: {img1} Fluctuation (+{value1} lvl)\n- Without loss: {img1} Fluctuation (+{value2} lvl)\n\nWhen you lock a {img1}:\n\n- {img1} Fluctuation (+{value2} lvl)\n\nTo {img1} ending their turn upon contact with you:\n\n- {img1} Fluctuation (+{value3} lvl)',
    value1: (level) => 4 + 3 * level,
    value2: (level) => 5 + 5 * level,
    value3: (level) => 4 + 8 * level,
    img1: 'fighter.png',
  },
};
