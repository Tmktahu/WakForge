// import Vue from 'vue';
import { watch, reactive, nextTick } from 'vue';
import { EventBus, Events } from '@/eventBus';
import { useBuildCodes } from '@/models/useBuildCodes';
import { useLevels } from '@/models/useLevels';
import { characterDataTemplate } from '@/models/useCharacterBuilds';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';

export const LOCALSTORAGE_KEY = 'wakforge-data';
export const CURRENT_STORAGE_VERSION = '0.0.6';

export let masterData = reactive({
  appVersion: '',
  storageVersion: CURRENT_STORAGE_VERSION,
  characters: [],
  uiTheme: null,
  language: null,
  groups: [],
});

export function useStorage() {
  const { createBuildCode, parseBuildData, decodeBuildCode } = useBuildCodes();
  const { setCharacteristicLimits } = useLevels();

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
        let parsedCharacterData = [];

        data.characters.forEach((characterEntry) => {
          let parsedBuildData = decodeBuildCode(characterEntry.buildCode);
          let assembledCharacterData = parseBuildData(parsedBuildData);

          let newCharacterData = structuredClone(characterDataTemplate);
          let newObject = mergeDeep(newCharacterData, assembledCharacterData);
          setCharacteristicLimits(newObject);

          newObject.id = characterEntry.id;
          newObject.name = characterEntry.name;

          parsedCharacterData.push(newObject);
        });

        masterData.characters = parsedCharacterData;
      }
      masterData.appVersion = data.appVersion || import.meta.env.VUE_APP_VERSION;
      masterData.uiTheme = data.uiTheme || 'bonta';
      masterData.language = data.language || null;

      if(data?.groups?.length) {
        // We want to make sure that in edge case situtations, any groups that have non-existant characters are cleaned
        let groupsData = data.groups;

        groupsData.forEach((group) => {
          group.buildIds.forEach((buildId) => {
            let potentialCharacter = masterData.characters.find((character) => character.id === buildId);
            if(!potentialCharacter) {
              let index = group.buildIds.indexOf(buildId);
              group.buildIds.splice(index, 1);
            }
          })
        });

        masterData.groups = groupsData;
      }
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

    return { masterData, errors };
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
          characters: [],
          uiTheme: inData.uiTheme,
          language: inData.language,
          groups: inData.groups,
        };

        inData.characters.forEach((character) => {
          newStorageData.characters.push({
            id: character.id,
            name: character.name,
            buildCode: createBuildCode(character),
          });
        });

        let stringifiedData = JSON.stringify(newStorageData, null, 2);
        window.localStorage.setItem(LOCALSTORAGE_KEY, stringifiedData);
      }
    } catch (error) {
      console.error('Error writing to local storage: ', error);
      //   Vue.toasted.global.alertError({ message: 'Error saving to localstorage', description: error });
    }
  };

  const saveJsonToLocalStorage = async (inData) => {
    try {
      if (inData !== null) {
        let stringifiedData = JSON.stringify(inData, null, 2);
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

      Object.keys(character.equipment)
        .sort()
        .forEach((key, index) => {
          if(character.equipment[key] === null) {
            character.equipment[key] = { item: null, runes: {}, sub: null }
          } else if(character.equipment[key].item === undefined) {
            character.equipment[key] = { item: character.equipment[key], runes: {}, sub: null }
          }
        })
    });

    // this converts old stored character data to new build code storage
    newData.characters.forEach((character) => {
      if (character.buildCode === undefined) {
        character = {
          id: character.id,
          name: character.name,
          buildCode: createBuildCode(character),
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

  /**
   * Simple object check.
   * @param item
   * @returns {boolean}
   */
  const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
  };

  /**
   * Deep merge two objects.
   * @param target
   * @param ...sources
   */
  const mergeDeep = (target, ...sources) => {
    if (!sources.length) {
      return target;
    }
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} });
          }
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return mergeDeep(target, ...sources);
  };

  return {
    setup,
    readFromLocalStorage,
    saveToLocalStorage,
    saveJsonToLocalStorage,
    migrateData,
    readFromJSON,
    saveToJSON,
    needsMigration,
    mergeData,
  };
}
