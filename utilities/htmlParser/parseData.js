// So the theory here is that we iterate over all html blocks and parse out the data we want

const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let topDirectory = './htmlBlocks/';
let spellData = [];

const processData = async () => {
  const directoryContents = await fs.promises.readdir(topDirectory);

  for (const entry of directoryContents) {
    const entryPath = path.join(topDirectory, entry);
    const entryStats = await fs.promises.stat(entryPath);

    if (entryStats.isDirectory()) {
      processDirectory(entryPath);
    }
  }
};

processData();

const processDirectory = async (targetDirectory) => {
  const files = await fs.promises.readdir(targetDirectory);

  for (const file of files) {
    const className = path.basename(targetDirectory);
    const filePath = path.join(targetDirectory, file);

    await processFile(filePath, className);
  }

  await writeSpellDataToFile(spellData);
};

const processFile = async (filePath) => {
  const data = await fs.promises.readFile(filePath, 'utf8');

  const { window } = new JSDOM(data);
  let document = window.document;

  let newSpellData = assembleSpellData(document, filePath);

  //   spellData[newSpellData.id] = newSpellData;
  spellData.push(newSpellData);
};

const writeSpellDataToFile = (jsonData) => {
  let jsonFilePath = '../../src/models/spell_data.json';
  fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error('Error writing JSON to file:', err);
    } else {
      //   console.log('JSON data has been written to', jsonFilePath);
    }
  });
};

const assembleSpellData = (document, filePath) => {
  let newSpellData = {};

  const parentDirectory = path.dirname(filePath);
  const className = path.basename(parentDirectory);

  newSpellData.class = className;

  newSpellData.name = getSpellName(document);
  newSpellData.id = getSpellId(document, newSpellData);
  newSpellData.iconId = getSpellId(document, newSpellData);
  newSpellData.description = getSpellDescription(document);
  newSpellData.normalEffects = getNormalSpellEffects(document);

  return newSpellData;
};

// Individual field parsers
const getSpellName = (document) => {
  let parentElement = document.querySelector('.ak-spell-name');
  const textNodes = Array.from(parentElement.childNodes)
    .filter((node) => node.nodeType === 3)
    .map((node) => node.textContent)
    .join('');

  return textNodes.trim();
};

const getSpellId = (document, newSpellData) => {
  let imageElem = document.querySelector(`img[alt="${newSpellData.name}"][title="${newSpellData.name}"]`);

  const regexPattern = /\/(\d+)\.png/;
  const matches = imageElem.src.match(regexPattern);
  const extractedId = matches[1];

  return extractedId;
};

const getSpellDescription = (document) => {
  let parentElement = document.querySelector('.ak-spell-description');
  let text = parentElement.textContent;

  return text.trim();
};

const getNormalSpellEffects = (document) => {
  let normalEffects = {};
  let previousEntry = null;

  const h2Elements = document.querySelectorAll('h2');
  for (const h2 of h2Elements) {
    if (h2.textContent === 'Normal effects') {
      // This is the h2 element with the text 'Normal effects'
      const parent = h2.parentElement;

      let htmlElem = parent.querySelector('.ak-container');
      let htmlText = htmlElem.outerHTML.replaceAll(/data-hasqtip=[\"\\\d\w\_\,]+\"/gi, '');

      if (previousEntry && previousEntry.html === htmlText) {
        continue;
      }

      let levelWrapper = parent.closest('.ak-level-selector-target');
      const regexPattern = /ak-level-(\d+)/;
      const matches = levelWrapper.classList.toString().match(regexPattern);
      const extractedLevel = matches[1];

      normalEffects[extractedLevel] = {
        level: extractedLevel,
        html: htmlText,
      };

      previousEntry = normalEffects[extractedLevel];
    }
  }

  return normalEffects;
};
