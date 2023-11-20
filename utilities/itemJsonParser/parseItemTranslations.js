// https://wakfu.cdn.ankama.com/gamedata/1.81.1.13/(type).json

const fs = require('fs');

const jsonItemData = fs.readFileSync('./items.json');
const itemData = JSON.parse(jsonItemData);

// const jsonEquipmentItemTypeData = fs.readFileSync('./equipmentItemTypes.json');
// const equipmentItemTypeData = JSON.parse(jsonEquipmentItemTypeData);

// const jsonItemTypeData = fs.readFileSync('./itemTypes.json');
// const itemTypeData = JSON.parse(jsonItemTypeData);

// const jsonItemPropertiesData = fs.readFileSync('./itemProperties.json');
// const itemPropertiesData = JSON.parse(jsonItemPropertiesData);
// const fixedItemProperties = [
//   {
//     id: itemPropertiesData[0].id,
//     name: itemPropertiesData[0].name,
//     description: 'Treasure Item (special interface)',
//   },
//   {
//     id: itemPropertiesData[1].id,
//     name: itemPropertiesData[1].name,
//     description: 'Shop Item (item available only in the shop)',
//   },
//   {
//     id: itemPropertiesData[2].id,
//     name: itemPropertiesData[2].name,
//     description: 'Relic, only one item with this property can be equipped at a time',
//   },
//   {
//     id: itemPropertiesData[3].id,
//     name: itemPropertiesData[3].name,
//     description: 'Epic, only one item with this property can be equipped at a time',
//   },
//   {
//     id: itemPropertiesData[4].id,
//     name: itemPropertiesData[4].name,
//     description: 'Non-recyclable (cannot be placed in a crusher)',
//   },
//   {
//     id: itemPropertiesData[5].id,
//     name: itemPropertiesData[5].name,
//     description: 'Has an epic gem slot',
//   },
//   {
//     id: itemPropertiesData[6].id,
//     name: itemPropertiesData[6].name,
//     description: 'Has a relic gem slot',
//   },
// ];

// const jsonActionsData = fs.readFileSync('./actions.json');
// const actionsData = JSON.parse(jsonActionsData);

// const LONG_EFFECT_ENTRIES = [1068, 1069];

// We map the translations to the item ID for each language individually
let englishTranslationData = {};
let spanishTranslationData = {};
let frenchTranslationData = {};
let portugueseTranslationData = {};

const processItemTranslationData = () => {
  itemData.forEach((itemObject) => {
    let itemId = itemObject.definition.item.id;

    // eslint-disable-next-line quotes
    englishTranslationData[itemId] = `{'${itemObject.title.en.replaceAll(`'`, "'}{'\\''}{'")}'}`;
    // eslint-disable-next-line quotes
    spanishTranslationData[itemId] = `{'${itemObject.title.es.replaceAll(`'`, "'}{'\\''}{'")}'}`;
    // eslint-disable-next-line quotes
    frenchTranslationData[itemId] = `{'${itemObject.title.fr.replaceAll(`'`, "'}{'\\''}{'")}'}`;
    // eslint-disable-next-line quotes
    portugueseTranslationData[itemId] = `{'${itemObject.title.pt.replaceAll(`'`, "'}{'\\''}{'")}'}`;
  });
};

const writeTranslationDataToFile = (jsonData, locale) => {
  let jsonFilePath = `../../src/plugins/i18n/itemTranslations/${locale}_items.json`;
  fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
    } else {
      //   console.log('JSON data has been written to', jsonFilePath);
    }
  });
};

processItemTranslationData();

writeTranslationDataToFile(englishTranslationData, 'en');
writeTranslationDataToFile(spanishTranslationData, 'es');
writeTranslationDataToFile(frenchTranslationData, 'fr');
writeTranslationDataToFile(portugueseTranslationData, 'pt');
