// https://wakfu.cdn.ankama.com/gamedata/1.81.1.13/(type).json

const fs = require('fs');

const jsonItemData = fs.readFileSync('./items.json');
const itemData = JSON.parse(jsonItemData);

const jsonEquipmentItemTypeData = fs.readFileSync('./equipmentItemTypes.json');
const equipmentItemTypeData = JSON.parse(jsonEquipmentItemTypeData);

const jsonItemTypeData = fs.readFileSync('./itemTypes.json');
const itemTypeData = JSON.parse(jsonItemTypeData);

const jsonItemPropertiesData = fs.readFileSync('./itemProperties.json');
const itemPropertiesData = JSON.parse(jsonItemPropertiesData);
const fixedItemProperties = [
  {
    id: itemPropertiesData[0].id,
    name: itemPropertiesData[0].name,
    description: 'Treasure Item (special interface)',
  },
  {
    id: itemPropertiesData[1].id,
    name: itemPropertiesData[1].name,
    description: 'Shop Item (item available only in the shop)',
  },
  {
    id: itemPropertiesData[2].id,
    name: itemPropertiesData[2].name,
    description: 'Relic, only one item with this property can be equipped at a time',
  },
  {
    id: itemPropertiesData[3].id,
    name: itemPropertiesData[3].name,
    description: 'Epic, only one item with this property can be equipped at a time',
  },
  {
    id: itemPropertiesData[4].id,
    name: itemPropertiesData[4].name,
    description: 'Non-recyclable (cannot be placed in a crusher)',
  },
  {
    id: itemPropertiesData[5].id,
    name: itemPropertiesData[5].name,
    description: 'Has an epic gem slot',
  },
  {
    id: itemPropertiesData[6].id,
    name: itemPropertiesData[6].name,
    description: 'Has a relic gem slot',
  },
];

const jsonActionsData = fs.readFileSync('./actions.json');
const actionsData = JSON.parse(jsonActionsData);

const LONG_EFFECT_ENTRIES = [1068, 1069];

let formattedItemData = [];

const processItemData = () => {
  itemData.forEach((itemObject) => {
    let newItem = {};

    newItem.id = itemObject.definition.item.id;
    newItem.name = itemObject.title.en;
    newItem.description = itemObject.description?.en;
    newItem.level = itemObject.definition.item.level;
    newItem.rarity = itemObject.definition.item.baseParameters.rarity;

    newItem.imageId = itemObject.definition.item.graphicParameters.gfxId;

    newItem.equipEffects = getItemEffects(itemObject.definition.equipEffects);

    newItem.type = getItemType(itemObject.definition.item.baseParameters.itemTypeId);
    newItem.properties = getItemProperties(itemObject.definition.item.properties);

    formattedItemData.push(newItem);
  });
};

const getItemType = (itemTypeId) => {
  let type = {
    id: null,
    name: null,
    validSlots: [],
    disabledSlots: [],
  };

  if (itemTypeId === 812) {
    console.log('dafuq');
  }

  equipmentItemTypeData.forEach((entry) => {
    if (entry.definition.id === itemTypeId) {
      type.id = entry.definition.id;
      type.name = entry.title.en;
      type.validSlots = entry.definition.equipmentPositions;
      type.disabledSlots = entry.definition.equipmentDisabledPositions;
      return;
    }
  });

  if (type.id === null) {
    itemTypeData.forEach((entry) => {
      if (entry.definition.id === itemTypeId) {
        type.id = entry.definition.id;
        type.name = entry.title.en;
        type.validSlots = entry.definition.equipmentPositions;
        type.disabledSlots = entry.definition.equipmentDisabledPositions;
        return;
      }
    });
  }

  return type;
};

const getItemProperties = (properties) => {
  let itemProperties = [];
  fixedItemProperties.forEach((property) => {
    if (properties.includes(property.id)) {
      itemProperties.push(property);
    }
  });

  return itemProperties;
};

const getItemEffects = (equipEffects) => {
  if (equipEffects.length === 0) {
    return null;
  }

  let newEffects = [];

  equipEffects.forEach((effectObject) => {
    let newEffect = {
      id: null,
      values: null,
      description: null,
    };

    const targetActionId = effectObject.effect.definition.actionId;

    actionsData.forEach((action) => {
      if (action.definition.id === targetActionId) {
        newEffect.id = action.definition.id;
        newEffect.values = effectObject.effect.definition?.params;
        newEffect.description = action.description?.en;
        newEffect.longEntry = LONG_EFFECT_ENTRIES.includes(action.definition.id);
      }
    });

    newEffects.push(newEffect);
  });

  let shortEffects = [];
  let longEffects = [];

  newEffects.forEach((effect) => {
    if (effect.longEntry) {
      longEffects.push(effect);
    } else {
      shortEffects.push(effect);
    }
  });

  let sortedEffects = [...shortEffects, ...longEffects];

  return sortedEffects;
};

const writeItemDataToFile = (jsonData) => {
  let jsonFilePath = '../../src/models/item_data.json';
  fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
    } else {
      //   console.log('JSON data has been written to', jsonFilePath);
    }
  });
};

processItemData();

writeItemDataToFile(formattedItemData);
