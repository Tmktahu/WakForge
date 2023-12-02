// https://wakfu.cdn.ankama.com/gamedata/(version)/(type).json
// CURRENT VERSION SAVED HERE = 1.81.1.15

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

const NEGATIVE_EFFECTS = [21, 40, 42, 56, 57, 90, 96, 97, 98, 100, 130, 132, 161, 168, 172, 174, 176, 181, 192, 194, 876, 1056, 1059, 1060, 1061, 1062, 1063];
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

    if (newItem.type.id === 811) {
      newItem.shardsParameters = itemObject.definition.item.shardsParameters;
    }

    if (newItem.type.id === 812) {
      newItem.sublimationParameters = itemObject.definition.item.sublimationParameters;
    }

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

  equipmentItemTypeData.forEach((entry) => {
    if (entry.definition.id === itemTypeId) {
      type.id = entry.definition.id;
      type.name = entry.title.en;
      type.validSlots = entry.definition.equipmentPositions;
      type.disabledSlots = entry.definition.equipmentDisabledPositions;

      if (type.id === 611) {
        type.validSlots = ['MOUNT'];
      }
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

        if (type.id === 611) {
          type.validSlots = ['MOUNT'];
        }
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

        if (targetActionId === 39 && effectObject?.effect?.definition?.description?.en?.includes('Armor received')) {
          // armor received stat
          newEffect.id = 10000; // we use this custom ID
          newEffect.description = effectObject.effect.definition.description.en; // we use this description
        }

        if (targetActionId === 39 && effectObject?.effect?.definition?.description?.en?.includes('Armor given')) {
          // armor given stat
          newEffect.id = 10001; // we use this custom ID
          newEffect.description = effectObject.effect.definition.description.en; // we use this description
        }

        // random mastery
        if (action.definition.id === 1068) {
          newEffect.masterySlot1 = { type: 'empty', value: 0 };
          newEffect.masterySlot2 = effectObject.effect.definition?.params[2] > 1 ? { type: 'empty', value: 0 } : undefined;
          newEffect.masterySlot3 = effectObject.effect.definition?.params[2] > 2 ? { type: 'empty', value: 0 } : undefined;
        }

        // random resistance
        if (action.definition.id === 1069) {
          newEffect.resistanceSlot1 = { type: 'empty', value: 0 };
          newEffect.resistanceSlot2 = effectObject.effect.definition?.params[2] > 1 ? { type: 'empty', value: 0 } : undefined;
          newEffect.resistanceSlot3 = effectObject.effect.definition?.params[2] > 2 ? { type: 'empty', value: 0 } : undefined;
        }

        if (NEGATIVE_EFFECTS.includes(newEffect.id)) {
          newEffect.values[0] = newEffect.values[0] * -1;
        }
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
