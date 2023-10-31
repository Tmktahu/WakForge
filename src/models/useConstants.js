export const CLASS_CONSTANTS = {
  feca: 'feca',
  osamodas: 'osamodas',
  enutrof: 'enutrof',
  sram: 'sram',
  xelor: 'xelor',
  ecaflip: 'ecaflip',
  eniripsa: 'eniripsa',
  iop: 'iop',
  cra: 'cra',
  sadida: 'sadida',
  sacrier: 'sacrier',
  pandawa: 'pandawa',
  rogue: 'rogue',
  masqueraider: 'masqueraider',
  ouginak: 'ouginak',
  foggernaut: 'foggernaut',
  eliotrope: 'eliotrope',
  huppermage: 'huppermage',
};

export const ITEM_SLOT_DATA = {
  HEAD: { id: 'HEAD', name: 'Helmet', sortOrder: 1 },
  CHEST: { id: 'CHEST', name: 'Breastplace', sortOrder: 2 },
  SHOULDERS: { id: 'SHOULDERS', name: 'Epaulettes', sortOrder: 3 },
  LEGS: { id: 'LEGS', name: 'Boots', sortOrder: 4 },
  NECK: { id: 'NECK', name: 'Amulet', sortOrder: 5 },
  BACK: { id: 'BACK', name: 'Cloak', sortOrder: 6 },
  BELT: { id: 'BELT', name: 'Belt', sortOrder: 7 },
  FIRST_WEAPON: { id: 'FIRST_WEAPON', name: 'Primary Weapon', sortOrder: 8 },
  SECOND_WEAPON: { id: 'SECOND_WEAPON', name: 'Secondary Weapon', sortOrder: 9 },
  LEFT_HAND: { id: 'LEFT_HAND', name: 'Left Ring', sortOrder: 10 },
  RIGHT_HAND: { id: 'RIGHT_HAND', name: 'Right Ring', sortOrder: 11 },
  ACCESSORY: { id: 'ACCESSORY', name: 'Emblem', sortOrder: 12 },
  PET: { id: 'PET', name: 'Pet', sortOrder: 13 },
  MOUNT: { id: 'MOUNT', name: 'Mount', sortOrder: 14 },
};

export const ITEM_SLOT_SORT_ORDER = Object.keys(ITEM_SLOT_DATA)
  .map((key) => {
    return {
      id: ITEM_SLOT_DATA[key].id,
      sortOrder: ITEM_SLOT_DATA[key].sortOrder,
    };
  })
  .sort((entry1, entry2) => {
    return entry1.sortOrder < entry2.sortOrder;
  })
  .map((item) => item.id);

export const ITEM_RARITY_DATA = [
  { id: 0, name: 'Common' },
  { id: 1, name: 'Unusual' },
  { id: 2, name: 'Rare' },
  { id: 3, name: 'Mythical' },
  { id: 4, name: 'Legendary' },
  { id: 5, name: 'Relic' },
  { id: 6, name: 'Souvenir' },
  { id: 7, name: 'Epic' },
];

export const LEVELABLE_ITEMS = [582, 611];

