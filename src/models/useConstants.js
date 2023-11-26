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

export const ELEMENT_TYPE_ENUM = {
  empty: 0,
  fire: 1,
  earth: 2,
  water: 4,
  air: 8,
};

export const RUNE_TYPES = {
  meleeMastery: 27097,
  distanceMastery: 27098,
  berserkMastery: 27099,
  earthResistance: 27107,
  criticalMastery: 27100,
  rearMastery: 27101,
  dodge: 27103,
  initiative: 27104,
  fireResistance: 27105,
  elementalMastery: 27094,
  lock: 27102,
  waterResistance: 27106,
  airResistance: 27108,
  healthPoints: 27109,
  healingMastery: 27110,
};

// for these values, in reality a lot of them have a 0.5 in the game math. but, they are rounded down before being used for anything.
// so leaving out the 0.5 is equivalent and code-cleaner
export const RUNE_LEVEL_REQUIREMENTS = [0, 36, 51, 66, 81, 96, 126, 141, 171, 186, 216];
export const RUNE_MASTERY_LEVEL_VALUES = [1, 3, 4, 6, 7, 10, 15, 19, 24, 30, 33];
export const RUNE_RESISTANCE_LEVEL_VALUES = [2, 5, 7, 10, 12, 15, 17, 20, 22, 25, 27, 30];
export const RUNE_DODGE_LOCK_LEVEL_VALUES = [3, 6, 9, 12, 15, 21, 30, 39, 48, 60, 66];
export const RUNE_ELEMENTAL_MASTERY_LEVEL_VALUES = [1, 2, 3, 4, 5, 7, 10, 13, 16, 20, 22];
export const RUNE_INITIATIVE_LEVEL_VALUES = [2, 4, 6, 8, 10, 14, 20, 26, 32, 40, 44];
export const RUNE_HEALTH_LEVEL_VALUES = [4, 8, 12, 16, 20, 28, 40, 52, 64, 80, 88];

