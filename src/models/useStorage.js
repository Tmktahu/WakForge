// import Vue from 'vue';
import { watch, reactive, nextTick } from 'vue';
import { EventBus, Events } from '../eventBus';

export const LOCALSTORAGE_KEY = 'wakforge-data';
export const CURRENT_STORAGE_VERSION = '0.0.1';

export let masterData = reactive({
  appVersion: '',
  storageVersion: CURRENT_STORAGE_VERSION,
  characters: [],
});

export function useStorage() {
  const setup = async () => {
    const { data, errors } = readFromLocalStorage();

    let aAppVersion = data?.appVersion;
    let storageVersion = data?.storageVersion;

    if (storageVersion && storageVersion !== CURRENT_STORAGE_VERSION) {
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
    }

    EventBus.on(Events.SAVE_DATA, (data) => {
      saveToLocalStorage(data);
    });

    watch(masterData, () => {
      // this watch handles live saving to local storage
      saveToLocalStorage(data);
    });

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
          appVersion: null,
          characters: masterData.characters,
        };

        newStorageData.appVersion = import.meta.env.VITE_APP_VERSION;
        newStorageData.storageVersion = CURRENT_STORAGE_VERSION;

        let stringifiedData = JSON.stringify(newStorageData, null, 2);
        window.localStorage.setItem(LOCALSTORAGE_KEY, stringifiedData);
      }
    } catch (error) {
      console.error('Error writing to local storage: ', error);
      //   Vue.toasted.global.alertError({ message: 'Error saving to localstorage', description: error });
    }
  };

  const detectOldDataStructures = (data) => {
    // This is where we place migration detection logic

    return false;
  };

  // This function specifically handles migrating old data strucutres to the current version
  const migrateData = (oldData) => {
    let newData = oldData;
    // we place migration data shenanigans here

    return newData;
  };

  return {
    setup,
    readFromLocalStorage,
    saveToLocalStorage,
  };
}
