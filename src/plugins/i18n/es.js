/* eslint-disable quotes */
import esItemTranslations from './itemTranslations/es_items.json';
import esStatesTranslations from './statesTranslations/es_states.json';

export const es = {
  items: esItemTranslations,
  states: esStatesTranslations,
  app: {
    disclaimer: 'WAKFU es un MMORPG publicado por Ankama. "WakForge" es un sitio web no oficial sin ningún vínculo con Ankama.',
    globalErrorMessage: 'Se ha producido un error grave que ha detenido el correcto funcionamiento de la aplicación.',
    globalErrorContact: 'Ponte en contacto con Fryke en Discord lo antes posible con la información que aparece debajo.',
    ignoreGlobalError: 'Ignorar Error',
    discordServer: 'Servidor de Discord',
    downloadData: 'Descargar los datos actuales',
  },
  oldDataDialog: {
    migrateOldData: 'Migrar datos Antiguos',
    oldDataDetected: 'Se ha detectado una estructura de datos de almacenamiento antigua y debe actualizarse antes de poder utilizar la aplicación.',
    reloadNotice: 'Una vez finalizada la actualización, esta página volverá a cargarse.',
    backupReccomendation:
      'Se recomienda realizar una copia de seguridad de tus datos actuales antes de intentar actualizar a una nueva estructura. Jimmy intenta realizar esto automáticamente por ti, pero siempre hay chances de que algo suceda con la actualización.',
    ifUpdateFails:
      'Si la actualización sale mal y pierdes tus datos, no te preocupes. Mientras tengas una copia de seguridad JSON podrás recuperarlo todo. No dudes en ponerte en contacto con Fryke (fryke) directamente en Discord para obtener ayuda.',
    downloadCurrentData: 'Descargar datos Actuales',
    updatingPleaseWait: 'Actualizando datos. Por favor espera',
    updateData: 'Datos Actualizados a la nueva Estructura',
    mustDownloadFirst: 'Debes descargar primero una copia de seguridad de tus datos.',
  },
  sidebar: {
    charactersTab: 'Personajes',
    dataTab: 'Datos',
    guidesTab: 'Guías',
    discordTab: 'Discord',
    githubTab: 'GitHub',
    language: 'Idioma',
    english: 'Inglés',
    spanish: 'Español',
    french: 'Francés',
    portuguese: 'Portugués',
    theme: 'Temas',
    colorTheme: 'Color del Tema',
    amakna: 'Amakna',
    bonta: 'Bonta',
    brakmar: 'Brakmar',
    sufokia: 'Sufokia',
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
    createNewGroupButton: 'Crear un Nuevo Grupo',
    newGroup: 'Nuevo Grupo',
  },
  guidesPage: {
    title: 'Guías Generales',
    description: 'Aqui puedes encontrar Guías Generales del juego. Si estas buscando alguna clase en especifico, revisa el apartado de Guias dentro de alguna de tus Builds.',
    searchGuides: 'Buscar Guías ...',
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
    invalidJSON: 'Esto es JSON inválido',
    saveToLocalstorage: 'Guardar en LocalStorage',
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
    characteristicsAndSpells: 'Características y Hechizos',
    equipment: 'Equipamiento',
    autoItemSolver: 'Auto Item Solver',
    runesAndSubs: 'Engraces y Sublimaciones',
    spellsAndPassives: 'Hechizos y Pasivas',
    codeDisclaimer: 'Sí, esto es intencional. Hablamos Runico.',
    codeInfo:
      'Estos caracteres son intencionados. Para que el código fuera lo suficientemente pequeño, nos adentramos en las oscuras profundidades de la codificación base2048. Contempla la majestuosidad rúnica del código de construcción.',

    statsDisplay: {
      ar: 'AR',
      qb: 'BC',
      water: 'Agua',
      air: 'Aire',
      earth: 'Tierra',
      fire: 'Fuego',
      elmentalResistances: 'Resistencias Elementales',
      battle: 'Combate',
      criticalHit: 'Golpe Crítico',
      block: 'Anticipación',
      secondary: 'Secundario',
      armorReceived: 'Armodura Recibida',
      indirectDamage: 'Daños Indirectos',
      statsSummary: 'Resumen de los stats',
      effectiveHpAgainst: 'PdV efectivos contra tipo {type}',
      numSelected: '{num} Dominios Seleccionados',
    },

    guidesContent: {
      doYouHaveAGuide: '¿Tienes una guía que te gustaría incluir aquí? Ponte en contacto con nosotros en el servidor Discord. Nos encantaría añadirla.',
      classGuides: 'Guías de {class}',
      openGuide: 'Abrir Guía',
    },

    characteristicsContent: {
      points: 'Puntos',
      intelligence: 'Inteligencia',
      barrier: 'Parapeto',
      percentArmorHealthPoints: '% de Puntos de Vida en Armadura',
      strength: 'Fuerza',
      elementalMastery: 'Dominio Elemental',
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
      newSort: 'Nueva Ordenación',
      resultsOutOf: 'Resultados de',
      itemsTotal: 'Objetos en Total',
      displayStats: 'Mostrar Stats',
      displayTotals: 'Mostrar Totales',
      compareToEquipped: 'Comparar con Equipados',
      itemLevel: 'Nivel de Objeto',
      noItemsFound: 'No se han encontrado objetos con estos filtros. Por favor, compruebe su búsqueda.',
      hasRelicWarning: 'Ya tienes un objeto Reliquia equipado. Al hacer esto, lo quitarás. ¿Estás seguro?',
      hasEpicWarning: 'Ya tienes un objeto Épico equipado. Al hacer esto, lo quitarás. ¿Estás seguro?',
      twoHandedWeaponWarning: 'Esta es un arma a dos manos, y tienes un objeto en tu segunda ranura de arma. ¿Estás seguro?',
      secondWeaponWarning: 'Tienes un arma a dos manos equipada. Al hacer esto, te la quitaras. ¿Estás seguro?',
      relicAndTwoHandedWarning: 'Tienes un objeto en tu segunda ranura de arma y un objeto Reliquia ya equipado. Ambos serán removidos si haces esto. ¿Estás seguro?',
      relicAndSecondWeaponWarning: 'Ya tienes un arma a dos manos y un objeto Reliquia equipados. Ambos serán removidos si haces esto. ¿Estás seguro?',
      epicAndTwoHandedWarning: 'Tienes un objeto en tu segunda ranura de arma y un objeto Épico ya equipado. Ambos serán removidos si haces esto. ¿Estás seguro?',
      epicAndSecondWeaponWarning: 'Ya tienes equipados un arma a dos manos y un objeto Épico ya equipiado. Ambos serán removidos si haces esto. ¿Estás seguro?',
      randomResistanceDefaults: 'Random Resistance Defaults', // NEEDS TRANSLATION
      randomMasteryDefaults: 'Random Mastery Defaults', // NEEDS TRANSLATION
      masteryAssignment: '+{num} Mastery Assignment', // NEEDS TRANSLATION
      resistanceAssignment: '+{num} Resistance Assignment', // NEEDS TRANSLATION
      applyToAllItems: 'Apply to all Items', // NEEDS TRANSLATION

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
        ctrlClickToSelectOne: 'CTRL-Click to select one and remove all others.',
      },
    },

    itemSolverContent: {
      considerCurrentItems: 'Considerar los objetos actuales',
      considerCurrentItemsTooltip: '¿Deben tenerse en cuenta los elementos actualmente equipados?',
      numElements: 'Número de elementos',
      apTooltip: 'Cuántos Puntos de Acción quieres en total.',
      mpTooltip: 'Cuántos Puntos de Movimiento quieres en total.',
      rangeTooltip: 'Cuánto Alcance quieres en total.',
      wakfuTooltip: 'Cuántos puntos Wakfu quieres en total.',
      numElementsTooltip: 'Cuántos tipos de elementos quieres en cada objeto..',
      meleeMasteryTooltip: '¿Debe incluirse Dominio de Melé si es posible?',
      distanceMasteryTooltip: '¿Debe incluirse Dominio Distancia si es posible?',
      healingMasteryTooltip: '¿Debe incluirse Dominio Cura si es posible?',
      rearMasteryTooltip: '¿Debe incluirse Dominio Espalda si es posible?',
      berserkMasteryTooltip: '¿Debe incluirse Dominio Berserker si es posible?',
      poweredBy: 'Gracias al código de {credit}.',
      problemMessage: 'Ha habido un problema con el solucionador automático. Si crees que se trata de un error, ponte en contacto con Fryke en Discord.',
      generateItemSet: 'Generar conjunto de objetos',
      regenerateItemSet: 'Re-Generar conjunto de objetos',
      instructions: 'Introduce los parámetros y haz clic en "Generar conjunto de artículos"..',
      ifYouNeedHelp: 'Si necesitas ayuda, no dudes en preguntarnos en Discord.',
      loadingMessage: 'Jimmy está haciendo los cálculos y todo eso... Por favor, espera...',
      loadingDisclaimer: 'Tenga en cuenta que, dependiendo de las preferencias anteriores, esto puede llevar algún tiempo.',
      equipAllItems: 'Equipar todos los objetos',
      normal: 'Normal',
      prioritized: 'Priorizar',
      preferNoNegatives: 'Prefiero no negativos',
      heavilyPreferNoNegatives: 'Priorizar no negativos',
      targetStatsInfo: 'Estas son las estadísticas objetivo totales que quieres para toda la build.',
      prioritiesInfo: 'Estas son las prioridades en las que quieres que se consideren los distintos dominios.',
      elementaryMasteryInfo: '¿Qué dominios elementales deben priorizarse? Esto también afectará al número de ranuras de elementos aleatorios que elige el solucionador.',
      sinbadErrorInfo: ' Si ves esto, ponte en contacto con Keeper of Time (sinbad) en Discord con la siguiente información.',
      priorities: 'Prioridades',
      totalTargetStats: 'Estadísticas totales objetivo',
      apWarning: 'Estás pidiendo al menos 6 PA procedentes de los objetos, lo que puede ser imposible.',
      rangeForLevelWarning: 'Puede que estés pidiendo más alcance del que es posible a tu nivel.',
      rangeImpossibleWarning: 'Puede que estés pidiendo más alcance del que es posible.',
      combinedApMpWarning: 'Puede que estés pidiendo una cantidad combinada de PA+PM que no sea posible en tu nivel.',
      showAllItems: 'Mostrar todos los items',
      displayTotals: 'Mostrar Totales',
      itemSources: 'Origen de los Items',
      itemSourcesInfo: 'Esto te permite seleccionar el origen de los Items que quieres considerar.',
      archmonsters: 'ArchiMonstruos',
      hordes: 'Hordas',
      battlefields: 'Campos de Batalla',
      ultimateBosses: 'Ultimate Bosses',
      excludedItems: 'Items Excluidos',
      excludedItemsInfo: 'Estos Items están excluidos del posible resultado.',
    },

    runesAndSubsContent: {
      hotkeysAndShortcuts: 'Teclas de acceso rápido y atajos',
      dragAndDrop: 'Arrastra y suelta las runas para asignarlas.',
      dragReplace: 'Arrastra una runa sobre otra para sustituirla.',
      ctrlClick: 'CTRL-Click en una runa para borrarla.',
      shiftClick: 'SHIFT-Click en una runa para cambiarla a blanca.',
      rightClick: 'RIGHT-Click en una runa para ver más opciones..',
      hightlightClick: 'Selecciona una ranura y haz clic en una runa de la derecha para asignarla.',
      runeLevelTooltip: `El máximo nivel de runa posible está ligado al nivel del objeto, pero para nuestros propósitos limitamos esta opción al nivel de tu personaje.`,
      runeLevel: 'Nivel de Runa',
      toggleWhite: 'Cambiar a blanco',
      removeAllRunes: 'Remover todas las Runas/Sublis',
      sortByMatching: 'Ordenar por coincidencias',
      sortByMatchingNote: 'Si una ranura de equipo está resaltada, esto ordenará las sublimaciones según coincidan con los colores de las runas de esa ranura de equipo.',
      searchSublimations: 'Buscar Sublimaciones...',
      searchEpicAndRelicSubs: 'Buscar Sublimaciones Épicas/Reliquias...',
      addsStateLevelsShort: '+{num_0} Niveles de',
      stateStackingWarning: 'Este estado sólo se acumula hasta el nivel {num_0}',
      relicSub: 'Sub Reliquia',
      epicSub: 'Sub Épica',
      itemMustBeEquipped: 'Se debe equipar un objeto',
    },

    spellsAndPassivesContent: {
      activeSpells: 'Hechizos Activos (WIP)',
      activesNote:
        'Los Hechizos Activos no tienen ninguna influencia directa en las estadísticas de una build, y son muy difíciles de analizar. No dispondremos de ellos durante algún tiempo.',
      passives: 'Pasivas',
      passivesNote: 'Si encuentras alguna pasiva que no aplique sus valores correctamente, por favor háznoslo saber en el Discord.',
    },
  },
  classes: {
    feca: 'Feca',
    osamodas: 'Osamodas',
    enutrof: 'Anutrof',
    sram: 'Sram',
    xelor: 'Xelor',
    ecaflip: 'Zurcarák',
    eniripsa: 'Aniripsa',
    iop: 'Yopuka',
    cra: 'Ocra',
    sadida: 'Sadida',
    sacrier: 'Sacrógrito',
    pandawa: 'Pandawa',
    rogue: 'Tymador',
    masqueraider: 'Zobal',
    ouginak: 'Uginak',
    foggernaut: 'Steamer',
    eliotrope: 'Selotrop',
    huppermage: 'Hipermago',
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

    epicSublimation: 'Sublimación Épica',
    relicSublimation: 'Sublimación Reliquia',

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
    movementPoints: 'Puntos de Movimiento',

    elementalMasteries: 'Maestrías Elementales',
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
    damageInflicted: 'Daños Finales',
    healsPerformed: 'Curas Finales',
    healsReceived: 'Curas Recibidas',
    armorGiven: 'Armadura Dada',
    healthPoints: 'Puntos de vida',

    remove: 'Remover',
  },
  confirms: {
    irreversable: '¿Estás seguro? Esto es irreversible.',
    areYouSure: '¿Estás seguro?',
    willReplaceItems: '¿Estás seguro? Esto reemplazará cualquier otro objeto que tengas equipado ahora mismo en ranuras en conflicto.',
    willDeleteCharacters: '¿Está seguro? Esto también borrará todos los caracteres del grupo.',
  },
  tooltips: {
    randomMasteryValue: '+{num_0} Dominio de {num_1} elementos aleatorios',
    randomResistanceValue: '+{num_0} Resistencia de {num_1} elementos aleatorios',
    addsStateLevels: 'Añade +{num_0} niveles de',
    stateAtLevel: '{state} Estado en el nivel {num_0} (Max {num_1})',
    missingInfoAboutState: 'Nos falta información sobre este estado. Si tienes alguna, háznoslo saber en el servidor Discord.',
    equipped: 'equipado',
    itemLevel: 'Nivel del objeto',
    openEncyclopediaPage: 'Abrir la página de la enciclopedia',
    totalMastery: 'Maestria Total',
    totalResistance: 'Resistencia total',
    yes: 'Si',
    no: 'No',
    excludeItem: 'Excluir Item',
    allowItem: 'Permitir Item',
  },
};