export const ITEM_SLOT_DATA = {
  HEAD: { id: 'HEAD', rawId: 0, name: 'constants.helmet', sortOrder: 1 },
  CHEST: { id: 'CHEST', rawId: 5, name: 'constants.breastplate', sortOrder: 2 },
  SHOULDERS: { id: 'SHOULDERS', rawId: 3, name: 'constants.epaulettes', sortOrder: 3 },
  LEGS: { id: 'LEGS', rawId: 12, name: 'constants.boots', sortOrder: 4 },
  NECK: { id: 'NECK', rawId: 4, name: 'constants.amulet', sortOrder: 5 },
  BACK: { id: 'BACK', rawId: 13, name: 'constants.cloak', sortOrder: 6 },
  BELT: { id: 'BELT', rawId: 10, name: 'constants.belt', sortOrder: 7 },
  FIRST_WEAPON: { id: 'FIRST_WEAPON', rawId: 15, name: 'constants.primaryWeapon', sortOrder: 8 },
  SECOND_WEAPON: { id: 'SECOND_WEAPON', name: 'constants.secondaryWeapon', sortOrder: 9 },
  LEFT_HAND: { id: 'LEFT_HAND', rawId: 7, name: 'constants.leftRing', sortOrder: 10 },
  RIGHT_HAND: { id: 'RIGHT_HAND', rawId: 8, name: 'constants.rightRing', sortOrder: 11 },
  ACCESSORY: { id: 'ACCESSORY', name: 'constants.emblem', sortOrder: 12 },
  PET: { id: 'PET', name: 'constants.pet', sortOrder: 13 },
  MOUNT: { id: 'MOUNT', name: 'constants.mount', sortOrder: 14 },
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
  { id: 0, name: 'constants.common' },
  { id: 1, name: 'constants.unusual' },
  { id: 2, name: 'constants.rare' },
  { id: 3, name: 'constants.mythical' },
  { id: 4, name: 'constants.legendary' },
  { id: 5, name: 'constants.relic' },
  { id: 6, name: 'constants.souvenir' },
  { id: 7, name: 'constants.epic' },
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
  { id: 'helmet', rawId: 134, name: 'constants.helmet', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.HEAD] },
  { id: 'amulet', rawId: 120, name: 'constants.amulet', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.NECK] },
  { id: 'epaulettes', rawId: 138, name: 'constants.epaulettes', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.SHOULDERS] },
  { id: 'breastplate', rawId: 136, name: 'constants.breastplate', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.CHEST] },
  { id: 'cloak', rawId: 132, name: 'constants.cloak', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.BACK] },
  { id: 'belt', rawId: 133, name: 'constants.belt', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.BELT] },
  { id: 'boots', rawId: 119, name: 'constants.boots', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.LEGS] },
  { id: 'ring', rawId: 103, name: 'constants.ring', category: 'armor', advanced: false, validSlots: [ITEM_SLOT_DATA.RIGHT_HAND, ITEM_SLOT_DATA.LEFT_HAND] },

  // eslint-disable-next-line prettier/prettier
  { id: 'oneHandedWeapons', rawIds: [108, 110, 113, 115, 254], name: 'constants.oneHandedWeapons', category: 'weapons', advanced: false, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  // eslint-disable-next-line prettier/prettier
  { id: 'twoHandedWeapons', rawIds: [223, 101, 253, 114, 117, 111], name: 'constants.twoHandedWeapons', category: 'weapons', advanced: false, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },

  { id: 'wand', rawId: 108, name: 'constants.wandOneHand', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'sword', rawId: 110, name: 'constants.swordOneHand', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'staff', rawId: 113, name: 'constants.staffOneHand', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'clockHand', rawId: 115, name: 'constants.clockHandOneHand', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'cards', rawId: 254, name: 'constants.cardsOneHand', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },

  { id: 'twoHandedSword', rawId: 223, name: 'constants.swordTwoHanded', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'twoHandedAxe', rawId: 101, name: 'constants.axeTwoHanded', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'twoHandedStaff', rawId: 253, name: 'constants.staffTwoHanded', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'hammer', rawId: 114, name: 'constants.hammerTwoHanded', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'bow', rawId: 117, name: 'constants.bowTwoHanded', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },
  { id: 'shovel', rawId: 111, name: 'constants.shovelTwoHanded', category: 'weapons', advanced: true, validSlots: [ITEM_SLOT_DATA.FIRST_WEAPON] },

  { id: 'dagger', rawId: 112, name: 'constants.daggerSecondaryWeapon', category: 'weapons', advanced: false, validSlots: [ITEM_SLOT_DATA.SECOND_WEAPON] },
  { id: 'shield', rawId: 189, name: 'constants.shieldSecondaryWeapon', category: 'weapons', advanced: false, validSlots: [ITEM_SLOT_DATA.SECOND_WEAPON] },

  { id: 'emblem', rawId: 646, name: 'constants.emblem', category: 'miscellaneous', advanced: false, validSlots: [ITEM_SLOT_DATA.ACCESSORY] },
  { id: 'pets', rawId: 582, name: 'constants.pets', category: 'miscellaneous', advanced: false, validSlots: [ITEM_SLOT_DATA.PET] },
  { id: 'mounts', rawId: 611, name: 'constants.mounts', category: 'miscellaneous', advanced: false, validSlots: [ITEM_SLOT_DATA.MOUNT] },
  { id: 'tool', rawId: 537, name: 'constants.tool', category: 'miscellaneous', advanced: true, validSlots: [] },
  { id: 'torches', rawId: 480, name: 'constants.torches', category: 'miscellaneous', advanced: true, validSlots: [] },
  { id: 'costumes', rawId: 647, name: 'constants.costumes', category: 'miscellaneous', advanced: true, validSlots: [] },
  // { id: 'sublimationScroll', rawId: 812, name: 'constants.sublimationScroll', category: 'miscellaneous', advanced: true, validSlots: [] },
  // { id: 'enchantement', rawId: 811, name: 'constants.enchantment', category: 'miscellaneous', advanced: true, validSlots: [] },
];

