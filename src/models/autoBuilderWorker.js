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
    // ERROR STATE> HOW DO WE HANDLE THIS
    console.log(calculationResults[1]);
  }
};

const performCalculations = async ({ targetLevel, targetClass, distanceMastery, meleeMastery }) => {
  // level, int = target level, only supprts ALS levels rn (n mod 15 = 5)
  // class_ ClassNames, string
  // num_elements, int = should be a number from 1-4
  // dist, bool = distance mastery bool
  // melee, bool = melee mastery bool
  // force_items, array[ints] = array of item IDs to force
  // forbid_items, array[ints] = array of item IDs to exclude

  // let result = pythonPackage.v1_lv_class_solve(20, 'Feca', 3, dist, melee);
  console.log('python params =', targetLevel, PYTHON_CLASS_NAME_MAPPING[targetClass], distanceMastery, meleeMastery);
  let result = pythonPackage.v1_lv_class_solve(targetLevel, PYTHON_CLASS_NAME_MAPPING[targetClass], 2, distanceMastery, meleeMastery);

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