export const ITEM_TYPE_DATA = [
  { id: 'weaponsAndShields', rawId: 100, name: 'Weapons & Shields', validSlots: [] },
  { id: 'twoHandedAxe', rawId: 101, name: 'Axe (Two Handed)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'ring', rawId: 103, name: 'Ring', validSlots: [ITEM_SLOT_DATA.RIGHT_HAND, ITEM_SLOT_DATA.LEFT_HAND] },
  { id: 'consumables', rawId: 106, name: 'Consumables', validSlots: [] },
  { id: 'wand', rawId: 108, name: 'Wand (One Hand)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'sword', rawId: 110, name: 'Sword (One Hand)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'shovel', rawId: 111, name: 'Shovel (Two Handed)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'dagger', rawId: 112, name: 'Dagger (Secondary Weapon)', validSlots: [ITEM_SLOT_DATA.SECOND_WEAPON] },
  { id: 'staff', rawId: 113, name: 'Staff (One Hand)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'hammer', rawId: 114, name: 'Hammer (Two Handed)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'clockHand', rawId: 115, name: 'Clock Hand (One Hand)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'bow', rawId: 117, name: 'Bow (Two Handed)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'armor', rawId: 118, name: 'Armor', validSlots: [] },
  { id: 'boots', rawId: 119, name: 'Boots', validSlots: [ITEM_SLOT_DATA.LEGS] },
  { id: 'amulet', rawId: 120, name: 'Amulet', validSlots: [ITEM_SLOT_DATA.NECK] },
  { id: 'cloak', rawId: 132, name: 'Cloak', validSlots: [ITEM_SLOT_DATA.BACK] },
  { id: 'belt', rawId: 133, name: 'Belt', validSlots: [ITEM_SLOT_DATA.BELT] },
  { id: 'helmet', rawId: 134, name: 'Helmet', validSlots: [ITEM_SLOT_DATA.HEAD] },
  { id: 'breastplate', rawId: 136, name: 'Breastplate', validSlots: [ITEM_SLOT_DATA.CHEST] },
  { id: 'epaulettes', rawId: 138, name: 'Epaulettes', validSlots: [ITEM_SLOT_DATA.SHOULDERS] },
  { id: 'shield', rawId: 189, name: 'Shield (Secondary Weapon)', validSlots: [ITEM_SLOT_DATA.SECOND_WEAPON] },
  { id: 'bag', rawId: 218, name: 'Bag', validSlots: [] },
  { id: 'twoHandedSword', rawId: 223, name: 'Sword (Two Handed)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'resource', rawId: 226, name: 'Resource', validSlots: [] },
  { id: 'twoHandedStaff', rawId: 253, name: 'Staff (Two Handed)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'cards', rawId: 254, name: 'Cards (One Hand)', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  // eslint-disable-next-line quotes
  { id: 'minersHarvests', rawId: 281, name: "Miner's Harvests", validSlots: [] },
  // eslint-disable-next-line quotes
  { id: 'treapperHarvests', rawId: 282, name: "Trapper's Harvests", validSlots: [] },
  { id: 'havenGems', rawId: 294, name: 'Haven Gem', validSlots: [] },
  { id: 'havenBag', rawId: 295, name: 'Haven Bag', validSlots: [] },
  { id: 'displayWindow', rawId: 296, name: 'Display Window', validSlots: [] },
  // skipped 297, 306, 308, 309, 313, 317, 327
  { id: 'miscellaneous', rawId: 385, name: 'Miscellaneous', validSlots: [] },
  // skipped 393, 415, 416, 419, 447, 449, 463, 514, 515
  { id: 'oneHandedWeapons', rawId: 518, name: 'One Handed Weapon', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'twoHandedWeapons', rawId: 519, name: 'Two Handed Weapon', validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'secondHand', rawId: 520, name: 'Second Hand', validSlots: [] },
  { id: 'accessory', rawId: 521, name: 'Accessory', validSlots: [ITEM_SLOT_DATA.ACCESSORY] },
  { id: 'cosmetic', rawId: 525, name: 'Cosmetic', validSlots: [] },
  // skipped 531, 534, 535
  { id: 'tool', rawId: 537, name: 'Tool', validSlots: [] },
  // skipped 546, 551, 566, 567, 568, 569, 570, 571, 574, 575, 576, 577, 578, 602
  { id: 'sets', rawId: 604, name: 'Set', validSlots: [] },
  // skipped 614, 630
  { id: 'emblem', rawId: 646, name: 'Emblem', validSlots: [ITEM_SLOT_DATA.ACCESSORY] },
  // skipped 652, 687, 701, 702
  { id: 'transmutation', rawId: 709, name: 'Transmutation', validSlots: [] },
  // skipped 719
  { id: 'transformation', rawId: 738, name: 'Transformations', validSlots: [] },
  // skipped 739, 745
  { id: 'consumable', rawId: 746, name: 'Consumable', validSlots: [] },
  { id: 'consumable2', rawId: 747, name: 'Consumable', validSlots: [] },
  // skipped 751, 756, 757, 758, 761, 809
  { id: 'enchantement', rawId: 811, name: 'Enchantement', validSlots: [] },
  { id: 'sublimationScroll', rawId: 812, name: 'Sublimation Scroll', validSlots: [] },
  // skipped 822
  // The ones below this point are from equipmentItemTypes.json
  { id: 'torches', rawId: 480, name: 'Torches', validSlots: [] },
  { id: 'pets', rawId: 582, name: 'Pets', validSlots: [ITEM_SLOT_DATA.PET] },
  { id: 'mounts', rawId: 611, name: 'Mounts', validSlots: [ITEM_SLOT_DATA.MOUNT] },
  { id: 'costumes', rawId: 647, name: 'Costumes', validSlots: [] },
];

export const ITEM_TYPE_FILTERS = [
  { id: 'helmet', rawId: 134, name: 'Helmet', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.HEAD] },
  { id: 'amulet', rawId: 120, name: 'Amulet', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.NECK] },
  { id: 'epaulettes', rawId: 138, name: 'Epaulettes', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.SHOULDERS] },
  { id: 'breastplate', rawId: 136, name: 'Breastplate', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.CHEST] },
  { id: 'cloak', rawId: 132, name: 'Cloak', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.BACK] },
  { id: 'belt', rawId: 133, name: 'Belt', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.BELT] },
  { id: 'boots', rawId: 119, name: 'Boots', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.LEGS] },
  { id: 'ring', rawId: 103, name: 'Ring', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.RIGHT_HAND, ITEM_SLOT_DATA.LEFT_HAND] },

  // eslint-disable-next-line prettier/prettier
  { id: 'oneHandedWeapons', rawIds: [108, 110, 113, 115, 254], name: 'One Handed Weapons', category: 'weapons', advanced: false, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  // eslint-disable-next-line prettier/prettier
  { id: 'twoHandedWeapons', rawIds: [223, 101, 253, 114, 117, 111], name: 'Two Handed Weapons', category: 'weapons', advanced: false, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },

  { id: 'wand', rawId: 108, name: 'Wand (One Hand)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'sword', rawId: 110, name: 'Sword (One Hand)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'staff', rawId: 113, name: 'Staff (One Hand)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'clockHand', rawId: 115, name: 'Clock Hand (One Hand)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'cards', rawId: 254, name: 'Cards (One Hand)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },

  { id: 'twoHandedSword', rawId: 223, name: 'Sword (Two Handed)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'twoHandedAxe', rawId: 101, name: 'Axe (Two Handed)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'twoHandedStaff', rawId: 253, name: 'Staff (Two Handed)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'hammer', rawId: 114, name: 'Hammer (Two Handed)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'bow', rawId: 117, name: 'Bow (Two Handed)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'shovel', rawId: 111, name: 'Shovel (Two Handed)', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },

  { id: 'dagger', rawId: 112, name: 'Dagger (Secondary Weapon)', category: 'weapons', advanced: false, validSlots: [ITEM_SLOT_DATA.SECOND_WEAPON] },
  { id: 'shield', rawId: 189, name: 'Shield (Secondary Weapon)', category: 'weapons', advanced: false, validSlots: [ITEM_SLOT_DATA.SECOND_WEAPON] },

  { id: 'emblem', rawId: 646, name: 'Emblem', category: 'miscellaneous', advanced: false, validSlots: [ITEM_SLOT_DATA.ACCESSORY] },
  { id: 'pets', rawId: 582, name: 'Pets', category: 'miscellaneous', advanced: false, validSlots: [ITEM_SLOT_DATA.PET] },
  { id: 'mounts', rawId: 611, name: 'Mounts', category: 'miscellaneous', advanced: false, validSlots: [ITEM_SLOT_DATA.MOUNT] },
  { id: 'tool', rawId: 537, name: 'Tool', category: 'miscellaneous', advanced: true, validSlots: [] },
  { id: 'torches', rawId: 480, name: 'Torches', category: 'miscellaneous', advanced: true, validSlots: [] },
  { id: 'costumes', rawId: 647, name: 'Costumes', category: 'miscellaneous', advanced: true, validSlots: [] },
  { id: 'sublimationScroll', rawId: 812, name: 'Sublimation Scroll', category: 'miscellaneous', advanced: true, validSlots: [] },
  { id: 'enchantement', rawId: 811, name: 'Enchantement', category: 'miscellaneous', advanced: true, validSlots: [] },
];

export const EFFECT_TYPE_DATA = {
  // unsure if this first one is correct
  damageInflicted: {
    id: 'damageInflicted',
    rawId: 1,
    text: '% Damage Inflicted',
  },
  healthPoints: {
    id: 'healthPoints',
    rawId: 20,
    text: 'HP',
  },
  healthPointReduction: {
    id: 'healthPointReduction',
    rawId: 21,
    text: 'HP',
    isNegative: true,
  },
  healthSteal: {
    id: 'healthSteal',
    rawId: 24,
    text: 'Health Steal',
  },
  healingMastery: {
    id: 'healingMastery',
    rawId: 26,
    text: 'Healing Mastery',
  },
  actionPoints: {
    id: 'actionPoints',
    rawId: 31,
    text: 'AP',
  },
  // armorReceived: {
  //   id: 'armorReceived',
  //   rawId: 39,
  //   text: '% Armor Received',
  // },
  armorReceivedReduction: {
    id: 'armorReceivedReduction',
    rawId: 40,
    text: '% Armor Received',
    isNegative: true,
  },
  movementPoints: {
    id: 'movementPoints',
    rawId: 41,
    text: 'MP',
  },
  movementPointsReductionOld: {
    id: 'movementPointsReductionOld',
    rawId: 42,
    text: 'MP (Old)',
    isNegative: true,
  },
  actionPointsReduction: {
    id: 'actionPointsReduction',
    rawId: 56,
    text: 'AP',
    isNegative: true,
  },
  movementPointsReduction: {
    id: 'movementPointsReduction',
    rawId: 57,
    text: 'MP',
    isNegative: true,
  },
  rearResistance: {
    id: 'rearResistance',
    rawId: 71,
    text: 'Rear Resistance',
  },
  elementalResistance: {
    id: 'elementalResistance',
    rawId: 80,
    text: 'Elemental Resistance',
  },
  fireResistance: {
    id: 'fireResistance',
    rawId: 82,
    text: 'Fire Resistance',
  },
  waterResistance: {
    id: 'waterResistance',
    rawId: 83,
    text: 'Water Resistance',
  },
  earthResistance: {
    id: 'earthResistance',
    rawId: 84,
    text: 'Earth Resistance',
  },
  airResistance: {
    id: 'airResistance',
    rawId: 85,
    text: 'Air Resistance',
  },
  elementalResistanceReduction: {
    id: 'elementalResistanceReduction',
    rawId: 90,
    text: 'Elemental Resistance',
    isNegative: true,
  },
  earthResistanceReduction: {
    id: 'earthResistanceReduction',
    rawId: 96,
    text: 'Earth Resistance (without cap)',
    isNegative: true,
  },
  fireResistanceReduction: {
    id: 'fireResistanceReduction',
    rawId: 97,
    text: 'Fire Resistance (without cap)',
    isNegative: true,
  },
  waterResistanceReduction: {
    id: 'waterResistanceReduction',
    rawId: 98,
    text: 'Water Resistance (without cap)',
    isNegative: true,
  },
  elementalResistanceReductionNoCap: {
    id: 'elementalResistanceReduction',
    rawId: 100,
    text: 'Elemental Resistance (without cap)',
    isNegative: true,
  },
  elementalMastery: {
    id: 'elementalMastery',
    rawId: 120,
    text: 'Elemental Mastery',
  },
  fireMastery: {
    id: 'fireMastery',
    rawId: 122,
    text: 'Fire Mastery',
  },
  earthMastery: {
    id: 'earthMastery',
    rawId: 123,
    text: 'Earth Mastery',
  },
  waterMastery: {
    id: 'waterMastery',
    rawId: 124,
    text: 'Water Mastery',
  },
  airMastery: {
    id: 'airMastery',
    rawId: 125,
    text: 'Air Mastery',
  },
  elementalMasteryReduction: {
    id: 'elementalMasteryReduction',
    rawId: 130,
    text: 'Elemental Mastery',
    isNegative: true,
  },
  fireMasteryReduction: {
    id: 'fireMasteryReduction',
    rawId: 132,
    text: 'Fire Mastery',
    isNegative: true,
  },
  criticalMastery: {
    id: 'criticalMastery',
    rawId: 149,
    text: 'Critical Mastery',
  },
  criticalHit: {
    id: 'criticalHit',
    rawId: 150,
    text: '% Critical Hit',
  },
  range: {
    id: 'range',
    rawId: 160,
    text: 'Range',
  },
  rangeReduction: {
    id: 'range',
    rawId: 161,
    text: 'Range',
    isNegative: true,
  },
  prospecting: {
    id: 'prospecting',
    rawId: 162,
    text: 'Prospecting',
  },
  wisdom: {
    id: 'wisdom',
    rawId: 166,
    text: 'Wisdom',
  },
  criticalHitReduction: {
    id: 'criticalHitReduction',
    rawId: 168,
    text: '% Critical Hit',
    isNegative: true,
  },
  initiative: {
    id: 'initiative',
    rawId: 171,
    text: 'Initiative',
  },
  initiativeReduction: {
    id: 'initiativeReduction',
    rawId: 172,
    text: 'Initiative',
    isNegative: true,
  },
  lock: {
    id: 'lock',
    rawId: 173,
    text: 'Lock',
  },
  lockReduction: {
    id: 'lockReduction',
    rawId: 174,
    text: 'Lock',
    isNegative: true,
  },
  dodge: {
    id: 'dodge',
    rawId: 175,
    text: 'Dodge',
  },
  dodgeReduction: {
    id: 'dodgeReduction',
    rawId: 176,
    text: 'Dodge',
    isNegative: true,
  },
  forceOfWill: {
    id: 'forceOfWill',
    rawId: 177,
    text: 'Force of Will',
  },
  rearMastery: {
    id: 'rearMastery',
    rawId: 180,
    text: 'Rear Mastery',
  },
  rearMasteryReduction: {
    id: 'rearMasteryReduction',
    rawId: 181,
    text: 'Rear Mastery',
    isNegative: true,
  },
  control: {
    id: 'control',
    rawId: 184,
    text: 'Control',
  },
  wakfuPoints: {
    id: 'wakfuPoints',
    rawId: 191,
    text: 'Wakfu Points',
  },
  wakfuPointsReduction: {
    id: 'wakfuPointsReduction',
    rawId: 192,
    text: 'Wakfu Points',
    isNegative: true,
  },
  wakfuPointsReduction2: {
    id: 'wakfuPointsReduction2',
    rawId: 194,
    text: 'Wakfu Points',
    isNegative: true,
  },
  appliesEffect: {
    // TODO this one is complicated. figure it out
    id: 'appliesEffect',
    rawId: 304,
    text: 'Applies Effect',
  },
  executesEffects: {
    // TODO this one is complicated. figure it out
    id: 'executesEffects',
    rawId: 330,
    text: 'Executes Effect Group',
  },
  emptyEffect: {
    id: 'emptyEffect',
    rawId: 400,
    text: 'Empty Effect',
  },
  spellLevels: {
    // TODO this one is complicated. figure it out
    id: 'spellLevels',
    rawId: 832,
    text: 'Adds Spell Levels',
  },
  // skipped 843
  // skipped 865
  percentBlock: {
    id: 'percentBlock',
    rawId: 875,
    text: '% Block',
  },
  percentBlockReduction: {
    id: 'percentBlockReduction',
    rawId: 876,
    text: 'Block',
    isNegative: true,
  },
  levelsToElementalSpells: {
    id: 'levelsToElementalSpells',
    rawId: 979,
    text: 'Levels to Elemental Spells',
  },
  criticalResistance: {
    id: 'criticalResistance',
    rawId: 988,
    text: 'Critical Resistance',
  },
  // skipped 1020. only used by the Makabrakfire Ring
  meleeMastery: {
    id: 'meleeMastery',
    rawId: 1052,
    text: 'Melee Mastery',
  },
  distanceMastery: {
    id: 'distanceMastery',
    rawId: 1053,
    text: 'Distance Mastery',
  },
  berserkMastery: {
    id: 'berserkMastery',
    rawId: 1055,
    text: 'Berserk Mastery',
  },
  criticalMasteryReduction: {
    id: 'criticalMasteryReduction',
    rawId: 1056,
    text: 'Critical Mastery',
    isNegative: true,
  },
  meleeMasteryReduction: {
    id: 'meleeMasteryReduction',
    rawId: 1059,
    text: 'Melee Mastery',
    isNegative: true,
  },
  distanceMasteryReduction: {
    id: 'distanceMasteryReduction',
    rawId: 1060,
    text: 'Distance Mastery',
    isNegative: true,
  },
  berserkMasteryReduction: {
    id: 'berserkMasteryReduction',
    rawId: 1061,
    text: 'Berserk Mastery',
    isNegative: true,
  },
  criticalResistanceReduction: {
    id: 'criticalResistanceReduction',
    rawId: 1062,
    text: 'Critical Resistance',
    isNegative: true,
  },
  rearResistanceReduction: {
    id: 'rearResistanceReduction',
    rawId: 1063,
    text: 'Rear Resistance',
    isNegative: true,
  },
  randomElementalMasteries: {
    // TODO figure this one out
    id: 'randomElementalMasteries',
    rawId: 1068,
    text: 'Gain ?? Random Elemental Masteries',
  },
  randomElementalResistances: {
    // TODO figure this one out
    id: 'randomElementalResistances',
    rawId: 1069,
    text: 'Gain ?? Random Elemental Resistances',
  },
  // skipped 1083
  // skipped 1084
  harvestingQuantity: {
    // TODO figure this one out
    id: 'harvestingQuantity',
    rawId: 2001,
    text: 'Harvesting Quantity',
  },
  // ones below this point were picked out manually
  armorGiven: {
    id: 'armorGiven',
    rawId: 10000,
    text: '% Armor Given',
  },
  armorReceived: {
    id: 'armorReceived',
    rawId: 10001,
    text: '% Armor Received',
  },
  healsPerformed: {
    id: 'healsPerformed',
    rawId: 10002,
    text: '% Heals Performed',
  },
  indirectDamageInflicted: {
    id: 'indirectDamageInflicted',
    rawId: 10003,
    text: '% Indirect Damage Inflicted',
  },
  dodgeOverride: {
    id: 'dodgeOverride',
    rawId: 10004,
    text: 'Dodge Override',
  },
  healsReceived: {
    id: 'healsReceived',
    rawId: 10005,
    text: '% Heals Received',
  },
  healthPointsFromLevel: {
    id: 'healthPointsFromLevel',
    rawId: 10006,
    text: 'Health Points from Level',
  },
  lockOverride: {
    id: 'lockOverride',
    rawId: 10007,
    text: 'Lock Override',
  },
  percentHealthPoints: {
    id: 'percentHealthPoints',
    rawId: 10008,
    text: '% Health Points',
  },
  lockDoubled: {
    id: 'lockDoubled',
    rawId: 10009,
    text: 'Lock Doubled',
  },
  dodgeFromLevel: {
    id: 'dodgeFromLevel',
    rawId: 10010,
    text: 'Dodge from Level',
  },
  lockFromLevel: {
    id: 'lockFromLevel',
    rawId: 10011,
    text: 'Lock from Level',
  },
  percentDodge: {
    id: 'percentDodge',
    rawId: 10012,
    text: '% Dodge',
  },
};

export const SHARED_PASSIVE_SPELLS = [
  {
    class: 'all',
    name: 'Evasion',
    description: 'This passive is ideal for getting away from it all!',
    iconId: 4957,
    normalEffects: {
      // eslint-disable-next-line prettier/prettier
      '1': {
        level: '1',
        equipEffects: [
          {
            id: 'dDodge',
            rawId: 175,
            text: 'Dodge',
            value: 60,
          },
        ],
      },
      // eslint-disable-next-line prettier/prettier
      '2': {
        level: '2',
        equipEffects: [
          {
            id: 'dodge',
            rawId: 175,
            text: 'Dodge',
            value: 180,
          },
        ],
      },
    },
    id: 20000,
    category: 'passive',
  },
  {
    class: 'all',
    name: 'Interception',
    // eslint-disable-next-line prettier/prettier
    description: 'Hey, where do you think you\'re going? You\'re staying right there!',
    iconId: 4958,
    normalEffects: {
      // eslint-disable-next-line prettier/prettier
      '1': {
        level: '1',
        equipEffects: [
          {
            id: 'lock',
            rawId: 173,
            text: 'Lock',
            value: 60,
          },
        ],
      },
      // eslint-disable-next-line prettier/prettier
      '2': {
        level: '2',
        equipEffects: [
          {
            id: 'lock',
            rawId: 173,
            text: 'Lock',
            value: 180,
          },
        ],
      },
    },
    id: 20001,
    category: 'passive',
  },
  {
    class: 'all',
    name: 'Inhalation',
    description: 'A deep breath, a cold drink, and... to battle!',
    iconId: 4956,
    normalEffects: {
      // eslint-disable-next-line prettier/prettier
      '1': {
        level: '1',
        equipEffects: [
          {
            id: 'initiative',
            rawId: 171,
            text: 'Initiative',
            value: 60,
          },
        ],
      },
      // eslint-disable-next-line prettier/prettier
      '2': {
        level: '2',
        equipEffects: [
          {
            id: 'initiative',
            rawId: 171,
            text: 'Initiative',
            value: 120,
          },
        ],
      },
    },
    id: 20002,
    category: 'passive',
  },
  {
    class: 'all',
    name: 'Motivation',
    // eslint-disable-next-line prettier/prettier
    description: 'It\s easy to be one step ahead of your enemies if you are Motivated.',
    iconId: 5237,
    normalEffects: {
      // eslint-disable-next-line prettier/prettier
      '1': {
        level: '1',
        equipEffects: [
          {
            id: 'actionPoints',
            rawId: 31,
            text: 'AP',
            value: 1,
          },
          {
            id: 'damageInflicted',
            rawId: 1,
            text: '% Damage Inflicted',
            value: 20,
            isNegative: true,
          },
        ],
      },
      // eslint-disable-next-line prettier/prettier
      '2': {
        level: '2',
        equipEffects: [
          {
            id: 'actionPoints',
            rawId: 1,
            text: 'AP',
            value: 1,
          },
          {
            id: 'damageInflicted',
            rawId: 1,
            text: '% Damage Inflicted',
            value: 20,
            isNegative: true,
          },
          {
            id: 'forceOfWill',
            rawId: 177,
            text: 'Force of Will',
            value: 10,
          },
        ],
      },
    },
    id: 20003,
    category: 'passive',
  },
  {
    class: 'all',
    name: 'Medicine',
    description: 'Need a healer in your team? Here I am!',
    iconId: 5146,
    normalEffects: {
      // eslint-disable-next-line prettier/prettier
      '1': {
        level: '1',
        equipEffects: [
          {
            id: 'healsPerformed',
            rawId: 10002,
            text: '% Heals Performed',
            value: 25,
          },
          {
            id: 'armorGiven',
            rawId: 10000,
            text: '% Armor Given',
            value: 20,
          },
          {
            id: 'damageInflicted',
            rawId: 1,
            text: '% Damage Inflicted',
            value: 15,
            isNegative: true,
          },
        ],
      },
      // eslint-disable-next-line prettier/prettier
      '2': {
        level: '2',
        equipEffects: [
          {
            id: 'healsPerformed',
            rawId: 10002,
            text: '% Heals Performed',
            value: 30,
          },
          {
            id: 'armorGiven',
            rawId: 10000,
            text: '% Armor Given',
            value: 25,
          },
          {
            id: 'damageInflicted',
            rawId: 1,
            text: '% Damage Inflicted',
            value: 15,
            isNegative: true,
          },
        ],
      },
    },
    id: 20004,
    category: 'passive',
  },
  {
    class: 'all',
    name: 'Rock',
    description: 'Solid as a rock, let me take that damage for you!',
    iconId: 5145,
    normalEffects: {
      // eslint-disable-next-line prettier/prettier
      '1': {
        level: '1',
        equipEffects: [
          {
            id: 'percentHealthPoints',
            rawId: 10008,
            text: '% Health Points',
            value: 30,
          },
          {
            id: 'healsReceived',
            rawId: 10005,
            text: '% Heals Received',
            value: 20,
          },
          {
            id: 'damageInflicted',
            rawId: 1,
            text: '% Damage Inflicted',
            value: 25,
            isNegative: true,
          },
          {
            id: 'healsPerformed',
            rawId: 10002,
            text: '% Heals Performed',
            value: 50,
            isNegative: true,
          },
        ],
      },
      // eslint-disable-next-line prettier/prettier
      '2': {
        level: '2',
        equipEffects: [
          {
            id: 'percentHealthPoints',
            rawId: 10008,
            text: '% Health Points',
            value: 60,
          },
          {
            id: 'healsReceived',
            rawId: 10005,
            text: '% Heals Received',
            value: 25,
          },
          {
            id: 'damageInflicted',
            rawId: 1,
            text: '% Damage Inflicted',
            value: 25,
            isNegative: true,
          },
          {
            id: 'healsPerformed',
            rawId: 10002,
            text: '% Heals Performed',
            value: 50,
            isNegative: true,
          },
        ],
      },
    },
    id: 20005,
    category: 'passive',
  },
  {
    class: 'all',
    name: 'Carnage',
    description: 'Want to know the secret ingredient in carnage rolls, extra damage!',
    iconId: 5144,
    normalEffects: {
      // eslint-disable-next-line prettier/prettier
      '1': {
        level: '1',
        equipEffects: [
          {
            id: 'damageInflicted',
            rawId: 1,
            text: '% Damage Inflicted',
            value: 10,
          },
          {
            id: 'healsPerformed',
            rawId: 10002,
            text: '% Heals Performed',
            value: 30,
            isNegative: true,
          },
        ],
      },
      // eslint-disable-next-line prettier/prettier
      '2': {
        level: '2',
        equipEffects: [
          {
            id: 'damageInflicted',
            rawId: 1,
            text: '% Damage Inflicted',
            value: 15,
          },
          {
            id: 'healsPerformed',
            rawId: 10002,
            text: '% Heals Performed',
            value: 30,
            isNegative: true,
          },
        ],
      },
    },
    id: 20006,
    category: 'passive',
  },
  {
    class: 'all',
    name: 'Fluctuation',
    description:
      'Fluctuation increases the damages of the next spell cast on this target by whoever placed this state. Fluctuation is consumed in the process.',
    iconId: 5621,
    normalEffects: {},
    id: 20007,
    category: 'passive',
  },
];

export const PASSIVE_SPELL_LEVEL_MAP = {
  20000: 105, // Evasion
  20001: 115, // Interception
  20002: 125, // Inhalation
  20003: 135, // Motivation
  20004: 155, // Medicine
  20005: 165, // Rock
  20006: 175, // Carnage
  20007: 185, // Fluctuation
  5122: 0, // Sram Ambush
  5123: 0, // Sram Bloody Blade
  4606: 0, // Sram Brutal Assault
  5089: 0, // Sram Crazy Scheme
  5126: 0, // Sram Dupery
  5124: 0, // Sram Fraud
  4608: 0, // Sram Murderer
  4607: 0, // Sram Shadow Master
  4610: 0, // Sram Sram to the Bone
  4609: 0, // Sram Trap Master
  4797: 0, // Iop Authority
  5100: 0, // Iop Bravery
  4796: 0, // Iop Compulsion
  5101: 0, // Iop Furious Charge
  5102: 0, // Iop King of the Hill
  4799: 0, // Iop Locking Pro
  5104: 0, // Iop Seismic Rift
  4798: 0, // Iop Show Off
  5103: 0, // Iop Tormentor
  4795: 0, // Iop Virility
  916: 0, // Sadida Doll Link
  933: 0, // Sadida Explodoll
  913: 0, // Sadida Green Guard
  5055: 0, // Sadida Harmless Toxin
  917: 0, // Sadida Knowledge of Dolls
  912: 0, // Sadida Lone Sadida
  4959: 0, // Sadida Sadida Prayer
  5234: 0, // Sadida Venomous
  5058: 0, // Sadida Wild Whispers
  4725: 0, // Pandawa Aggressive Barrel
  5148: 0, // Pandawa Bambottle
  4724: 0, // Pandawa Bottomless Barrel
  6846: 0, // Pandawa Buzzed
  4722: 0, // Pandawa Cocktail
  4723: 0, // Pandawa Master of Merriment
  4726: 0, // Pandawa Milky Instinct
  5151: 0, // Pandawa Pandemic
  5149: 0, // Pandawa Poisoned Chalice
  5150: 0, // Pandawa Refreshment
};