export const EFFECT_TYPE_DATA = {
  // unsure if this first one is correct
  damageInflicted: { id: 'damageInflicted', rawIds: [1], text: 'constants.percentDamageInflicted' },
  healthPoints: { id: 'healthPoints', rawIds: [20, 21], text: 'constants.hp' },
  // healthPointReduction: { id: 'healthPointReduction', rawId: 21, text: 'HP', isNegative: true },
  healthSteal: { id: 'healthSteal', rawIds: [24], text: 'constants.healthSteal' },
  healingMastery: { id: 'healingMastery', rawIds: [26], text: 'constants.healingMastery' },
  actionPoints: { id: 'actionPoints', rawIds: [31, 56], text: 'constants.ap' },
  // armorReceived: { id: 'armorReceived', rawId: 39, text: '% Armor Received' },
  // armorReceivedReduction: { id: 'armorReceivedReduction', rawId: 40, text: '% Armor Received', isNegative: true },
  movementPoints: { id: 'movementPoints', rawIds: [41, 42, 57], text: 'constants.mp' },
  // movementPointsReductionOld: { id: 'movementPointsReductionOld', rawId: 42, text: 'MP (Old)', isNegative: true },
  // actionPointsReduction: { id: 'actionPointsReduction', rawId: 56, text: 'AP', isNegative: true },
  // movementPointsReduction: { id: 'movementPointsReduction', rawId: 57, text: 'MP', isNegative: true },
  rearResistance: { id: 'rearResistance', rawIds: [71, 1063], text: 'constants.rearResistance' },
  elementalResistance: { id: 'elementalResistance', rawIds: [80, 90], text: 'constants.elementalResistance' },
  fireResistance: { id: 'fireResistance', rawIds: [82, 97], text: 'constants.fireResistance' },
  waterResistance: { id: 'waterResistance', rawIds: [83, 98], text: 'constants.waterResistance' },
  earthResistance: { id: 'earthResistance', rawIds: [84, 96], text: 'constants.earthResistance' },
  airResistance: { id: 'airResistance', rawIds: [85], text: 'constants.airResistance' },
  // elementalResistanceReduction: { id: 'elementalResistanceReduction', rawId: 90, text: 'Elemental Resistance', isNegative: true },
  // earthResistanceReduction: { id: 'earthResistanceReduction', rawId: 96, text: 'Earth Resistance (without cap)', isNegative: true },
  // fireResistanceReduction: { id: 'fireResistanceReduction', rawId: 97, text: 'Fire Resistance (without cap)', isNegative: true },
  // waterResistanceReduction: { id: 'waterResistanceReduction', rawId: 98, text: 'Water Resistance (without cap)', isNegative: true },
  elementalResistanceReductionNoCap: { id: 'elementalResistanceReduction', rawIds: [100], text: 'Elemental Resistance (without cap)', isNegative: true },
  elementalMastery: { id: 'elementalMastery', rawIds: [120, 130], text: 'constants.elementalMastery' },
  fireMastery: { id: 'fireMastery', rawIds: [122, 132], text: 'constants.fireMastery' },
  earthMastery: { id: 'earthMastery', rawIds: [123], text: 'constants.earthMastery' },
  waterMastery: { id: 'waterMastery', rawIds: [124], text: 'constants.waterMastery' },
  airMastery: { id: 'airMastery', rawIds: [125], text: 'constants.airMastery' },
  // elementalMasteryReduction: { id: 'elementalMasteryReduction', rawId: 130, text: 'Elemental Mastery', isNegative: true },
  // fireMasteryReduction: { id: 'fireMasteryReduction', rawId: 132, text: 'Fire Mastery', isNegative: true },
  criticalMastery: { id: 'criticalMastery', rawIds: [149, 1056], text: 'constants.criticalMastery' },
  criticalHit: { id: 'criticalHit', rawIds: [150, 168], text: 'constants.percentCriticalHit' },
  range: { id: 'range', rawIds: [160, 161], text: 'constants.range' },
  // rangeReduction: { id: 'range', rawId: 161, text: 'Range', isNegative: true },
  prospecting: { id: 'prospecting', rawIds: [162], text: 'constants.prospecting' },
  wisdom: { id: 'wisdom', rawIds: [166], text: 'constants.wisdom' },
  // criticalHitReduction: { id: 'criticalHitReduction', rawId: 168, text: '% Critical Hit', isNegative: true },
  initiative: { id: 'initiative', rawIds: [171, 172], text: 'constants.initiative' },
  // initiativeReduction: { id: 'initiativeReduction', rawId: 172, text: 'Initiative', isNegative: true },
  lock: { id: 'lock', rawIds: [173, 174], text: 'constants.lock' },
  // lockReduction: { id: 'lockReduction', rawId: 174, text: 'Lock', isNegative: true },
  dodge: { id: 'dodge', rawIds: [175, 176], text: 'constants.dodge' },
  // dodgeReduction: { id: 'dodgeReduction', rawId: 176, text: 'Dodge', isNegative: true },
  forceOfWill: { id: 'forceOfWill', rawIds: [177], text: 'constants.forceOfWill' },
  rearMastery: { id: 'rearMastery', rawIds: [180, 181], text: 'constants.rearMastery' },
  // rearMasteryReduction: { id: 'rearMasteryReduction', rawId: 181, text: 'Rear Mastery', isNegative: true },
  control: { id: 'control', rawIds: [184], text: 'constants.control' },
  wakfuPoints: { id: 'wakfuPoints', rawIds: [191, 192, 194], text: 'constants.wp' },
  // wakfuPointsReduction: { id: 'wakfuPointsReduction', rawId: 192, text: 'Wakfu Points', isNegative: true },
  // wakfuPointsReduction2: { id: 'wakfuPointsReduction2', rawId: 194, text: 'Wakfu Points', isNegative: true },
  appliesEffect: { id: 'appliesEffect', rawIds: [304], text: 'Applies Effect' }, // TODO this one is complicated. figure it out
  executesEffects: { id: 'executesEffects', rawIds: [330], text: 'Executes Effect Group' }, // TODO this one is complicated. figure it out
  emptyEffect: { id: 'emptyEffect', rawIds: [400], text: 'Empty Effect' },
  spellLevels: { id: 'spellLevels', rawIds: [832], text: 'Adds Spell Levels' }, // TODO this one is complicated. figure it out
  // skipped 843
  // skipped 865
  percentBlock: { id: 'percentBlock', rawIds: [875, 876], text: 'constants.percentBlock' },
  // percentBlockReduction: { id: 'percentBlockReduction', rawId: 876, text: 'Block', isNegative: true },
  levelsToElementalSpells: { id: 'levelsToElementalSpells', rawIds: [979], text: 'Levels to Elemental Spells' },
  criticalResistance: { id: 'criticalResistance', rawIds: [988, 1062], text: 'constants.criticalResistance' },
  // skipped 1020. only used by the Makabrakfire Ring
  meleeMastery: { id: 'meleeMastery', rawIds: [1052, 1059], text: 'constants.meleeMastery' },
  distanceMastery: { id: 'distanceMastery', rawIds: [1053, 1060], text: 'constants.distanceMastery' },
  berserkMastery: { id: 'berserkMastery', rawIds: [1055, 1061], text: 'constants.berserkMastery' },
  // criticalMasteryReduction: { id: 'criticalMasteryReduction', rawId: 1056, text: 'Critical Mastery', isNegative: true },
  // meleeMasteryReduction: { id: 'meleeMasteryReduction', rawId: 1059, text: 'Melee Mastery', isNegative: true },
  // distanceMasteryReduction: { id: 'distanceMasteryReduction', rawId: 1060, text: 'Distance Mastery', isNegative: true },
  // berserkMasteryReduction: { id: 'berserkMasteryReduction', rawId: 1061, text: 'Berserk Mastery', isNegative: true },
  // criticalResistanceReduction: { id: 'criticalResistanceReduction', rawId: 1062, text: 'Critical Resistance', isNegative: true },
  // rearResistanceReduction: { id: 'rearResistanceReduction', rawId: 1063, text: 'Rear Resistance', isNegative: true },
  randomElementalMasteries: { id: 'randomElementalMasteries', rawIds: [1068], text: 'constants.randElemMastery' },
  randomElementalResistances: { id: 'randomElementalResistances', rawIds: [1069], text: 'constants.randElemResistances' },
  // skipped 1083
  // skipped 1084
  harvestingQuantity: { id: 'harvestingQuantity', rawIds: [2001], text: 'constants.harvestingQuantity' }, // TODO figure this one out

  // ones below this point were picked out manually
  armorGiven: { id: 'armorGiven', rawIds: [10000], text: 'constants.percentArmorGiven' },
  armorReceived: { id: 'armorReceived', rawIds: [10001], text: 'constants.percentArmorReceived' },
  healsPerformed: { id: 'healsPerformed', rawIds: [10002], text: 'constants.percentHealsPerformed' },
  indirectDamageInflicted: { id: 'indirectDamageInflicted', rawIds: [10003], text: 'constants.percentIndirectDamageInflicted' },
  dodgeOverride: { id: 'dodgeOverride', rawIds: [10004], text: 'constants.dodgeOverride' },
  healsReceived: { id: 'healsReceived', rawIds: [10005], text: 'constants.percentHealsReceived' },
  healthPointsFromLevel: { id: 'healthPointsFromLevel', rawIds: [10006], text: 'constants.healthFromLevel' },
  lockOverride: { id: 'lockOverride', rawIds: [10007], text: 'constants.lockOverride' },
  percentHealthPoints: { id: 'percentHealthPoints', rawIds: [10008], text: 'constants.percentHealthPoints' },
  lockDoubled: { id: 'lockDoubled', rawIds: [10009], text: 'constants.lockDoubled' },
  dodgeFromLevel: { id: 'dodgeFromLevel', rawIds: [10010], text: 'constants.dodgeFromLevel' },
  lockFromLevel: { id: 'lockFromLevel', rawIds: [10011], text: 'constants.lockFromLevel' },
  percentDodge: { id: 'percentDodge', rawIds: [10012], text: 'constants.percentDodge' },
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
            id: 'Dodge',
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

export const ACTIVE_SPELL_SLOT_UNLOCK_LEVELS = [0, 0, 0, 0, 0, 10, 20, 30, 40, 50, 60, 80];
export const PASSIVE_SPELL_SLOT_UNLOCK_LEVELS = [10, 30, 50, 100, 150, 200];

export const PASSIVE_SPELL_LEVEL_MAP = {
  20000: 105, // Evasion
  20001: 115, // Interception
  20002: 125, // Inhalation
  20003: 135, // Motivation
  20004: 155, // Medicine
  20005: 165, // Rock
  20006: 175, // Carnage
  20007: 185, // Fluctuation
  4608: 110, // Sram Murderer
  5123: 120, // Sram Bloody Blade
  4606: 130, // Sram Brutal Assault
  4607: 140, // Sram Shadow Master
  4609: 150, // Sram Trap Master
  5089: 160, // Sram Crazy Scheme
  5122: 170, // Sram Ambush
  5124: 180, // Sram Fraud
  5126: 190, // Sram Dupery
  4610: 200, // Sram Sram to the Bone
  4795: 110, // Iop Virility
  4797: 120, // Iop Authority
  4798: 130, // Iop Show Off
  4799: 140, // Iop Locking Pro
  5102: 150, // Iop King of the Hill
  4796: 160, // Iop Compulsion
  5101: 170, // Iop Furious Charge
  5104: 180, // Iop Seismic Rift
  5100: 190, // Iop Bravery
  5103: 200, // Iop Tormentor
  917: 110, // Sadida Knowledge of Dolls
  4959: 120, // Sadida Sadida Prayer
  916: 130, // Sadida Doll Link
  913: 140, // Sadida Green Guard
  933: 150, // Sadida Explodoll
  5055: 160, // Sadida Harmless Toxin
  912: 170, // Sadida Lone Sadida
  5058: 180, // Sadida Wild Whispers
  5234: 190, // Sadida Venomous
  7053: 200, // Sadida Common Ground
  4722: 110, // Pandawa Cocktail
  4723: 120, // Pandawa Master of Merriment
  4724: 130, // Pandawa Bottomless Barrel
  4725: 140, // Pandawa Aggressive Barrel
  4726: 150, // Pandawa Milky Instinct
  5148: 160, // Pandawa Bambottle
  5149: 170, // Pandawa Poisoned Chalice
  5150: 180, // Pandawa Refreshment
  5151: 190, // Pandawa Pandemic
  6846: 200, // Pandawa Buzzed
};

export const PASSIVE_SPELL_UNLOCK_MAP = {
  20000: 10, // Evasion
  20001: 15, // Interception
  20002: 25, // Inhalation
  20003: 35, // Motivation
  20004: 55, // Medicine
  20005: 65, // Rock
  20006: 75, // Carnage
  20007: 85, // Fluctuation

  // Feca Passives
  6988: 10, // Increased Glyph
  6989: 10, // Line
  6990: 15, // One For All
  6991: 20, // Master of Shields
  6992: 25, // If You Want Peace, Prepare For War
  6993: 30, // Pacifist Pact
  6994: 35, // Map Mastery
  6995: 40, // The Best Defense is An Attack
  6996: 45, // Combat Armor
  6997: 50, // Rocky Skin
  6998: 55, // Eye For Eye
  6999: 60, // Persistent Glyphs
  7000: 65, // Shepherd
  7001: 70, // Field Experience
  7002: 75, // Elemental Shields
  7003: 80, // Spiny Carapace
  7004: 85, // Wakfu Comprehension
  7005: 90, // Herd Protector

  // Osamodas Passives
  7328: 10, // Boowolf Fury
  7329: 10, // Animal Gift
  7330: 15, // Crobak Vision
  7331: 20, // Summoning Warrior
  7332: 25, // Solitary Summoner
  7333: 30, // Dragonic Power
  7334: 35, // Phoenix Spirit
  7335: 40, // Taur Strength
  7336: 45, // Animal Synergy
  7337: 50, // Symbiosa
  7338: 55, // Dragonic Transcendence
  7339: 60, // South Star
  7340: 65, // Animal Sacrifice
  7341: 70, // Eastern Star
  7342: 75, // Animal Devotion
  7343: 80, // The Art of Taming
  7344: 85, // Animal Sharing

  // Enutrof Passives
  2028: 10, // Treasure Tracker
  2009: 20, // Advanced Geology
  2057: 30, // Not Dead Yet
  5076: 40, // Trade Secrets
  2039: 50, // Enutrof's Blessing
  5059: 60, // Enutrof Force of Will
  5075: 70, // Drhellzertank
  2040: 80, // Faking It
  6326: 90, // Credit Interest
  5071: 100, // Greed

  // Sram Passives
  4608: 10, // Murderer
  5123: 20, // Bloody Blade
  4606: 30, // Brutal Assault
  4607: 40, // Shadow Master
  4609: 50, // Trap Master
  5089: 60, // Crazy Scheme
  5122: 70, // Ambush
  5124: 80, // Fraud
  5126: 90, // Dupery
  4610: 100, // Sram to the Bone

  // Xelor Passives
  758: 10, // Dial Master
  5352: 10, // Timeliness
  5351: 15, // Portent
  5353: 20, // Tick, Tock
  764: 25, // Tock, Tick
  761: 30, // Clockmaking
  756: 35, // Memory
  785: 40, // Course of Time
  7184: 45, // Counterclockwise
  7185: 50, // Deja Vu
  7186: 55, // Knowledge of the Past
  7187: 60, // Violent Omens
  7188: 65, // Dark Dimension
  7189: 70, // Slowdown of Time
  7190: 75, // Remanence
  7191: 80, // Specialized Mechanisms
  7192: 85, // Momentary Permutation
  7193: 90, // Combat Mage
  7195: 95, // Shriveling
  7196: 100, // Assimilation

  // Ecaflip Passives
  2068: 10, // Misadventure
  2062: 10, // Fleassive
  2076: 15, // Winning Streak
  2080: 20, // Misfortune
  2059: 25, // Lucky Tarot
  5246: 30, // Prophetic Tarot
  5250: 35, // Ecaflip's Fate
  5249: 40, // Feline Impact
  5251: 45, // Cheat
  7954: 50, // Healing Luck
  7955: 55, // Feline Tarot
  7956: 60, // Fortune Favors the Bold
  7957: 65, // Heads, I Win
  7958: 70, // Generous Dice
  7959: 75, // Graceful Feline
  2079: 80, // Blackjack
  7961: 85, // Trump Cards
  8001: 90, // Lucky Cards
  7999: 95, // Lucky Seven
  8000: 100, // Universe

  // Enripsa Passives
  1536: 10, // Vital Climax
  1537: 10, // Serial Marker
  5454: 15, // Puncture
  644: 20, // Precision Marking
  5463: 25, // Vampiripsa
  7987: 30, // Radiance
  7990: 35, // Presence
  628: 40, // Doctor Without Borders
  1415: 45, // Single Heal
  7991: 50, // Super Coney II
  7992: 55, // Transgression
  5451: 60, // Delay
  7993: 65, // Wind Elixir
  7994: 70, // Apprentice Alchemist
  7995: 75, // Production Secret
  7996: 80, // Anbarul Mark
  5453: 85, // All For Me
  7997: 90, // Unnatural Paradox
  7998: 95, // Ambivalence
  5455: 100, // Still Life

  // Iop Passives
  4795: 10, // Virility
  4797: 20, // Authority
  4798: 30, // Show Off
  4799: 40, // Locking Pro
  5102: 50, // King of the Hill
  4796: 60, // Compulsion
  5101: 70, // Furious Charge
  5104: 80, // Seismic Rift
  5100: 90, // Bravery
  5103: 100, // Tormentor

  // Cra Passives
  6945: 10, // Devious Archer
  6946: 10, // Scout Specialty
  6947: 15, // Discreet Beacons
  6950: 20, // Voracious Precision
  6960: 25, // Sharp Mind
  6957: 30, // Hunter's Instinct
  6951: 35, // The Way of the Bow
  6952: 40, // Massive Beacon
  6953: 45, // Brutal Redirection
  6955: 50, // Cra's Paradox
  6956: 55, // Untouchable Scout
  6959: 60, // Lone Shooter
  6958: 65, // Short-Range Beaconing
  6948: 70, // Firm Stance
  6949: 75, // Focal Distance
  6961: 80, // The Art of Beacons
  7795: 85, // Protective Point
  6963: 90, // Cra Perforation
  6962: 95, // Timely Movement

  // Sadida Passives
  917: 10, // Knowledge of Dolls
  4959: 20, // Sadida Prayer
  916: 30, // Doll Link
  913: 40, // Green Guard
  933: 50, // Explodoll
  5055: 60, // Harmless Toxin
  912: 70, // Lone Sadida
  5058: 80, // Wild Whispers
  5234: 90, // Venomous
  7053: 100, // Common Ground

  // Sacrier Passives
  5050: 10, // Placidity
  5051: 10, // Tattooed Blood
  5194: 15, // Wakfu Veins
  5192: 20, // Mobility
  5053: 25, // Blood Pact
  5193: 30, // Libation
  5054: 35, // Transcendence
  5049: 40, // Blood Trail
  5195: 45, // Smasher
  5052: 50, // Clinging to Life
  7213: 55, // Blood Flow
  7214: 60, // Dangerous Game
  7215: 65, // Vision
  7216: 70, // Burning Armor
  7217: 75, // Wakfu Pact
  7218: 80, // Sacrier's Heart
  7219: 85, // Motion Sick
  7220: 90, // Pillar
  7224: 95, // Burning
  7830: 100, // Executor

  // Pandawa Passives
  4722: 10, // Cocktail
  4723: 20, // Master of Merriment
  4724: 30, // Bottomless Barrel
  4725: 40, // Aggressive Barrel
  4726: 50, // Milky Instinct
  5148: 60, // Bambottle
  5149: 70, // Poisoned Chalice
  5150: 80, // Refreshment
  5151: 90, // Pandemic
  6846: 100, // Buzzed

  // Rogue Passives
  7983: 10, // Powder Trail
  6479: 10, // Boomarogue
  7065: 15, // Explobomb
  6482: 20, // Pyrotechnist
  6488: 25, // Fugitive
  6486: 30, // Blade Master
  7090: 35, // Elemental Bombs
  6483: 40, // Reinforced Tunic
  6481: 45, // Bomber Fan
  7062: 50, // Surprise Shot
  6480: 55, // Escapist
  7091: 60, // Rogue Master
  7063: 65, // Powder Keg
  6485: 70, // Rusty Blade
  6484: 75, // Minesweeper
  6487: 80, // Powder Wall
  7064: 85, // Dynamite
  7092: 90, // Jackpot
  7982: 95, // Tactician
  7984: 100, // Time Bombs

  // Masqueraider Passives
  7093: 10, // Fancy Footwork
  7094: 10, // Masks Off
  7095: 15, // Violent Pushes
  7096: 20, // Artful Locker
  7097: 25, // Health Mask
  7098: 30, // Carnival
  7099: 35, // Unique Armor
  7100: 40, // Anchor
  7101: 45, // Brute
  7102: 50, // Cautious Protector
  7103: 55, // Support Collisions
  7104: 60, // Erosion
  7105: 65, // Pirouette
  7106: 70, // Regenerating Collisions
  7107: 75, // Mirrors
  7108: 80, // Keep in Contact
  7109: 85, // Artful Dodger
  7110: 90, // Masked Gaze
  7111: 95, // Debuff Pushes

  // Ouginak Passives
  6274: 10, // Sidekick
  6280: 10, // Haggling
  7596: 15, // Growlight
  7553: 20, // Relentless
  7554: 25, // Open Season
  7555: 30, // Digestion
  7556: 35, // Canine Energy
  6275: 40, // Ardor
  6277: 45, // Raiding
  7557: 50, // Fury
  6276: 55, // Exhaustion
  6281: 60, // Tailing
  6279: 65, // Sniff
  6272: 70, // Canine Art
  6271: 75, // Burrow
  6278: 80, // Cunning Fang
  7558: 85, // Canine Tracker
  6282: 90, // Wise Strength
  6273: 95, // Dog Handler

  // Foggernaut Passives
  6925: 10, // Energy Moderator
  6926: 10, // Winding Roads
  6927: 15, // Versatility
  6928: 20, // Reinforced Armor Plating
  6929: 25, // Robotic Strategy
  6930: 30, // Transportation Technology
  6931: 35, // Earthy Assistance
  6932: 40, // Mechanical Substitution
  6933: 45, // Patience
  6934: 50, // Light Alloy
  6935: 55, // Brutal Transfer
  6936: 60, // Heavy Duty Covering
  6937: 65, // Activation
  6938: 70, // Immediate Execution
  6939: 75, // Stasified Protection
  6940: 80, // Hot Wheels
  6941: 85, // Serene Conquest
  6942: 90, // Tactician
  6943: 95, // Advanced Mechanics
  7810: 100, // Switching

  // Eliotrope Passives
  4690: 10, // Resilience
  4687: 10, // Trapster
  4689: 15, // Medium
  4686: 20, // Fury
  5131: 25, // Transitory
  4688: 30, // Effervescence
  5143: 35, // Celestial Portal
  5056: 40, // Portal Disciple
  5132: 45, // Reminiscence
  7202: 50, // Interstellar
  7203: 55, // White Dimension
  7204: 60, // Quietude
  7205: 65, // Spacetime
  7206: 70, // Porta(i)l
  7207: 75, // Final Shield
  7208: 80, // Novice Sword
  7209: 85, // Healing
  7210: 90, // Concentration
  7720: 95, // Lunar System
  7814: 100, // Breath of the Goddess

  // Huppermage Passives
  5579: 10, // Dynamo
  7802: 10, // Antithesis
  5581: 15, // Elemental Distension
  5582: 20, // Light Link
  5585: 25, // Fullness
  5583: 30, // Universality
  7797: 35, // Sensextension
  5586: 40, // Runic Profusion
  5587: 45, // Quadramental Absorption
  5588: 50, // Elemental Refraction
  7804: 55, // Soul Altruism
  7805: 60, // New Breath
  7803: 65, // Soul Development
  7801: 70, // Pulsation
  5584: 75, // Runic Save
  5580: 80, // Soul Initiative
  7800: 85, // Elemental Combination
  7798: 90, // Runic Transcendence
};
