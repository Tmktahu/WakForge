// https://wakfu.cdn.ankama.com/gamedata/1.81.1.13/(type).json

const fs = require('fs');

const jsonItemData = fs.readFileSync('./items.json');
const itemData = JSON.parse(jsonItemData);

const jsonStatesData = fs.readFileSync('./states.json');
const statesData = JSON.parse(jsonStatesData);

let mode = 'items';

// We map the translations to the item ID for each language individually
let englishTranslationData = {};
let spanishTranslationData = {};
let frenchTranslationData = {};
let portugueseTranslationData = {};

const processItemTranslationData = () => {
  if (mode === 'items') {
    assembleItemTranslationData(); // assembles the data for items
  }
  if (mode === 'states') {
    assembleStatesTranslationData(); // assembles the data for states
  }
};

const assembleItemTranslationData = () => {
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

const assembleStatesTranslationData = () => {
  statesData.forEach((stateObject) => {
    let stateId = stateObject.definition.id;

    if (stateObject.title) {
      // eslint-disable-next-line quotes
      englishTranslationData[stateId] = `{'${stateObject.title.en.replaceAll(`'`, "'}{'\\''}{'")}'}`;
      // eslint-disable-next-line quotes
      spanishTranslationData[stateId] = `{'${stateObject.title.es.replaceAll(`'`, "'}{'\\''}{'")}'}`;
      // eslint-disable-next-line quotes
      frenchTranslationData[stateId] = `{'${stateObject.title.fr.replaceAll(`'`, "'}{'\\''}{'")}'}`;
      // eslint-disable-next-line quotes
      portugueseTranslationData[stateId] = `{'${stateObject.title.pt.replaceAll(`'`, "'}{'\\''}{'")}'}`;
    }
  });
};

const writeTranslationDataToFile = (jsonData, locale) => {
  let jsonFilePath = '';
  if (mode === 'items') {
    jsonFilePath = `../../src/plugins/i18n/itemTranslations/${locale}_items.json`;
  }

  if (mode === 'states') {
    jsonFilePath = `../../src/plugins/i18n/itemTranslations/${locale}_states.json`;
  }

  fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
    } else {
      //   console.log('JSON data has been written to', jsonFilePath);
    }
  });
};

mode = 'items';
processItemTranslationData();

writeTranslationDataToFile(englishTranslationData, 'en');
writeTranslationDataToFile(spanishTranslationData, 'es');
writeTranslationDataToFile(frenchTranslationData, 'fr');
writeTranslationDataToFile(portugueseTranslationData, 'pt');
