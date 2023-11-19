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
    language: 'Idioma',
    english: 'Inglés',
    spanish: 'Español',
    french: 'Francés',
    theme: 'Theme', // NEEDS TRANSLATION
    colorTheme: 'Color Theme', // NEEDS TRANSLATION
    amakna: 'Amakna', // NEEDS TRANSLATION
    bonta: 'Bonta', // NEEDS TRANSLATION
    brakmar: 'Brakmar', // NEEDS TRANSLATION
    sufokia: 'Sufokia', // NEEDS TRANSLATION
  },
  charactersPage: {
    title: 'Bienvenido a Wakforge',
    description: 'Si encuentras cualquier problema, siéntete libre de escribirle a Fryke (fryke) en Discord. Traduccion realizada por Krieg (Discord: fl_cl)',
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
    codeDisclaimer: 'Sí, esto es intencional. Hablamos Runico.',
    codeInfo:
      'Estos caracteres son intencionados. Para que el código fuera lo suficientemente pequeño, nos adentramos en las oscuras profundidades de la codificación base2048. Contempla la majestuosidad rúnica del código de construcción.',

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
      block: 'Anticipación',
      secondary: 'Secundario',
      armorGiven: 'Armadura Dada',
      armorReceived: 'Armodura Recibida',
      indirectDamage: 'Daños Indirectos',
    },

    characteristicsContent: {
      points: 'Puntos',
      intelligence: 'Inteligencia',
      barrier: 'Parapeto',
      percentArmorHealthPoints: '% de Puntos de Vida en Armadura',
      strength: 'Fuerza',
      elementalMastery: 'Dominio Elemental',
      healthPoints: 'Puntos de vida',
      agility: 'Agilidad',
      lockAndDodge: 'Placaje y Esquiva',
      fortune: 'Suerte',
      major: 'Mayor',
      movementPointsAndDamage: 'Puntos de Movimiento y Daños',
      rangeAndDamage: 'Alcance y Daños',
      controlAndDamage: 'Control y Daños',
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
        searchItems: 'Buscar Objetos',
        resetFilters: 'Reiniciar Filtros',
        rarities: 'Rarezas',
        all: 'Todos',
        none: 'Ninguno',
        itemTypes: 'Tipos de Objetos',
        showAllFilters: 'Ver todos los filtros',
        newFilter: 'Nuevo Filtro',
        equalTo: 'Igual a',
        lessThanOrEqualTo: 'Menor o igual que',
        greaterThanOrEqualTo: 'Mayor o igual que',
        smallToBig: 'De pequeño a grande',
        bigToSmall: 'De grande a pequeño',
        healthPoints: 'Puntos de Vida (PdV)',
        randElemMasteryValue: 'Dominio Elemental Aleatorio',
        criticalHitChance: 'Probabilidad de Golpe Crítico',
        blockChance: 'Porcentaje de Ancticipacion',
        randElemResistanceValue: 'Resistencia Elemental Aleatoria',
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
    common: 'Común',
    unusual: 'Inusual',
    rare: 'Raro',
    mythical: 'Mítico',
    legendary: 'Legendario',
    relic: 'Reliquia',
    souvenir: 'Recuerdo',
    epic: 'Épico',

    helmet: 'Casco',
    breastplate: 'Coraza',
    epaulettes: 'Hombreras',
    boots: 'Botas',
    amulet: 'Amuleto',
    cloak: 'Capa',
    belt: 'Cinturón',
    primaryWeapon: 'Arma Principal',
    secondaryWeapon: 'Arma Secundaria',
    leftRing: 'Anillo Izquierdo',
    rightRing: 'Anillo Derecho',
    ring: 'Anillo',
    emblem: 'Emblema',
    pet: 'Mascota',
    pets: 'Mascotas',
    mount: 'Montura',
    mounts: 'Monturas',
    tool: 'Herramienta',
    torches: 'Antorchas',
    costumes: 'Trajes',
    sublimationScroll: 'Pergamino de Sublimación',
    enchantment: 'Runas',

    oneHandedWeapons: 'Armas a una Mano',
    twoHandedWeapons: 'Armas a dos Manos',
    wandOneHand: 'Varita (una mano)',
    swordOneHand: 'Espada (una mano)',
    staffOneHand: 'Bastón (una mano)',
    clockHandOneHand: 'Aguja (una mano)',
    cardsOneHand: 'Cartas (una mano)',
    swordTwoHanded: 'Espada (dos manos)',
    axeTwoHanded: 'Hacha (dos manos)',
    staffTwoHanded: 'Bastón (dos manos)',
    hammerTwoHanded: 'Martillo (dos manos)',
    bowTwoHanded: 'Arco (dos manos)',
    shovelTwoHanded: 'Pala (dos manos)',
    daggerSecondaryWeapon: 'Daga (arma secundaria)',
    shieldSecondaryWeapon: 'Escudo (arma secundaria)',

    percentDamageInflicted: '% de Daños Causados',
    percentCriticalHit: '% de Golpe Crítico',
    hp: 'PdV',
    ap: 'PA',
    mp: 'PM',
    wp: 'PW',
    healthSteal: 'Robo de vida',
    range: 'Alcance',
    prospecting: 'Prospección',
    wisdom: 'Sabiduría',
    control: 'Control',
    percentBlock: '% de Anticipación',
    movementPoints: 'Movement Points', // NEEDS TRANSLATION

    meleeMastery: 'Dominio de Melé',
    distanceMastery: 'Dominio Distancia',
    lock: 'Placaje',
    dodge: 'Esquiva',
    initiative: 'Iniciativa',
    forceOfWill: 'Voluntad',
    criticalMastery: 'Dominio Crítico',
    rearMastery: 'Dominio Espalda',
    berserkMastery: 'Dominio Berserker',
    healingMastery: 'Dominio Cura',
    rearResistance: 'Resistencia por la Espalda',
    criticalResistance: 'Resistencia Critica',
    actionPoints: 'Puntos de Acción',
    wakfuPoints: 'Puntos Wakfu',
    elementalResistance: 'Resistencia Elemental',
    waterResistance: 'Resistencia al Agua',
    earthResistance: 'Resistencia a la Tierra',
    airResistance: 'Resistencia al Aire',
    fireResistance: 'Resistencia al Fuego',
    level: 'Nivel',
    name: 'Nombre',
    elementalMastery: 'Dominio Elemental',
    waterMastery: 'Dominio de Agua',
    earthMastery: 'Dominio de Tierra',
    airMastery: 'Dominio de Aire',
    fireMastery: 'Dominio de Fuego',
    randElemMastery: 'Dominio Elemental Aleatorio',
    randElemResistances: 'Resistencia Elemental Aleatoria',
    harvestingQuantity: 'Cantidad de recolección',

    percentArmorGiven: '% Armadura Dada',
    percentArmorReceived: '% Armadura Recibida',
    percentHealsPerformed: '% Curas Realizadas',
    percentIndirectDamageInflicted: '% Daños Indirectos Infligidos',
    dodgeOverride: 'Ignorar Esquiva',
    percentHealsReceived: '% de Curas Recibidas',
    healthFromLevel: 'Puntos de Vida por Nivel',
    lockOverride: 'Ignorar Placaje',
    percentHealthPoints: '% de Puntos de Vida',
    lockDoubled: 'Placaje Aumentado',
    dodgeFromLevel: 'Esquiva por Nivel',
    lockFromLevel: 'Placaje por nivel',
    percentDodge: '% de Esquiva',

    remove: 'Remove', // NEEDS TRANSLATION
  },
  confirms: {
    irreversable: 'Are you sure? This is irreversible.', // NEEDS TRANSLATION
    areYouSure: 'Are you sure?', // NEEDS TRANSLATION
    willReplaceItems: 'Are you sure? This will replace any other items you have equipped right now in conflicting slots.', // NEEDS TRANSLATION
  },
};
