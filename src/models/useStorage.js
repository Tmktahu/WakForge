// import Vue from 'vue';
import { watch, reactive } from 'vue';

import { EventBus, Events } from '../eventBus';

export const LOCALSTORAGE_KEY = 'wakfu-wizard-data';

export let masterData = reactive({
  version: '',
  characters: [],
});

export function useStorage() {
  const setup = async () => {
    const { data, errors } = readFromLocalStorage();

    let currentVersion = import.meta.env.VITE_APP_VERSION;
    let storageVersion = data?.version;
    if (storageVersion !== currentVersion) {
      console.error('Storage version mismatch');
      // here we want to pop a modal that informs the user of the version mismatch, and reccomend they download their data

      // for dev purposes, for now we wipe the data and start over
      window.localStorage.removeItem(LOCALSTORAGE_KEY);
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
          version: import.meta.env.VUE_APP_VERSION,
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
          version: null,
          characters: masterData.characters,
        };

        newStorageData.version = import.meta.env.VITE_APP_VERSION;

        let stringifiedData = JSON.stringify(newStorageData, null, 2);
        window.localStorage.setItem(LOCALSTORAGE_KEY, stringifiedData);
      }
    } catch (error) {
      console.error('Error writing to local storage: ', error);
      //   Vue.toasted.global.alertError({ message: 'Error saving to localstorage', description: error });
    }
  };

  return {
    setup,
    readFromLocalStorage,
    saveToLocalStorage,
  };
}
