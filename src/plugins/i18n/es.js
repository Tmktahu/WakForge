import esItemTranslations from './itemTranslations/es_items.json';

export const es = {
  items: esItemTranslations,
  app: {
    disclaimer: 'WAKFU es un MMORPG publicado por Ankama. "WakForge" es un sitio web no oficial sin ningún vínculo con Ankama.',
  },
  sidebar: {
    charactersTab: 'Personajes',
    dataTab: 'Datos',
    discordTab: 'Discord',
    githubTab: 'GitHub',
    language: 'Language', // NEEDS TRANSLATION
    english: 'English', // NEEDS TRANSLATION
    spanish: 'Spanish', // NEEDS TRANSLATION
    french: 'French', // NEEDS TRANSLATION
  },
  charactersPage: {
    title: 'Bienvenido a Wakforge',
    description: 'Si encuentras cualquier problema, siéntete libre de escribirle a Fryke (fryke) en Discord.',
    codeInputLabel: 'Build Code',
    codeInputPlaceholder: 'Ingresa tu Build Code',
    codeInputButton: 'Crear desde Build Code',
    invalidBuildCode: 'Build code es inválido.',
    savedCharactersTitle: 'Personajes Guardados',
    createNewCharacterButton: 'Crea un nuevo Personaje',
  },
  dataPage: {
    title: 'Gestión de datos de la aplicación',
    importDescription: 'Aquí puedes cargar un archivo JSON para importar personajes.',
    selectJson: 'Selecciona el archivo JSON',
    dragOrDrop: 'O arrastra y suelta un archivo JSON aquí.',
    dataNotRecognized: 'Los datos actuales no se reconocen como datos de WakForge.',
    beforeImport: 'Antes de que puedas importar personajes, se comprobará aquí la versión de los datos importados.',
    needsMigration:
      'Parece que tus datos proceden de una versión antigua, por lo que es necesario actualizarlos antes de poder utilizarlos. Se trata de una operación segura que no modificará de forma permanente los datos existentes.',
    goodToGo: 'Tus datos están listos.',
    dataSize: 'Tamaño de los datos',
    numberOfCharacters: 'Número de personajes',
    noCharactersFound: 'No se han encontrado personajes',
    operatesOffLocalstorage: 'WakForge funciona con datos guardados localmente en tu navegador a través de LocalStorage.',
    currentLocalstorageKey: 'La clave actual para los datos de LocalStorage es',
    storageLimit: 'LocalStorage tiene un límite de tamaño de almacenamiento de 10 MB.',
    currentStorageSize: 'Su almacenamiento tiene un tamaño actual de',
    contactForHelp: 'Si alguna vez te acercas a este límite, ponte en contacto con Fryke (fryke) en Discord.',
    warning: 'ADVERTENCIA',
    warningMessage:
      'Editar sus datos directamente en LocalStorage es peligroso y podría causar daños irreparables a sus datos. Hazlo únicamente después de haber hecho una copia de seguridad y comprender qué estás haciendo.',
    mustDownloadFirst: 'Debes descargar primero una copia de seguridad de tus datos.',
    invalidJSON: 'Esto es JSON inválido',
    saveToLocalstorage: 'Guardar en LocalStorage',
    downloadData: 'Descargar los datos actuales',
    deleteAllData: 'Borrar todos los datos',
    migrateData: 'Migrar los datos',
    importCharacters: 'Importar los personajes seleccionados',
    noDataFound: 'No se han encontrado datos',
  },
  characterSheet: {
    selectAClass: 'Selecciona una Clase',
    level: 'Nivel',
    buildCopyPaste: 'Puedes copiar y pegar este código para compartir la build con otras personas',
    buildCode: 'Build Code',
    copy: 'Copiar',
    characteristics: 'Características',
    equipment: 'Equipamiento',
    autoItemSolver: 'Auto Item Solver',
    runesAndSubs: 'Engraces y Sublimaciones (WIP)',
    spellsAndPassives: 'Hechizos y Pasivas',
    codeDisclaimer: 'Yes, this is intentional. Do not be afraid.', // NEEDS TRANSLATION
    codeInfo:
      'These characters are intentional. To make the code small enough, we delved into the dark depths of base2048 encoding. Behold the runic majesty of the Build Code. May it bring you enlightenment.', // NEEDS TRANSLATION

    statsDisplay: {
      ar: 'AR',
      qb: 'BC',
      elementalMasteries: 'Maestrías Elementales',
      water: 'Agua',
      air: 'Aire',
      earth: 'Tierra',
      fire: 'Fuego',
      elmentalResistances: 'Resistencias Elementales',
      battle: 'Combate',
      damageInflicted: 'Daños Finales',
      criticalHit: 'Golpe Crítico',
      healsPerformed: 'Curas Finales',
      block: 'AAnticipación',
      secondary: 'Secundario',
      armorGiven: 'Armadura Dada',
      armorReceived: 'Armodura Recibida',
      indirectDamage: 'Daños Indirectos',
    },

    characteristicsContent: {
      points: 'Puntos',
      intelligence: 'Inteligencia',
      barrier: 'Parapeto',
      percentArmorHealthPoints: '% de puntos de vida en armadura',
      strength: 'Fuerza',
      elementalMastery: 'Dominio Elemental',
      healthPoints: 'Puntos de vida',
      agility: 'Agilidad',
      lockAndDodge: 'Placaje y esquiva',
      fortune: 'Suerte',
      major: 'Mayor',
      movementPointsAndDamage: 'Puntos de movimiento y daños',
      rangeAndDamage: 'Alcance y daños',
      controlAndDamage: 'Control y daños',
    },

    equipmentContent: {
      sortBy: 'Ordenar por',
      resultsOutOf: 'Resultados de',
      itemsTotal: 'Objetos en Total',
      displayStats: 'Mostrar Stats',
      itemLevel: 'Nivel de Objeto',
      openEncyclopediaPage: 'Abrir la página de la enciclopedia',
      noItemsFound: 'No se han encontrado objetos con estos filtros. Por favor, compruebe su búsqueda.',
      hasRelicWarning: 'Ya tienes un objeto Reliquia equipado. Al hacer esto, lo quitarás. ¿Estás seguro?',
      hasEpicWarning: 'Ya tienes un objeto Épico equipado. Al hacer esto, lo quitarás. ¿Estás seguro?',
      twoHandedWeaponWarning: 'Esta es un arma a dos manos, y tienes un objeto en tu segunda ranura de arma. ¿Estás seguro?',
      secondWeaponWarning: 'Tienes un arma a dos manos equipada. Al hacer esto, te la quitaras. ¿Estás seguro?',
      relicAndTwoHandedWarning:
        'Tienes un objeto en tu segunda ranura de arma y un objeto Reliquia ya equipado. Ambos serán removidos si haces esto. ¿Estás seguro?',
      relicAndSecondWeaponWarning: 'Ya tienes un arma a dos manos y un objeto Reliquia equipados. Ambos serán removidos si haces esto. ¿Estás seguro?',
      epicAndTwoHandedWarning:
        'Tienes un objeto en tu segunda ranura de arma y un objeto Épico ya equipado. Ambos serán removidos si haces esto. ¿Estás seguro?',
      epicAndSecondWeaponWarning: 'Ya tienes equipados un arma a dos manos y un objeto Épico ya equipiado. Ambos serán removidos si haces esto. ¿Estás seguro?',

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

    percentDamageInflicted: '% de daños causados',
    percentCriticalHit: '% de golpe crítico',
    hp: 'PdV',
    ap: 'PA',
    mp: 'PM',
    wp: 'PW',
    healthSteal: 'Health Steal', // NEEDS TRANSLATION
    range: 'Alcance',
    prospecting: 'Prospección',
    wisdom: 'Sabiduría',
    control: 'Control',
    percentBlock: '% de anticipación',

    meleeMastery: 'Dominio de melé',
    distanceMastery: 'Dominio distancia',
    lock: 'Placaje',
    dodge: 'Esquiva',
    initiative: 'Iniciativa',
    forceOfWill: 'Voluntad',
    criticalMastery: 'Dominio Crítico',
    rearMastery: 'Dominio Espalda',
    berserkMastery: 'Dominio Berserker',
    healingMastery: 'Dominio Cura',
    rearResistance: 'Resistencia por la espalda',
    criticalResistance: 'Resistencia Critica',
    actionPoints: 'Puntos de Acción',
    wakfuPoints: 'Puntos Wakfu',
    elementalResistance: 'Resistencia Elemental',
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
    randElemMastery: 'Random Elemental Masteries', // NEEDS TRANSLATION
    randElemResistances: 'Random Elemental Resistances', // NEEDS TRANSLATION
    harvestingQuantity: 'Harvesting Quantity', // NEEDS TRANSLATION

    percentArmorGiven: '% Armor Given', // NEEDS TRANSLATION
    percentArmorReceived: '% Armor Received', // NEEDS TRANSLATION
    percentHealsPerformed: '% Heals Performed', // NEEDS TRANSLATION
    percentIndirectDamageInflicted: '% Indirect Damage Inflicted', // NEEDS TRANSLATION
    dodgeOverride: 'Dodge Override', // NEEDS TRANSLATION
    percentHealsReceived: '% de curas recibidas',
    healthFromLevel: 'Health Points from Level', // NEEDS TRANSLATION
    lockOverride: 'Lock Override', // NEEDS TRANSLATION
    percentHealthPoints: '% de Puntos de Vida',
    lockDoubled: 'Lock Doubled', // NEEDS TRANSLATION
    dodgeFromLevel: 'Dodge from Level', // NEEDS TRANSLATION
    lockFromLevel: 'Lock from Level', // NEEDS TRANSLATION
    percentDodge: '% Dodge', // NEEDS TRANSLATION
  },
};
