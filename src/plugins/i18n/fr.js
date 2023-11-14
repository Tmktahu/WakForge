/* eslint-disable quotes */
import frItemTranslations from './itemTranslations/fr_items.json';

export const fr = {
  items: frItemTranslations,
  app: {
    disclaimer: 'WAKFU est un MMORPG édité par Ankama. "WakForge" est un site non-officiel sans aucun lien avec Ankama.',
  },
  sidebar: {
    charactersTab: 'Personnages',
    dataTab: 'Données',
    discordTab: 'Discord',
    githubTab: 'GitHub',
    language: 'Language', // NEEDS TRANSLATION
    english: 'English', // NEEDS TRANSLATION
    spanish: 'Spanish', // NEEDS TRANSLATION
    french: 'French', // NEEDS TRANSLATION
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
    selectAClass: 'Sélectionner une classe',
    level: 'Niveau',
    buildCopyPaste: 'Vous pouvez copier-coller ce code pour partager ce build',
    buildCode: 'Code Build',
    copy: 'Copier',
    characteristics: 'Caractéristiques',
    equipment: 'Equipement',
    autoItemSolver: 'Auto Item Résolveur',
    runesAndSubs: 'Runes & Sublimations (WIP)',
    spellsAndPassives: 'Sorts & Passifs',
    codeDisclaimer: 'Yes, this is intentional. Do not be afraid.', // NEEDS TRANSLATION
    codeInfo:
      'These characters are intentional. To make the code small enough, we delved into the dark depths of base2048 encoding. Behold the runic majesty of the Build Code. May it bring you enlightenment.', // NEEDS TRANSLATION

    statsDisplay: {
      ar: 'Ar',
      qb: 'BQ',
      elementalMasteries: 'Maîtrises Elémentaires',
      water: 'Eau',
      air: 'Air',
      earth: 'Terre',
      fire: 'Feu',
      elmentalResistances: 'Résistances Elémentaires',
      battle: 'Combat',
      damageInflicted: 'Dommages Infligés',
      criticalHit: 'Coup Critique',
      healsPerformed: 'Soins réalisés',
      block: 'Parade',
      secondary: 'Secondaire',
      armorGiven: 'Armure donnée',
      armorReceived: 'Armure reçue',
      indirectDamage: 'Dommage Indirect',
    },

    characteristicsContent: {
      points: 'Points',
      intelligence: 'Intelligence',
      barrier: 'Barrière',
      percentArmorHealthPoints: '% Points de Vie en Armure',
      strength: 'Force',
      elementalMastery: 'Maîtrise élémentaire',
      healthPoints: 'Points de Vie',
      agility: 'Agilité',
      lockAndDodge: 'Tacle et Esquive',
      fortune: 'Chance',
      major: 'Majeur',
      movementPointsAndDamage: 'Point de Mouvement et dégâts',
      rangeAndDamage: 'Portée et dégâts',
      controlAndDamage: 'Contrôle et dégâts',
    },

    equipmentContent: {
      sortBy: 'Trier par',
      resultsOutOf: 'Résultats sur',
      itemsTotal: 'Items au total',
      displayStats: 'Afficher les stats',
      itemLevel: "Niveau de l'item",
      openEncyclopediaPage: "Ouvrir la page de l'encyclopédie",
      noItemsFound: "Aucun item n'a été trouvé avec ces filtres. N'hésitez pas à changer votre recherche.",
      hasRelicWarning: 'Vous avez déjà un item Relique équipé. Ce dernier sera retiré avec cette action. Êtes-vous sûr ?',
      hasEpicWarning: 'Vous avez déjà un item Epique équipé. Ce dernier sera retiré avec cette action. Êtes-vous sûr ?',
      twoHandedWeaponWarning: "Ceci est une arme à deux mains et il existe déjà un item dans le slot d'arme secondaire. Êtes-vous sûr ?",
      secondWeaponWarning: 'Vous avez une arme à deux mains équipée. Cette dernière sera retirée avec cette action. Êtes-vous sûr ?',
      relicAndTwoHandedWarning:
        "Vous avez un item dans le slot d'arme secondaire et un item Relique équipés. Ces derniers seront retirés avec cette action. Êtes-vous sûr ?",
      relicAndSecondWeaponWarning: 'Vous avez une arme à deux main et un item Relique équipés. Ces derniers seront retirés avec cette action. Êtes-vous sûr ?',
      epicAndTwoHandedWarning:
        "Vous avez un item dans le slot d'arme secondaire et un item Epique équipés. Ces derniers seront retirés avec cette action. Êtes-vous sûr ?",
      epicAndSecondWeaponWarning: 'Vous avez une arme à deux main et un item Epique équipés. Ces derniers seront retirés avec cette action. Êtes-vous sûr ?',

      itemFilters: {
        searchItems: 'Search Items', // NEEDS TRANSLATION
        resetFilters: 'Reset Filters', // NEEDS TRANSLATION
        rarities: 'Rarities', // NEEDS TRANSLATION
        all: 'All', // NEEDS TRANSLATION
        none: 'None', // NEEDS TRANSLATION
        itemTypes: 'Item Types', // NEEDS TRANSLATION
        showAllFilters: 'Show All Filters', // NEEDS TRANSLATION
        newFilter: 'New Filter', // NEEDS TRANSLATION
        equalTo: 'Equal To', // NEEDS TRANSLATION
        lessThanOrEqualTo: 'Less Than or Equal To', // NEEDS TRANSLATION
        greaterThanOrEqualTo: 'Greater Than or Equal To', // NEEDS TRANSLATION
        smallToBig: 'Small to Big', // NEEDS TRANSLATION
        bigToSmall: 'Big to Small', // NEEDS TRANSLATION
        healthPoints: 'Health Points (HP)', // NEEDS TRANSLATION
        randElemMasteryValue: 'Rand Elem Mastery Value', // NEEDS TRANSLATION
        criticalHitChance: 'Critical Hit Chance', // NEEDS TRANSLATION
        blockChance: 'Block Chance', // NEEDS TRANSLATION
        randElemResistanceValue: 'Rand Elem Resistance Value', // NEEDS TRANSLATION
      },
    },
  },
  constants: {
    common: 'Common', // NEEDS TRANSLATION
    unusual: 'Unusual', // NEEDS TRANSLATION
    rare: 'Rare', // NEEDS TRANSLATION
    mythical: 'Mythical', // NEEDS TRANSLATION
    legendary: 'Legendary', // NEEDS TRANSLATION
    relic: 'Relic', // NEEDS TRANSLATION
    souvenir: 'Souvenir', // NEEDS TRANSLATION
    epic: 'Epic', // NEEDS TRANSLATION

    helmet: 'Helmet', // NEEDS TRANSLATION
    breastplate: 'Breastplate', // NEEDS TRANSLATION
    epaulettes: 'Epaulettes', // NEEDS TRANSLATION
    boots: 'Boots', // NEEDS TRANSLATION
    amulet: 'Amulet', // NEEDS TRANSLATION
    cloak: 'Cloak', // NEEDS TRANSLATION
    belt: 'Belt', // NEEDS TRANSLATION
    primaryWeapon: 'Primary Weapon', // NEEDS TRANSLATION
    secondaryWeapon: 'Secondary Weapon', // NEEDS TRANSLATION
    leftRing: 'Left Ring', // NEEDS TRANSLATION
    rightRing: 'Right Ring', // NEEDS TRANSLATION
    ring: 'Ring', // NEEDS TRANSLATION
    emblem: 'Emblem', // NEEDS TRANSLATION
    pet: 'Pet', // NEEDS TRANSLATION
    pets: 'Pets', // NEEDS TRANSLATION
    mount: 'Mount', // NEEDS TRANSLATION
    mounts: 'Mounts', // NEEDS TRANSLATION
    tool: 'Tool', // NEEDS TRANSLATION
    torches: 'Torches', // NEEDS TRANSLATION
    costumes: 'Costumes', // NEEDS TRANSLATION
    sublimationScroll: 'Sublimation Scroll', // NEEDS TRANSLATION
    enchantment: 'Rune', // NEEDS TRANSLATION

    oneHandedWeapons: 'One Handed Weapons', // NEEDS TRANSLATION
    twoHandedWeapons: 'Two Handed Weapons', // NEEDS TRANSLATION
    wandOneHand: 'Wand (One Hand)', // NEEDS TRANSLATION
    swordOneHand: 'Sword (One Hand)', // NEEDS TRANSLATION
    staffOneHand: 'Staff (One Hand)', // NEEDS TRANSLATION
    clockHandOneHand: 'Clock Hand (One Hand)', // NEEDS TRANSLATION
    cardsOneHand: 'Cards (One Hand)', // NEEDS TRANSLATION
    swordTwoHanded: 'Sword (Two Handed)', // NEEDS TRANSLATION
    axeTwoHanded: 'Axe (Two Handed)', // NEEDS TRANSLATION
    staffTwoHanded: 'Staff (Two Handed)', // NEEDS TRANSLATION
    hammerTwoHanded: 'Hammer (Two Handed)', // NEEDS TRANSLATION
    bowTwoHanded: 'Bow (Two Handed)', // NEEDS TRANSLATION
    shovelTwoHanded: 'Shovel (Two Handed)', // NEEDS TRANSLATION
    daggerSecondaryWeapon: 'Dagger (Secondary Weapon)', // NEEDS TRANSLATION
    shieldSecondaryWeapon: 'Shield (Secondary Weapon)', // NEEDS TRANSLATION

    percentDamageInflicted: '% Dommages infligés',
    percentCriticalHit: '% Coup Critique',
    hp: 'PV',
    ap: 'PA',
    mp: 'PM',
    wp: 'PW',
    healthSteal: 'Health Steal', // NEEDS TRANSLATION
    range: 'PO',
    prospecting: 'Prospection',
    wisdom: 'Sagesse',
    control: 'Contrôle',
    percentBlock: '% Parade',

    meleeMastery: 'Maîtrise Mêlée',
    distanceMastery: 'Maîtrise Distance',
    lock: 'Tacle',
    dodge: 'Esquive',
    initiative: 'Initiative',
    forceOfWill: 'Volonté',
    criticalMastery: 'Maîtrise Critique',
    rearMastery: 'Maîtrise Dos',
    berserkMastery: 'Maîtrise Berserk',
    healingMastery: 'Maîtrise Soin',
    rearResistance: 'Résistance Dos',
    criticalResistance: 'Résistance Critique',
    actionPoints: "Points d'actions",
    wakfuPoints: 'Points Wakfu',
    elementalResistance: 'Résistance Elémentaire',
    waterResistance: 'Water Resistance', // NEEDS TRANSLATION
    earthResistance: 'Earth Resistance', // NEEDS TRANSLATION
    airResistance: 'Air Resistance', // NEEDS TRANSLATION
    fireResistance: 'Fire Resistance', // NEEDS TRANSLATION
    level: 'Level', // NEEDS TRANSLATION
    name: 'Name', // NEEDS TRANSLATION
    elementalMastery: 'Elemental Mastery', // NEEDS TRANSLATION
    waterMastery: 'Water Mastery', // NEEDS TRANSLATION
    earthMastery: 'Earth Mastery', // NEEDS TRANSLATION
    airMastery: 'Air Mastery', // NEEDS TRANSLATION
    fireMastery: 'Fire Mastery', // NEEDS TRANSLATION

    percentArmorGiven: '% Armor Given', // NEEDS TRANSLATION
    percentArmorReceived: '% Armor Received', // NEEDS TRANSLATION
    percentHealsPerformed: '% Heals Performed', // NEEDS TRANSLATION
    percentIndirectDamageInflicted: '% Indirect Damage Inflicted', // NEEDS TRANSLATION
    dodgeOverride: 'Dodge Override', // NEEDS TRANSLATION
    percentHealsReceived: '% Soins reçus',
    healthFromLevel: 'Health Points from Level', // NEEDS TRANSLATION
    lockOverride: 'Lock Override', // NEEDS TRANSLATION
    percentHealthPoints: '% Points de Vie',
    lockDoubled: 'Lock Doubled', // NEEDS TRANSLATION
    dodgeFromLevel: 'Dodge from Level', // NEEDS TRANSLATION
    lockFromLevel: 'Lock from Level', // NEEDS TRANSLATION
    percentDodge: '% Dodge', // NEEDS TRANSLATION
  },
};
