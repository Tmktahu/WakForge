// import Vue from 'vue';
import { watch, reactive, nextTick } from 'vue';
import { EventBus, Events } from '@/eventBus';
import { ITEM_SLOT_DATA } from '@/models/useConstants';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';

export const LOCALSTORAGE_KEY = 'wakforge-data';
export const CURRENT_STORAGE_VERSION = '0.0.5';

export let masterData = reactive({
  appVersion: '',
  storageVersion: CURRENT_STORAGE_VERSION,
  characters: [],
  uiTheme: null,
  language: 'en',
  groups: [],
});

export function useStorage() {
  const setup = async () => {
    const { data, errors } = readFromLocalStorage();

    if (needsMigration(data)) {
      let storageVersion = data?.storageVersion;
      console.log('Storage version mismatch: Current Version', CURRENT_STORAGE_VERSION, 'vs Storage Version', storageVersion);
      nextTick(() => {
        EventBus.emit(Events.OPEN_OLD_DATA_DIALOG, data);
      });

      return {
        storageData: data,
        errors: { message: 'oldData' },
      };
    } else {
      if (data?.characters?.length) {
        masterData.characters = data.characters;
      }
      masterData.appVersion = data.appVersion;
      masterData.uiTheme = data.uiTheme;
      masterData.language = data.language;
      masterData.groups = data.groups;
    }

    EventBus.on(Events.SAVE_DATA, (data) => {
      saveToLocalStorage(data);
    });

    watch(
      masterData,
      debounce(() => {
        // this watch handles live saving to local storage
        saveToLocalStorage(masterData);
      }, 100)
    );

    return { storageData: data, errors };
  };

  const readFromLocalStorage = () => {
    try {
      let rawData = window.localStorage.getItem(LOCALSTORAGE_KEY);
      if (rawData) {
        let parsedData = JSON.parse(rawData);
        return {
          data: parsedData,
          errors: null,
        };
      } else {
        let newData = {
          appVersion: import.meta.env.VUE_APP_VERSION,
          characters: [],
        };

        return {
          data: newData,
          errors: { message: 'noData' },
        };
      }
    } catch (error) {
      console.error('Error reading local storage: ', error);
      //   Vue.toasted.global.alertError({ message: 'Error reading localstorage', description: error });
      return null;
    }
  };

  const saveToLocalStorage = async (inData) => {
    try {
      if (inData !== null) {
        let newStorageData = {
          appVersion: import.meta.env.VITE_APP_VERSION,
          storageVersion: CURRENT_STORAGE_VERSION,
          characters: inData.characters,
          uiTheme: inData.uiTheme,
          language: inData.language,
          groups: inData.groups,
        };

        let stringifiedData = JSON.stringify(newStorageData, null, 2);
        window.localStorage.setItem(LOCALSTORAGE_KEY, stringifiedData);
      }
    } catch (error) {
      console.error('Error writing to local storage: ', error);
      //   Vue.toasted.global.alertError({ message: 'Error saving to localstorage', description: error });
    }
  };

  const readFromJSON = async (file) => {
    return new Promise((resolve, reject) => {
      let data = '';
      const fileReader = new FileReader();

      fileReader.onloadend = function (event) {
        data = JSON.parse(event.target.result);
        resolve(data);
      };

      fileReader.onerror = function (error) {
        console.error('Error reading file: ', error);
        // Vue.toasted.global.alertError({ message: 'Error reading JSON file', description: error });
        reject(error);
      };

      fileReader.readAsText(file);
    });
  };

  const saveToJSON = async (inData, filePath, container = null) => {
    let stringifiedData = JSON.stringify(inData, null, 2);
    try {
      fs.writeFile(filePath, stringifiedData, 'utf-8', () => {
        if (container) {
          container.value = inData;
          // Vue.toasted.global.alertInfo({
          //   message: 'Initialized default JSON storage',
          //   description: `No standard JSON file was found, so one was created at ${dataStoragePath.value}`,
          // });
        }
      });
      return null;
    } catch (error) {
      console.error('There was a problem saving data: ', error);
      return error;
    }
  };

  const needsMigration = (oldData) => {
    let storageVersion = oldData?.storageVersion;
    return storageVersion && storageVersion !== CURRENT_STORAGE_VERSION;
  };

  // This function specifically handles migrating old data strucutres to the current version
  const migrateData = (oldData) => {
    let newData = oldData;
    // we place migration data shenanigans here

    // this handles old pet and mount data. could remove after some time
    newData.characters.forEach((character) => {
      if (!([ITEM_SLOT_DATA.PET.id] in character.equipment)) {
        character.equipment[ITEM_SLOT_DATA.PET.id] = null;
      }

      if (!([ITEM_SLOT_DATA.MOUNT.id] in character.equipment)) {
        character.equipment[ITEM_SLOT_DATA.MOUNT.id] = null;
      }
    });

    // this handles old spell keys. could remove after some time
    newData.characters.forEach((character) => {
      if (character.passiveSpells) {
        delete character.passiveSpells;
      }

      if (character.activeSpells) {
        delete character.activeSpells;
      }

      if (character.equipment.pet) {
        delete character.equipment.pet;
      }

      if (character.equipment.mount) {
        delete character.equipment.mount;
      }
    });

    // this handles adding new spell keys if they don't exist
    newData.characters.forEach((character) => {
      if (!character.spells) {
        character.spells = {
          activeSlot1: null,
          activeSlot2: null,
          activeSlot3: null,
          activeSlot4: null,
          activeSlot5: null,
          activeSlot6: null,
          activeSlot7: null,
          activeSlot8: null,
          activeSlot9: null,
          activeSlot10: null,
          activeSlot11: null,
          activeSlot12: null,

          passiveSlot1: null,
          passiveSlot2: null,
          passiveSlot3: null,
          passiveSlot4: null,
          passiveSlot5: null,
          passiveSlot6: null,
        };
      }
    });

    if (newData.groups === undefined) {
      newData.groups = [];
    }

    newData.appVersion = import.meta.env.VITE_APP_VERSION;
    newData.storageVersion = CURRENT_STORAGE_VERSION;

    return newData;
  };

  const mergeData = (incomingData) => {
    let existingCharacterIds = masterData.characters.map((character) => {
      return character.id;
    });

    incomingData.characters.forEach((incomingCharacter) => {
      if (existingCharacterIds.includes(incomingCharacter.id)) {
        // we have an ID conflict, so just generate a new ID
        let newChar = incomingCharacter;
        newChar.id = uuidv4();
        masterData.characters.push(newChar);
      } else {
        masterData.characters.push(incomingCharacter);
      }
    });
  };

  return {
    setup,
    readFromLocalStorage,
    saveToLocalStorage,
    migrateData,
    readFromJSON,
    saveToJSON,
    needsMigration,
    mergeData,
  };
}
