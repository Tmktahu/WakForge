/* eslint-disable quotes */
import enItemTranslations from './itemTranslations/en_items.json';
import enStatesTranslations from './statesTranslations/en_states.json';

export const en = {
  items: enItemTranslations,
  states: enStatesTranslations,
  app: {
    disclaimer: 'WAKFU is an MMORPG published by Ankama. "WakForge" is an unofficial website with no link to Ankama.',
    globalErrorMessage: 'There was a severe error that stopped the app from working correctly.',
    globalErrorContact: 'Please contact Fryke on Discord ASAP with the below information.',
    ignoreGlobalError: 'Ignore Error',
    discordServer: 'Discord Server',
    downloadData: 'Download Current Data',
  },
  oldDataDialog: {
    migrateOldData: 'Migrate Old Data',
    oldDataDetected: 'An old storage data structure has been detected and it must be updated before you can use the app.',
    reloadNotice: 'Once the update is complete, this page will reload.',
    backupReccomendation:
      'It is highly reccomended that you backup your current data before attempting to update it to the new structure. I do my best to try and automatically handle this for you, but there is always a chance that something goes wrong with the update.',
    ifUpdateFails:
      "If the update fails to work and you lose your data, don't worry. As long as you have a backup JSON you can recover everything. Feel free to reach out to Fryke (fryke) directly on Discord for assistance.",
    downloadCurrentData: 'Download Current Data',
    updatingPleaseWait: 'Updating Data. Please Wait',
    updateData: 'Update Data to New Structure',
    mustDownloadFirst: 'You must download a backup of your data first.',
  },
  sidebar: {
    charactersTab: 'Characters',
    dataTab: 'Data',
    guidesTab: 'Guides',
    discordTab: 'Discord',
    githubTab: 'GitHub',
    language: 'Language',
    english: 'English',
    spanish: 'Spanish',
    french: 'French',
    portuguese: 'Portuguese',
    theme: 'Theme',
    colorTheme: 'Color Theme',
    amakna: 'Amakna',
    bonta: 'Bonta',
    brakmar: 'Brakmar',
    sufokia: 'Sufokia',
  },
  charactersPage: {
    title: 'Welcome to Wakforge',
    description: 'If you run into any issues, feel free to DM Fryke (fryke) on Discord.',
    codeInputLabel: 'Build Code',
    codeInputPlaceholder: 'Enter Build Code',
    codeInputButton: 'Create From Code',
    invalidBuildCode: 'That is an invalid build code.',
    savedCharactersTitle: 'Saved Characters',
    createNewCharacterButton: 'Create New Character',
    createNewGroupButton: 'Create New Group',
    newGroup: 'New Group',
  },
  guidesPage: {
    title: 'General Guides',
    description: 'Here you can find general game guides. If you are looking for class specific guides, go check the Guides tab in one of your character builds.',
    searchGuides: 'Search Guides...',
  },
  dataPage: {
    title: 'Application Data Management',
    importDescription: 'Here you can upload a JSON file to import characters.',
    selectJson: 'Select JSON File',
    dragOrDrop: 'Or drag and drop a JSON file here.',
    dataNotRecognized: 'The current data is not recognized as WakForge data.',
    beforeImport: 'Before you can import characters, the version of your imported data will be checked here.',
    needsMigration:
      'Your data seems to be from an old storage version, and thus needs to be updated before it can be used. This is a safe operation and will make no permanent changes to your existing data.',
    goodToGo: 'Your data is good to go.',
    dataSize: 'Data Size',
    numberOfCharacters: 'Number of Characters',
    noCharactersFound: 'No characters were found',
    operatesOffLocalstorage: 'WakForge operates off locally saved data in your browser via LocalStorage.',
    currentLocalstorageKey: 'The current key for the LocalStorage data is',
    storageLimit: 'LocalStorage has a storage size limit of 10 MB.',
    currentStorageSize: 'Your storage has a current size of',
    contactForHelp: 'If you ever approach this limit, please contact Fryke (fryke) on Discord.',
    warning: 'WARNING',
    warningMessage:
      'Editing your LocalStorage data directly in this manner is dangerous and could result in irreperable damage to your data. Only do so after you have made a backup and understand what you are doing.',
    invalidJSON: 'That is invalid JSON',
    saveToLocalstorage: 'Save to LocalStorage',
    deleteAllData: 'Delete All Data',
    migrateData: 'Migrate Data',
    importCharacters: 'Import Selected Characters',
    noDataFound: 'No Data Found',
  },
  characterSheet: {
    selectAClass: 'Select a Class',
    level: 'Level',
    buildCopyPaste: 'You can copy-paste this code to people to share this build.',
    buildCode: 'Build Code',
    copy: 'Copy',
    guides: 'Guides',
    characteristics: 'Characteristics',
    characteristicsAndSpells: 'Characteristics & Spells',
    equipment: 'Equipment',
    autoItemSolver: 'Auto Item Solver',
    runesAndSubs: 'Runes & Sublimations',
    spellsAndPassives: 'Spells & Passives',
    codeDisclaimer: 'Yes, this is intentional. Do not be afraid.',
    codeInfo:
      'These characters are intentional. To make the code small enough, we delved into the dark depths of base2048 encoding. Behold the runic majesty of the Build Code. May it bring you enlightenment.',

    statsDisplay: {
      ar: 'AR',
      qb: 'QB',
      water: 'Water',
      air: 'Air',
      earth: 'Earth',
      fire: 'Fire',
      elmentalResistances: 'Elemental Resistances',
      battle: 'Battle',
      criticalHit: 'Critical Hit',
      block: 'Block',
      secondary: 'Secondary',
      armorReceived: 'Armor Received',
      indirectDamage: 'Indirect Damage',
      statsSummary: 'Stats Summary',
      effectiveHpAgainst: 'Effective HP Against {type} Damage',
      numSelected: '{num} Selected',
    },

    guidesContent: {
      doYouHaveAGuide: "Do you have a guide you would like to list here? Contact us in the Discord server. We'd love to add it.",
      classGuides: '{class} Guides',
      openGuide: 'Open Guide',
    },

    characteristicsContent: {
      points: 'Points',
      intelligence: 'Intelligence',
      barrier: 'Barrier',
      percentArmorHealthPoints: '% Armor Health Points',
      strength: 'Strength',
      elementalMastery: 'Elemental Mastery',
      agility: 'Agility',
      lockAndDodge: 'Lock and Dodge',
      fortune: 'Fortune',
      major: 'Major',
      movementPointsAndDamage: 'Movement Points and Damage',
      rangeAndDamage: 'Range and Damage',
      controlAndDamage: 'Control and Damage',
    },

    equipmentContent: {
      sortBy: 'Sort By',
      newSort: 'New Sort',
      resultsOutOf: 'Results out of',
      itemsTotal: 'Items Total',
      displayStats: 'Display Stats',
      displayTotals: 'Display Totals',
      compareToEquipped: 'Compare to Equipped',
      itemLevel: 'Item Level',
      noItemsFound: 'No items were found with those filters. Please revise your search.',
      hasRelicWarning: 'You already have a Relic item equipped. Doing this will remove it. Are you sure?',
      hasEpicWarning: 'You already have an Epic item equipped. Doing this will remove it. Are you sure?',
      twoHandedWeaponWarning: 'That is a two-handed weapon, and you have an item in your second weapon slot. Are you sure?',
      secondWeaponWarning: 'You have a two-handed weapon equipped. Doing this will remove it. Are you sure?',
      relicAndTwoHandedWarning: 'You have an item in your second weapon slot and a Relic item already equipped. Both will be removed if you do this. Are you sure?',
      relicAndSecondWeaponWarning: 'You have two handed weapon and a Relic item already equipped. Both will be removed if you do this. Are you sure?',
      epicAndTwoHandedWarning: 'You have an item in your second weapon slot and an Epic item already equipped. Both will be removed if you do this. Are you sure?',
      epicAndSecondWeaponWarning: 'You have two handed weapon and an Epic item already equipped. Both will be removed if you do this. Are you sure?',
      randomResistanceDefaults: 'Random Resistance Defaults',
      randomMasteryDefaults: 'Random Mastery Defaults',
      masteryAssignment: '+{num} Mastery Assignment',
      resistanceAssignment: '+{num} Resistance Assignment',
      applyToAllItems: 'Apply to all Items',

      itemFilters: {
        searchItems: 'Search Items',
        resetFilters: 'Reset Filters',
        rarities: 'Rarities',
        all: 'All',
        none: 'None',
        itemTypes: 'Item Types',
        showAllFilters: 'Show All Filters',
        newFilter: 'New Filter',
        equalTo: 'Equal To',
        lessThanOrEqualTo: 'Less Than or Equal To',
        greaterThanOrEqualTo: 'Greater Than or Equal To',
        smallToBig: 'Small to Big',
        bigToSmall: 'Big to Small',
        healthPoints: 'Health Points (HP)',
        randElemMasteryValue: 'Rand Elem Mastery Value',
        criticalHitChance: 'Critical Hit Chance',
        blockChance: 'Block Chance',
        randElemResistanceValue: 'Rand Elem Resistance Value',
        ctrlClickToSelectOne: 'CTRL-Click to select one and remove all others.',
      },
    },

    itemSolverContent: {
      considerCurrentItems: 'Consider Current Items',
      considerCurrentItemsTooltip: 'Should the currently equipped items be taken into consideration?',
      numElements: 'Num Elements',
      apTooltip: 'How many total Action Points you want.',
      mpTooltip: 'How many total Movement Points you want.',
      rangeTooltip: 'How much total Range you want.',
      wakfuTooltip: 'How many total Wakfu Points you want.',
      numElementsTooltip: 'How many elemental types you want on each item.',
      meleeMasteryTooltip: 'Should Melee Mastery be included if possible?',
      distanceMasteryTooltip: 'Should Distance Mastery be included if possible?',
      healingMasteryTooltip: 'Should Healing Mastery be included if possible?',
      rearMasteryTooltip: 'Should Rear Mastery be included if possible?',
      berserkMasteryTooltip: 'Should Berserk Mastery be included if possible?',
      poweredBy: "Powered by {credit}'s code.",
      problemMessage: 'There was a problem with the auto solver. If you believe this is a bug, please contact Fryke on Discord.',
      generateItemSet: 'Generate Item Set',
      regenerateItemSet: 'Re-Generate Item Set',
      instructions: 'Enter your parameters above and click "Generate Item Set".',
      ifYouNeedHelp: 'If you need any guidance, feel free to poke us on Discord with questions.',
      loadingMessage: 'Jimmy is doing the math and stuff... Please wait...',
      loadingDisclaimer: 'Note that depending on your above options, this can take some time.',
      equipAllItems: 'Equip All Items',
      normal: 'Normal',
      prioritized: 'Prioritized',
      preferNoNegatives: 'Prefer no negatives',
      heavilyPreferNoNegatives: 'Heavily prefer no negatives',
      targetStatsInfo: 'These are the total target stats you want for the whole build.',
      prioritiesInfo: 'These are what priority you want the various masteries to be considered at.',
      elementaryMasteryInfo: 'What elemental masteries should be prioritized? This will also affect the number of random element slots the solver goes for.',
      sinbadErrorInfo: 'If you are seeing this, then please contact Keeper of Time (sinbad) on Discord with the following information.',
      priorities: 'Priorities',
      totalTargetStats: 'Total Target Stats',
      apWarning: 'You are asking for at least 6 AP from items, which may be impossible.',
      rangeForLevelWarning: 'You may be asking for more range than is possible at your level.',
      rangeImpossibleWarning: 'You may be asking for more range than is possible.',
      combinedApMpWarning: 'You may be asking for a combined AP+MP amount that is not possible at your level.',
      showAllItems: 'Show All Items',
      displayTotals: 'Display Totals',
      itemSources: 'Item Sources',
      itemSourcesInfo: 'These let you adjust what item sources you want to consider.',
      archmonsters: 'ArchMonsters',
      hordes: 'Hordes',
      battlefields: 'Battlefields',
      ultimateBosses: 'Ultimate Bosses',
      excludedItems: 'Excluded Items',
      excludedItemsInfo: 'These items are excluded from the possible set of results.',
    },

    runesAndSubsContent: {
      hotkeysAndShortcuts: 'Hotkeys and Shortcuts',
      dragAndDrop: 'Drag and drop runes around to assign.',
      dragReplace: 'Drag a rune onto another rune to replace it.',
      ctrlClick: 'CTRL-Click a rune to delete it.',
      shiftClick: 'SHIFT-Click a rune to toggle it white.',
      rightClick: 'Right-Click a rune for more options.',
      hightlightClick: 'Highlight a slot and click a rune on the right to assign it.',
      runeLevelTooltip: `The maximum possible rune level is tied to the item's level, but for our purposes I limit this input by your character level.`,
      runeLevel: 'Rune Level',
      toggleWhite: 'Toggle White',
      removeAllRunes: 'Remove All Runes/Subs',
      sortByMatching: 'Sort by Matching',
      sortByMatchingNote: 'If an equipment slot is hightlighted, this will sort the sublimations by whether they match the rune colors on that equipment slot.',
      searchSublimations: 'Search Sublimations...',
      searchEpicAndRelicSubs: 'Search Epic/Relic Sublimations...',
      addsStateLevelsShort: '+{num_0} levels of', // context = "+1 levels of Abandon"
      stateStackingWarning: 'This state only stacks up to level {num_0}',
      relicSub: 'Relic Sub', // context = shorthand for "Relic Sublimation"
      epicSub: 'Epic Sub', // context = shorthand for "Epic Sublimation"
      itemMustBeEquipped: 'An item must be equipped',
    },

    spellsAndPassivesContent: {
      activeSpells: 'Active Spells (WIP)',
      activesNote: 'Active Spells do not have any direct influence on the stats of a build, and they are very difficult to parse. We will not have them for some time.',
      passives: 'Passives',
      passivesNote: 'If you find any passives that do not apply their values correctly, please lets us know in the Discord.',
    },
  },
  classes: {
    feca: 'Feca',
    osamodas: 'Osamodas',
    enutrof: 'Enutrof',
    sram: 'Sram',
    xelor: 'Xelor',
    ecaflip: 'Ecaflip',
    eniripsa: 'Eniripsa',
    iop: 'Iop',
    cra: 'Cra',
    sadida: 'Sadida',
    sacrier: 'Sacrier',
    pandawa: 'Pandawa',
    rogue: 'Rogue',
    masqueraider: 'Masqueraider',
    ouginak: 'Ouginak',
    foggernaut: 'Foggernaut',
    eliotrope: 'Eliotrope',
    huppermage: 'Huppermage',
  },
  constants: {
    common: 'Common',
    unusual: 'Unusual',
    rare: 'Rare',
    mythical: 'Mythical',
    legendary: 'Legendary',
    relic: 'Relic',
    souvenir: 'Souvenir',
    epic: 'Epic',

    helmet: 'Helmet',
    breastplate: 'Breastplate',
    epaulettes: 'Epaulettes',
    boots: 'Boots',
    amulet: 'Amulet',
    cloak: 'Cloak',
    belt: 'Belt',
    primaryWeapon: 'Primary Weapon',
    secondaryWeapon: 'Secondary Weapon',
    leftRing: 'Left Ring',
    rightRing: 'Right Ring',
    ring: 'Ring',
    emblem: 'Emblem',
    pet: 'Pet',
    pets: 'Pets',
    mount: 'Mount',
    mounts: 'Mounts',
    tool: 'Tool',
    torches: 'Torches',
    costumes: 'Costumes',
    sublimationScroll: 'Sublimation Scroll',
    enchantment: 'Rune',

    epicSublimation: 'Epic Sublimation', // NEEDS TRANSLATION
    relicSublimation: 'Relic Sublimation', // NEEDS TRANSLATION

    oneHandedWeapons: 'One Handed Weapons',
    twoHandedWeapons: 'Two Handed Weapons',
    wandOneHand: 'Wand (One Hand)',
    swordOneHand: 'Sword (One Hand)',
    staffOneHand: 'Staff (One Hand)',
    clockHandOneHand: 'Clock Hand (One Hand)',
    cardsOneHand: 'Cards (One Hand)',
    swordTwoHanded: 'Sword (Two Handed)',
    axeTwoHanded: 'Axe (Two Handed)',
    staffTwoHanded: 'Staff (Two Handed)',
    hammerTwoHanded: 'Hammer (Two Handed)',
    bowTwoHanded: 'Bow (Two Handed)',
    shovelTwoHanded: 'Shovel (Two Handed)',
    daggerSecondaryWeapon: 'Dagger (Secondary Weapon)',
    shieldSecondaryWeapon: 'Shield (Secondary Weapon)',

    percentDamageInflicted: '% Damage Inflicted',
    percentCriticalHit: '% Critical Hit',
    hp: 'HP',
    ap: 'AP',
    mp: 'MP',
    wp: 'WP',
    healthSteal: 'Health Steal',
    range: 'Range',
    prospecting: 'Prospecting',
    wisdom: 'Wisdom',
    control: 'Control',
    percentBlock: '% Block',
    movementPoints: 'Movement Points',

    elementalMasteries: 'Elemental Masteries',
    meleeMastery: 'Melee Mastery',
    distanceMastery: 'Distance Mastery',
    lock: 'Lock',
    dodge: 'Dodge',
    initiative: 'Initiative',
    forceOfWill: 'Force of Will',
    criticalMastery: 'Critical Mastery',
    rearMastery: 'Rear Mastery',
    berserkMastery: 'Berserk Mastery',
    healingMastery: 'Healing Mastery',
    rearResistance: 'Rear Resistance',
    criticalResistance: 'Critical Resistance',
    actionPoints: 'Action Points',
    wakfuPoints: 'Wakfu Points',
    elementalResistance: 'Elemental Resistance',
    waterResistance: 'Water Resistance',
    earthResistance: 'Earth Resistance',
    airResistance: 'Air Resistance',
    fireResistance: 'Fire Resistance',
    level: 'Level',
    name: 'Name',
    elementalMastery: 'Elemental Mastery',
    waterMastery: 'Water Mastery',
    earthMastery: 'Earth Mastery',
    airMastery: 'Air Mastery',
    fireMastery: 'Fire Mastery',
    randElemMastery: 'Random Elemental Masteries',
    randElemResistances: 'Random Elemental Resistances',
    harvestingQuantity: 'Harvesting Quantity',

    percentArmorGiven: '% Armor Given',
    percentArmorReceived: '% Armor Received',
    percentHealsPerformed: '% Heals Performed',
    percentIndirectDamageInflicted: '% Indirect Damage Inflicted',
    dodgeOverride: 'Dodge Override',
    percentHealsReceived: '% Heals Received',
    healthFromLevel: 'Health Points from Level',
    lockOverride: 'Lock Override',
    percentHealthPoints: '% Health Points',
    lockDoubled: 'Lock Doubled',
    dodgeFromLevel: 'Dodge from Level',
    lockFromLevel: 'Lock from Level',
    percentDodge: '% Dodge',
    damageInflicted: 'Damage Inflicted',
    healsPerformed: 'Heals Performed',
    healsReceived: 'Heals Received',
    armorGiven: 'Armor Given',
    healthPoints: 'Health Points',

    remove: 'Remove',
  },
  confirms: {
    irreversable: 'Are you sure? This is irreversible.',
    areYouSure: 'Are you sure?',
    willReplaceItems: 'Are you sure? This will replace any other items you have equipped right now in conflicting slots.',
    willDeleteCharacters: 'Are you sure? This will also delete all characters in the group.',
  },
  tooltips: {
    randomMasteryValue: '+{num_0} Mastery of {num_1} random elements',
    randomResistanceValue: '+{num_0} Resistance of {num_1} random elements',
    addsStateLevels: 'Adds +{num_0} levels of', // context = "Adds +1 level of Abandon"
    stateAtLevel: '{state} State at level {num_0} (Max {num_1})', // context = "Abandon State at level 1 (Max 6)"
    missingInfoAboutState: 'We are missing information about this state. If you have any, please let us know in the Discord server.',
    equipped: 'equipped',
    itemLevel: 'Item Level',
    openEncyclopediaPage: 'Open Encyclopedia Page',
    totalMastery: 'Total Mastery',
    totalResistance: 'Total Resistance',
    yes: 'Yes',
    no: 'No',
    excludeItem: 'Exclude Item',
    allowItem: 'Allow Item',
  },
};
