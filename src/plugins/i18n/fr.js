/* eslint-disable quotes */
export const fr = {
  app: {
    disclaimer: 'WAKFU est un MMORPG édité par Ankama. "WakForge" est un site non-officiel sans aucun lien avec Ankama.',
  },
  sidebar: {
    charactersTab: 'Personnages',
    dataTab: 'Données',
    discordTab: 'Discord',
    githubTab: 'GitHub',
  },
  charactersPage: {
    title: 'Bienvenue sur Wakforge',
    description: "Si vous rencontrez le moindre problème, n'hésitez pas à contacter Fryke (fryke) sur Discord.",
    codeInputLabel: 'Code Build',
    codeInputPlaceholder: "Entrer le code d'un build",
    codeInputButton: "Créer à partir d'un code",
    invalidBuildCode: 'Code de Build invalide.',
    savedCharactersTitle: 'Personnages Sauvegardés',
    createNewCharacterButton: 'Créer un nouveau Personnage',
  },
  dataPage: {
    title: "Gestion des données de l'application",
    importDescription: 'Vous pouvez upload ici un fichier JSON pour importer des personnages',
    selectJson: 'Sélectionner un fichier JSON',
    dragOrDrop: 'Ou glisser/déposer le fichier JSON ici.',
    dataNotRecognized: 'Les données actuelles ne sont pas reconnues comme des données WakForge.',
    beforeImport: "Avant d'importer les personnages, la version de vos données sera vérifiée.",
    needsMigration:
      "Il semble que vous utilisez des données d'une ancienne version nécessitant d'être mises à jour avant d'être utilisées. Ceci est une opération sans risque et ne fera aucun changement permanent sur vos données existantes.",
    goodToGo: 'Vos données sont prêtes.',
    dataSize: 'Taille des données',
    numberOfCharacters: 'Nombre de personnages',
    noCharactersFound: 'Aucun personnage trouvé',
    operatesOffLocalstorage: 'WakForge fonctionne avec des données sauvegardées dans le navigateur via LocalStorage.',
    currentLocalstorageKey: 'La clé utilisée pour les données du LocalStorage est',
    storageLimit: 'Le LocalStorage a une taille limite de 10Mo.',
    currentStorageSize: 'Votre stockage a une taille actuelle de',
    contactForHelp: 'Si vous approchez de cette limite, merci de contacter Fryke (fryke) sur Discord.',
    warning: 'ATTENTION',
    warningMessage:
      "Editer les données du LocalStorage directement est dangereux et peut corrompre définitivement vos données. Ne le faites qu'après avoir fait une sauvegarde et si vous savez ce que vous faites.",
    mustDownloadFirst: "Vous devez d'abort télecharger vos données",
    invalidJSON: 'JSON invalide',
    saveToLocalstorage: 'Sauvegarder dans le LocalStorage',
    downloadData: 'Télécharger les données actuelles',
    deleteAllData: 'Supprimer toutes les données',
    migrateData: 'Migrer les données',
    importCharacters: 'Importer les personnages sélectionnés',
    noDataFound: 'Aucune donnée trouvée',
  },
  characterSheet: {
    selectAClass: 'Select a Class', // NEEDS TRANSLATION
    level: 'Level', // NEEDS TRANSLATION
    buildCopyPaste: 'You can copy-paste this code to people to share this build.', // NEEDS TRANSLATION
    buildCode: 'Build Code', // NEEDS TRANSLATION
    copy: 'Copy', // NEEDS TRANSLATION
    characteristics: 'Characteristics', // NEEDS TRANSLATION
    equipment: 'Equipment', // NEEDS TRANSLATION
    autoItemSolver: 'Auto Item Solver', // NEEDS TRANSLATION
    runesAndSubs: 'Runes & Sublimations (WIP)', // NEEDS TRANSLATION
    spellsAndPassives: 'Spells & Passives', // NEEDS TRANSLATION

    shared: {
      meleeMastery: 'Melee Mastery', // NEEDS TRANSLATION
      distanceMastery: 'Distance Mastery', // NEEDS TRANSLATION
      lock: 'Lock', // NEEDS TRANSLATION
      dodge: 'Dodge', // NEEDS TRANSLATION
      initiative: 'Initiative', // NEEDS TRANSLATION
      forceOfWill: 'Force of Will', // NEEDS TRANSLATION
      criticalMastery: 'Critical Mastery', // NEEDS TRANSLATION
      rearMastery: 'Rear Mastery', // NEEDS TRANSLATION
      berserkMastery: 'Berserk Mastery', // NEEDS TRANSLATION
      healingMastery: 'Healing Mastery', // NEEDS TRANSLATION
      rearResistance: 'Rear Resistance', // NEEDS TRANSLATION
      criticalResistance: 'Critical Resistance', // NEEDS TRANSLATION
      actionPoints: 'Action Points', // NEEDS TRANSLATION
      wakfuPoints: 'Wakfu Points', // NEEDS TRANSLATION
      elementalResistance: 'Elemental Resistance', // NEEDS TRANSLATION
    },

    statsDisplay: {
      hp: 'HP', // NEEDS TRANSLATION
      ar: 'AR', // NEEDS TRANSLATION
      ap: 'AP', // NEEDS TRANSLATION
      mp: 'MP', // NEEDS TRANSLATION
      qb: 'QB', // NEEDS TRANSLATION
      wp: 'WP', // NEEDS TRANSLATION
      elementalMasteries: 'Elemental Masteries', // NEEDS TRANSLATION
      water: 'Water', // NEEDS TRANSLATION
      air: 'Air', // NEEDS TRANSLATION
      earth: 'Earth', // NEEDS TRANSLATION
      fire: 'Fire', // NEEDS TRANSLATION
      elmentalResistances: 'Elemental Resistances', // NEEDS TRANSLATION
      battle: 'Battle', // NEEDS TRANSLATION
      damageInflicted: 'Damage Inflicted', // NEEDS TRANSLATION
      criticalHit: 'Critical Hit', // NEEDS TRANSLATION
      wisdom: 'Wisdom', // NEEDS TRANSLATION
      control: 'Control', // NEEDS TRANSLATION
      healsPerformed: 'Heals Performed', // NEEDS TRANSLATION
      block: 'Block', // NEEDS TRANSLATION
      range: 'Range', // NEEDS TRANSLATION
      prospecting: 'Prospecting', // NEEDS TRANSLATION
      secondary: 'Secondary', // NEEDS TRANSLATION
      armorGiven: 'Armor Given', // NEEDS TRANSLATION
      armorReceived: 'Armor Received', // NEEDS TRANSLATION
      indirectDamage: 'Indirect Damage', // NEEDS TRANSLATION
    },

    characteristicsContent: {
      points: 'Points', // NEEDS TRANSLATION
      intelligence: 'Intelligence', // NEEDS TRANSLATION
      percentHealth: '% Health Points', // NEEDS TRANSLATION
      barrier: 'Barrier', // NEEDS TRANSLATION
      percentHealsReceived: '% Heals Received', // NEEDS TRANSLATION
      percentArmorHealthPoints: '% Armor Health Points', // NEEDS TRANSLATION
      strength: 'Strength', // NEEDS TRANSLATION
      elementalMastery: 'Elemental Mastery', // NEEDS TRANSLATION
      healthPoints: 'Health Points', // NEEDS TRANSLATION
      agility: 'Agility', // NEEDS TRANSLATION
      lockAndDodge: 'Lock and Dodge', // NEEDS TRANSLATION
      fortune: 'Fortune', // NEEDS TRANSLATION
      percentCriticalHit: '% Critical Hit', // NEEDS TRANSLATION
      percentBlock: '% Block', // NEEDS TRANSLATION
      major: 'Major', // NEEDS TRANSLATION
      movementPointsAndDamage: 'Movement Points and Damage', // NEEDS TRANSLATION
      rangeAndDamage: 'Range and Damage', // NEEDS TRANSLATION
      controlAndDamage: 'Control and Damage', // NEEDS TRANSLATION
      percentDamageInflicted: '% Damage Inflicted', // NEEDS TRANSLATION
    },

    equipmentContent: {
      sortBy: 'Sort By', // NEEDS TRANSLATION
      resultsOutOf: 'Results out of', // NEEDS TRANSLATION
      itemsTotal: 'Items Total', // NEEDS TRANSLATION
      displayStats: 'Display Stats', // NEEDS TRANSLATION
      itemLevel: 'Item Level', // NEEDS TRANSLATION
      openEncyclopediaPage: 'Open Encyclopedia Page', // NEEDS TRANSLATION
      noItemsFound: 'No items were found with those filters. Please revise your search.', // NEEDS TRANSLATION
      hasRelicWarning: 'You already have a Relic item equipped. Doing this will remove it. Are you sure?', // NEEDS TRANSLATION
      hasEpicWarning: 'You already have an Epic item equipped. Doing this will remove it. Are you sure?', // NEEDS TRANSLATION
      twoHandedWeaponWarning: 'That is a two-handed weapon, and you have an item in your second weapon slot. Are you sure?', // NEEDS TRANSLATION
      secondWeaponWarning: 'You have a two-handed weapon equipped. Doing this will remove it. Are you sure?', // NEEDS TRANSLATION
      relicAndTwoHandedWarning:
        'You have an item in your second weapon slot and a Relic item already equipped. Both will be removed if you do this. Are you sure?', // NEEDS TRANSLATION
      relicAndSecondWeaponWarning: 'You have two handed weapon and a Relic item already equipped. Both will be removed if you do this. Are you sure?', // NEEDS TRANSLATION
      epicAndTwoHandedWarning:
        'You have an item in your second weapon slot and an Epic item already equipped. Both will be removed if you do this. Are you sure?', // NEEDS TRANSLATION
      epicAndSecondWeaponWarning: 'You have two handed weapon and an Epic item already equipped. Both will be removed if you do this. Are you sure?', // NEEDS TRANSLATION
    },
  },
};
