/* eslint-disable prettier/prettier */
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
    language: 'Langage',
    english: 'Anglais',
    spanish: 'Espagnol',
    french: 'Français',
    theme: 'Theme', // NEEDS TRANSLATION
    colorTheme: 'Color Theme', // NEEDS TRANSLATION
    amakna: 'Amakna', // NEEDS TRANSLATION
    bonta: 'Bonta', // NEEDS TRANSLATION
    brakmar: 'Brakmar', // NEEDS TRANSLATION
    sufokia: 'Sufokia', // NEEDS TRANSLATION
  },
  charactersPage: {
    title: 'Bienvenue sur Wakforge',
    description: "Si vous rencontrez le moindre problème, n'hésitez pas à contacter Fryke (fryke) sur Discord.",
    codeInputLabel: 'Code Build',
    codeInputPlaceholder: "Entrer le Build Code",
    codeInputButton: "Créer à partir d'un code",
    invalidBuildCode: 'Build Code invalide.',
    savedCharactersTitle: 'Personnages Sauvegardés',
    createNewCharacterButton: 'Créer un nouveau Personnage',
  },
  dataPage: {
    title: "Gestion des données de l'application",
    importDescription: 'Vous pouvez upload ici un fichier JSON pour importer des personnages.',
    selectJson: 'Sélectionner un fichier JSON',
    dragOrDrop: 'ou glisser/déposer le fichier JSON ici.',
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
      "Éditer les données du LocalStorage directement est dangereux et peut corrompre définitivement vos données. Ne le faites qu'après avoir fait une sauvegarde et si vous savez ce que vous faites.",
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
    equipment: 'Équipement',
    autoItemSolver: 'Auto Item Solver',
    runesAndSubs: 'Runes & Sublimations (WIP)',
    spellsAndPassives: 'Sorts & Passifs',
    codeDisclaimer: 'Oui, c\'est normal. Ne soyez pas inquiet.',
    codeInfo:
      'Ces caractères sont intentionnels. Pour que le code reste court, nous sommes allés vers les profondeurs obscures de l\'encodage en base2048. Contemplez la majesté de ces runes du code du Build. Puisse-t-il vous apporter l\'illumination.',

    statsDisplay: {
      ar: 'AR',
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
      indirectDamage: 'Dommages Indirects',
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
        searchItems: 'Recherche Items',
        resetFilters: 'Reset Filtres',
        rarities: 'Raretés',
        all: 'Tout',
        none: 'Aucun',
        itemTypes: 'Types Item',
        showAllFilters: 'Montrer tous les filtres',
        newFilter: 'Nouveau Filtre',
        equalTo: 'Égal à',
        lessThanOrEqualTo: 'Inférieur ou égale à',
        greaterThanOrEqualTo: 'Supérieur ou égale à',
        smallToBig: 'Croissant',
        bigToSmall: 'Décroissant',
        healthPoints: 'Points de vie (PV)',
        randElemMasteryValue: 'Maîtrise élem. aléatoire',
        criticalHitChance: 'Chance Coup Critique',
        blockChance: 'Parade',
        randElemResistanceValue: 'Résis. élem. aléatoire',
      },
    },

    itemSolverContent: {
      numElements: 'Num Elements', // NEEDS TRANSLATION
      apTooltip: 'How many total Action Points you want.', // NEEDS TRANSLATION
      mpTooltip: 'How many total Movement Points you want.', // NEEDS TRANSLATION
      rangeTooltip: 'How much total Range you want.', // NEEDS TRANSLATION
      wakfuTooltip: 'How many total Wakfu Points you want.', // NEEDS TRANSLATION
      numElementsTooltip: 'How many elemental types you want on each item.', // NEEDS TRANSLATION
      meleeMasteryTooltip: 'Should Melee Mastery be included if possible?', // NEEDS TRANSLATION
      distanceMasteryTooltip: 'Should Distance Mastery be included if possible?', // NEEDS TRANSLATION
      healingMasteryTooltip: 'Should Healing Mastery be included if possible?', // NEEDS TRANSLATION
      rearMasteryTooltip: 'Should Rear Mastery be included if possible?', // NEEDS TRANSLATION
      berserkMasteryTooltip: 'Should Berserk Mastery be included if possible?', // NEEDS TRANSLATION
      poweredBy: 'Powered by', // NEEDS TRANSLATION
      code: 'code', // NEEDS TRANSLATION
      problemMessage: 'There was a problem with the auto solver. If you believe this is a bug, please contact Fryke on Discord.', // NEEDS TRANSLATION
      instructions: 'Enter your parameters above and click "Generate Item Set".', // NEEDS TRANSLATION
      ifYouNeedHelp: 'If you need any guidance, feel free to poke us on Discord with questions.', // NEEDS TRANSLATION
      loadingMessage: 'Jimmy is doing the math and stuff... Please wait...', // NEEDS TRANSLATION
      loadingDisclaimer: 'Note that depending on your above options, this can take some time.', // NEEDS TRANSLATION
    },

    runesAndSubsContent: {
      hotkeysAndShortcuts: 'Hotkeys and Shortcuts', // NEEDS TRANSLATION
      dragAndDrop: 'Drag and drop runes around to assign.', // NEEDS TRANSLATION
      dragReplace: 'Drag a rune onto another rune to replace it.', // NEEDS TRANSLATION
      ctrlClick: 'CTRL-Click a rune to delete it.', // NEEDS TRANSLATION
      shiftClick: 'SHIFT-Click a rune to toggle it white.', // NEEDS TRANSLATION
      rightClick: 'Right-Click a rune for more options.', // NEEDS TRANSLATION
      hightlightClick: 'Highlight a slot and click a rune on the right to assign it.', // NEEDS TRANSLATION
      statsSummary: 'Stats Summary', // NEEDS TRANSLATION
      runeLevelTooltip: `The maximum possible rune level is tied to the item's level, but for our purposes I limit this input by your character level.`, // NEEDS TRANSLATION
      runeLevel: 'Rune Level', // NEEDS TRANSLATION
      toggleWhite: 'Toggle White', // NEEDS TRANSLATION
      removeAllRunes: 'Remove All Runes/Subs', // NEEDS TRANSLATION
    },
  },
  constants: {
    common: 'Commun',
    unusual: 'Inhabituel',
    rare: 'Rare',
    mythical: 'Mythique',
    legendary: 'Légendaire',
    relic: 'Relique',
    souvenir: 'Souvenir',
    epic: 'Épique',

    helmet: 'Casque',
    breastplate: 'Plastron',
    epaulettes: 'Épaulettes',
    boots: 'Bottes',
    amulet: 'Amulette',
    cloak: 'Cape',
    belt: 'Ceinture',
    primaryWeapon: 'Arme Principale',
    secondaryWeapon: 'Arme Secondaire',
    leftRing: 'Anneau Gauche',
    rightRing: 'Anneau Droit',
    ring: 'Anneau',
    emblem: 'Emblème',
    pet: 'Familier',
    pets: 'Familiers',
    mount: 'Monture',
    mounts: 'Montures',
    tool: 'Outil',
    torches: 'Torches',
    costumes: 'Costumes',
    sublimationScroll: 'Parchemin de Sublimation',
    enchantment: 'Rune',

    oneHandedWeapons: 'Armes à 1 main',
    twoHandedWeapons: 'Armes à 2 mains',
    wandOneHand: 'Baguette (1 main)',
    swordOneHand: 'Épée (1 main)',
    staffOneHand: 'Bâton (1 main)',
    clockHandOneHand: 'Aiguille (1 main)',
    cardsOneHand: 'Cartes (1 main)',
    swordTwoHanded: 'Épée (2 mains)',
    axeTwoHanded: 'Hache (2 mains)',
    staffTwoHanded: 'Bâton (2 mains)',
    hammerTwoHanded: 'Marteau (2 mains)',
    bowTwoHanded: 'Arc (2 mains)',
    shovelTwoHanded: 'Pelle (2 mains)',
    daggerSecondaryWeapon: 'Dague (Arme Secondaire)',
    shieldSecondaryWeapon: 'Bouclier (Arme Secondaire)',

    percentDamageInflicted: '% Dommages infligés',
    percentCriticalHit: '% Coup Critique',
    hp: 'PV',
    ap: 'PA',
    mp: 'PM',
    wp: 'PW',
    healthSteal: 'Vol de vie',
    range: 'PO',
    prospecting: 'Prospection',
    wisdom: 'Sagesse',
    control: 'Contrôle',
    percentBlock: '% Parade',
    movementPoints: 'Movement Points', // NEEDS TRANSLATION

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
    waterResistance: 'Résistance Eau',
    earthResistance: 'Résistance Terre',
    airResistance: 'Résistance Air',
    fireResistance: 'Résistance Feu',
    level: 'Niveau',
    name: 'Nom',
    elementalMastery: 'Maîtrise élémentaire',
    waterMastery: 'Maîtrise Eau',
    earthMastery: 'Maîtrise Terre',
    airMastery: 'Maîtrise Air',
    fireMastery: 'Maîtrise Feu',

    percentArmorGiven: '% Armure donnée',
    percentArmorReceived: '% Armure reçue',
    percentHealsPerformed: '% Soins réalisés',
    percentIndirectDamageInflicted: '% Dommages indirects infligés',
    dodgeOverride: 'Ignorer l\'esquive',
    percentHealsReceived: '% Soins reçus',
    healthFromLevel: 'Points de vie par niveau',
    lockOverride: 'Ignorer le tacle',
    percentHealthPoints: '% Points de Vie',
    lockDoubled: 'Tacle Augmenté',
    dodgeFromLevel: 'Esquive par niveau',
    lockFromLevel: 'Tacle par niveau',
    percentDodge: '% Esquive',

    remove: 'Remove', // NEEDS TRANSLATION
  },
  confirms: {
    irreversable: 'Are you sure? This is irreversible.', // NEEDS TRANSLATION
    areYouSure: 'Are you sure?', // NEEDS TRANSLATION
    willReplaceItems: 'Are you sure? This will replace any other items you have equipped right now in conflicting slots.', // NEEDS TRANSLATION
  },
};
