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
  // level, int = target level, only supprts ALS levels rn (n mod 15 = 5)
  // class_ ClassNames, string
  // num_elements, int = should be a number from 1-4
  // dist, bool = distance mastery bool
  // melee, bool = melee mastery bool
  // force_items, array[ints] = array of item IDs to force
  // forbid_items, array[ints] = array of item IDs to exclude

  // let result = pythonPackage.v1_lv_class_solve(20, 'Feca', 3, dist, melee);

  let pythonParams = {
    lv: params.targetLevel,
    ap: params.targetApAmount,
    mp: params.targetMpAmount,
    wp: params.targetWpAmount,
    ra: params.targetRangeAmount,
    num_mastery: params.targetNumElements,
    dist: params.distanceMastery,
    melee: params.meleeMastery,
    zerk: params.berserkMastery,
    rear: params.rearMastery,
    heal: params.healingMastery,
    hard_cap_depth: 7, // hardcoded for now
    bcrit: 20, // hardcoded for now
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
