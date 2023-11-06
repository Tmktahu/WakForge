// eslint-disable-next-line no-undef
importScripts('https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js');

const PYTHON_CLASS_NAME_MAPPING = {
  feca: 'Feca',
  osamodas: 'Osa',
  enutrof: 'Enu',
  sram: 'Sram',
  xelor: 'Xel',
  ecaflip: 'Eca',
  eniripsa: 'Eni',
  iop: 'Iop',
  cra: 'Cra',
  sadida: 'Sadi',
  sacrier: 'Sac',
  pandawa: 'Panda',
  rogue: 'Rogue',
  masqueraider: 'Masq',
  ouginak: 'Ougi',
  foggernaut: 'Fog',
  eliotrope: 'Elio',
  huppermage: 'Hupper',
};

let calculationResults = null;
let pyodide = null;
let pythonPackage = null;

let params = null;
let itemData = null;
let ITEM_SLOT_SORT_ORDER = null;

const setup = async () => {
  // eslint-disable-next-line no-undef
  pyodide = await loadPyodide();

  await pyodide.loadPackage('micropip');
  const micropip = pyodide.pyimport('micropip');

  // After the next pyodide release, this can become micropip.install('msgspec');
  // see https://github.com/pyodide/pyodide/issues/4264
  console.log('Installing msgspec')
  await micropip.install('https://cdn.jsdelivr.net/gh/mikeshardmind/wakfu-utils@d4d24e1f631b5cf99ee1d9a7ee18bb8bd954fe9c/msgspec-0.18.4-cp311-cp311-emscripten_3_1_45_wasm32.whl');

  // we use micropip to install the auto builder package
  console.log('Setting up the AutoBuild package loaded.');

  await micropip.install('wakautosolver');
  console.log('AutoBuild package installed.');

  // then we import the auto builder package
  pythonPackage = pyodide.pyimport('wakautosolver');
  console.log('AutoBuild package loaded.');

  postMessage('workerReady');
};

const calculateBuild = async () => {
  await performCalculations(params);

  if (calculationResults?.[0]?.length) {
    collectItems();
  } else {
    postMessage(calculationResults[1]);
  }
};

const performCalculations = async (params) => {
  let currentStatParams = {
    ap: params.currentCharacter.actionPoints,
    mp: params.currentCharacter.movementPoints,
    wp: params.currentCharacter.stats.range,
    ra: params.currentCharacter.wakfuPoints,
    crit: params.currentCharacter.stats.criticalHit,
    crit_mastery: params.currentCharacter.masteries.critical,
    elemental_mastery: null,
    one_element_mastery: null,
    two_element_mastery: null,
    three_element_mastery: null,
    distance_mastery: params.currentCharacter.masteries.distance,
    rear_mastery: params.currentCharacter.masteries.rear,
    heal_mastery: params.currentCharacter.masteries.healing,
    beserk_mastery: params.currentCharacter.masteries.berserk,
    melee_mastery: params.currentCharacter.masteries.melee,
    control: params.currentCharacter.stats.control,
    block: params.currentCharacter.stats.block,
    fd: null,
    heals_performed: params.currentCharacter.stats.healsPerformed,
    lock: params.currentCharacter.stats.lock,
    dodge: params.currentCharacter.stats.dodge,
  };

  let targetStatParams = {
    ap: params.targetStats.actionPoints,
    mp: params.targetStats.movementPoints,
    ra: params.targetStats.range,
    wp: params.targetStats.wakfuPoints,
  };

  let currentStats = pythonPackage.Stats.callKwargs(currentStatParams);
  let targetStats = pythonPackage.SetMinimum.callKwargs(targetStatParams);

  let pythonParams = {
    lv: params.targetLevel,

    stats: currentStats,
    target_stats: targetStats,

    equipped_items: params.currentItemIds,
    num_mastery: params.targetNumElements,
    allowed_rarities: params.selectedRarityIds,

    dist: params.distanceMastery,
    melee: params.meleeMastery,
    heal: params.healingMastery,
    zerk: params.berserkMastery,
    rear: params.rearMastery,
    hard_cap_depth: 7, // hardcoded for now
    dry_run: false,
  };

  console.log('Python Params (useful for debugging if you need them)', pythonParams);

  let config = pythonPackage.Config.callKwargs(pythonParams);
  let result = pythonPackage.solve_config(config);

  calculationResults = result;
};

const collectItems = () => {
  let itemIds = calculationResults[0];
  let items = [];
  itemData.forEach((item) => {
    if (itemIds.includes(item.id)) {
      items.push(item);
    }
  });

  items.sort((entry1, entry2) => {
    return ITEM_SLOT_SORT_ORDER.indexOf(entry1.type.validSlots[0]) - ITEM_SLOT_SORT_ORDER.indexOf(entry2.type.validSlots[0]);
  });

  postMessage({ items });
};

setup();

onmessage = async (event) => {
  params = event.data.params;
  itemData = event.data.itemData;
  ITEM_SLOT_SORT_ORDER = event.data.ITEM_SLOT_SORT_ORDER;

  calculateBuild();
};
