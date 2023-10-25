<template>
  <div class="flex flex-column w-full" style="height: 100vh">
    <div class="mt-3 ml-4" style="font-size: 42px">Application Data Management</div>

    <div class="flex gap-2 w-full mt-3 h-full" style="overflow: hidden">
      <div class="flex flex-column flex-grow-1 ml-3 pb-2">
        <div class="mb-2">Here you can upload a JSON file to import characters.</div>
        <div class="flex">
          <div class="flex-grow-1">
            <p-fileUpload accept="application/json" custom-upload auto @uploader="onLoadJSON">
              <template v-slot:header="{ chooseCallback, files }">
                <div class="w-full">
                  <p-button class="select-file-button" label="Select JSON File" :disabled="files?.length !== 0" @click="chooseCallback" />
                </div>
              </template>

              <template v-slot:empty>
                <div class="flex align-items-center justify-content-center flex-column py-3">
                  <i class="pi pi-cloud-upload border-2 border-circle p-1" />
                  <div class="mt-2">
                    Or drag and drop<br />
                    a JSON file here.
                  </div>
                </div>
              </template>
            </p-fileUpload>
          </div>

          <div class="imported-data-status flex-grow-1 px-2 py-2 ml-2" style="max-width: 50%">
            <div v-if="importedData === undefined">The current data is not recognized as WakForge data.</div>
            <div v-else-if="importedData === null">Before you can import characters, the version of your imported data will be checked here.</div>
            <div v-else-if="needsMigration(importedData)" class="flex flex-column h-full needs-migration">
              <span>
                Your data seems to be from an old storage version, and thus needs to be updated before it can be used. This is a safe operation and will make no
                permanent changes to your existing data.
              </span>
              <div class="flex-grow-1" />
              <p-button label="Migrate Data" @click="onMigrateData" />
            </div>
            <div v-else class="flex flex-column gap-2 valid-data">
              <span>Your data is good to go.</span>
              <span>Data Size: {{ getImportedDataSize() }}</span>
              <span>Number of Characters: {{ importedData.characters.length }}</span>
            </div>
          </div>
        </div>

        <div v-if="importedData?.characters?.length" class="character-list pr-2 pb-2">
          <template v-for="character in importedData.characters" :key="character.id">
            <div
              class="character-entry py-2 mt-2"
              :class="{ selected: selectedCharacterIDs.includes(character.id) }"
              @click="toggleCharacterSelection(character.id)"
            >
              <div class="ml-3">
                <p-image
                  v-if="character.class"
                  class="class-image"
                  :src="`https://tmktahu.github.io/WakfuAssets/classes/${character.class}.png`"
                  image-style="width: 40px"
                />
                <p-image v-else class="class-image" :src="addCompanionIconURL" image-style="width: 40px" />
              </div>
              <p-divider class="mx-2" layout="vertical" />
              <div class="flex-grow-1 truncate" style="max-width: 300px">{{ character.name }}</div>
              <p-divider class="mx-2" layout="vertical" />
              <div class="text-center" style="min-width: 60px">Lvl {{ character.level }}</div>
              <p-divider class="mx-2" layout="vertical" />
              <div class="flex-grow-1" style="max-width: 460px">
                <EquipmentButtons :character="character" read-only />
              </div>
            </div>
          </template>
        </div>
        <div v-else class="mt-3 ml-2"> No characters were found </div>

        <div class="flex-grow-1" />
        <p-button label="Import Selected Characters" @click="onImportCharacters" />
      </div>

      <div class="flex flex-column flex-grow-1" style="max-width: 550px; min-width: 550px">
        <div class="mr-2">
          <div class="mb-2">
            WakForge operates off locally saved data in your browser via LocalStorage.<br />
            The current key for the LocalStorage data is
            <span style="color: var(--bonta-blue-100); font-weight: bold"> {{ LOCALSTORAGE_KEY }}</span>
          </div>
          <div class="mb-2">
            LocalStorage has a storage size limit of 10 MB.<br />
            Your storage has a current size of
            <span style="color: var(--bonta-blue-100); font-weight: bold">{{ getLocalStorageSize() }}</span>
            <br />If you ever approach this limit, please contact Fryke (fryke) on Discord.
          </div>
          <div class="flex">
            <p-button
              class="local-storage-button mr-2"
              :disabled="invalidJson"
              :label="invalidJson ? 'That is invalid JSON' : 'Save to LocalStorage'"
              @click="onSaveEditorToLocalStorage"
            />
            <p-button class="local-storage-button" label="Download Current Data" @click="onDownloadData" />
            <div class="flex-grow-1" />
            <tippy>
              <p-button :disabled="!downloadedData" class="local-storage-button delete" label="Delete All Data" @click="onDeleteData" />

              <template v-slot:content>
                <div v-if="!downloadedData" class="simple-tooltip"> You must download a backup of your data first. </div>
              </template>
            </tippy>
          </div>
        </div>

        <div class="json-editor-wrapper mt-2">
          <div ref="jsonEditor" class="json-editor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

import { useStorage, LOCALSTORAGE_KEY } from '@/models/useStorage';

import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { defaultKeymap } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';

import EquipmentButtons from '@/components/EquipmentButtons.vue';
import addCompanionIconURL from '@/assets/images/ui/addCompanion.png';

const jsonEditor = ref(null);
const editedJson = ref(null);
const importedData = ref(null);
const invalidJson = ref(false);
const downloadedData = ref(false);
const selectedCharacterIDs = ref([]);
let editorView = null;

const { needsMigration, readFromJSON, saveToLocalStorage, migrateData, mergeData } = useStorage();

const onLoadJSON = async ({ files }) => {
  let data = await readFromJSON(files[0]);
  importedData.value = data;
};

const getLocalStorageSize = () => {
  let storageEntry = window.localStorage.getItem(LOCALSTORAGE_KEY);
  if (storageEntry === null) {
    return 0;
  }
  let length = (storageEntry.length + LOCALSTORAGE_KEY.length) * 2;
  return formatSize(length);
};

const getImportedDataSize = () => {
  if (importedData.value === null) {
    return 0;
  }
  let stringifiedData = JSON.stringify(importedData.value);
  let length = (stringifiedData.length + LOCALSTORAGE_KEY.length) * 2;
  return formatSize(length);
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${formattedSize} ${sizes[i]}`;
};

onMounted(() => {
  let storageEntry = window.localStorage.getItem(LOCALSTORAGE_KEY);

  let eventHandlers = EditorView.updateListener.of((event) => {
    editedJson.value = event.state.doc.toString();
    onJsonEditorChange();
  });

  let startState = EditorState.create({
    doc: storageEntry || 'No Data Found',
    extensions: [eventHandlers, basicSetup, json(), keymap.of(defaultKeymap)],
  });

  editorView = new EditorView({
    state: startState,
    parent: jsonEditor.value,
  });
});

const onJsonEditorChange = () => {
  nextTick(() => {
    try {
      JSON.parse(editedJson.value); // we do this to check if it is valid json
      invalidJson.value = false;
    } catch (error) {
      invalidJson.value = true;
    }
  });
};

const onSaveEditorToLocalStorage = () => {
  let json = JSON.parse(editedJson.value);
  saveToLocalStorage(json);
};

const onDownloadData = () => {
  // we want to save the app data to JSON file
  let data = window.localStorage.getItem(LOCALSTORAGE_KEY);

  let elem = document.createElement('a');
  let file = new Blob([data], { type: 'text/plain' });
  elem.href = URL.createObjectURL(file);
  let today = new Date();
  elem.download = `wakforge_${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.json`;
  elem.click();

  downloadedData.value = true;
};

const onDeleteData = () => {
  window.localStorage.removeItem(LOCALSTORAGE_KEY);
  editorView.dispatch({
    changes: { from: 0, to: editorView.state.doc.length, insert: 'No Data Found' },
  });
};

const onMigrateData = () => {
  let migratedData = migrateData(importedData.value);
  importedData.value = migratedData;
};

const onImportCharacters = () => {
  let newData = {
    characters: importedData.value.characters.filter((character) => {
      return selectedCharacterIDs.value.includes(character.id);
    }),
  };

  mergeData(newData);
  importedData.value = null;
};

const toggleCharacterSelection = (targetId) => {
  if (selectedCharacterIDs.value.includes(targetId)) {
    let targetIndex = selectedCharacterIDs.value.indexOf(targetId);
    selectedCharacterIDs.value.splice(targetId, targetIndex);
  } else {
    selectedCharacterIDs.value.push(targetId);
  }
};
</script>

<style lang="scss" scoped>
:deep(.p-fileupload) {
  .select-file-button {
    width: 100%;
    border-radius: 0;
    background-color: var(--bonta-blue-90);

    &:hover {
      background-color: var(--bonta-blue-70);
    }
  }

  .p-fileupload-buttonbar {
    padding: 0;
  }
  .p-fileupload-content {
    padding: 0;
  }
}

.imported-data-status {
  width: fit-content;
  border: 1px solid var(--bonta-blue-60);
  border-radius: 8px;
  border-bottom-right-radius: 0;

  &:has(.needs-migration) {
    border-color: orangered;
  }

  &:has(.valid-data) {
    border-color: greenyellow;
  }
}

:deep(.local-storage-button) {
  padding: 4px 6px;
  background-color: var(--bonta-blue-70);
  border: 1px solid transparent;
  color: white;
  font-weight: 400;

  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  &.delete {
    background-color: rgb(207, 17, 0);
  }
}

.json-editor-wrapper {
  overflow-y: scroll;
}

:deep(.json-editor) {
  // background-color: var(--bonta-blue);

  .ͼe {
    color: orangered !important;
  }

  .ͼb {
    color: violet !important;
  }

  .ͼc {
    color: red;
  }

  .ͼd {
    color: yellow !important;
  }

  .ͼ2 .cm-gutters {
    color: white !important;
    background-color: var(--bonta-blue-50);
    border: none !important;
  }

  .ͼ2 .cm-activeLineGutter {
    background-color: var(--bonta-blue-80);
  }
}

.character-list {
  overflow-y: auto;
}

:deep(.character-entry) {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: var(--bonta-blue);
  border-radius: 8px;
  border: 1px solid var(--bonta-blue-60);

  &:hover {
    background-color: var(--bonta-blue-20);
    border: 1px solid var(--bonta-blue-100);
  }

  &.selected {
    background-color: var(--bonta-blue-70);
  }

  .class-image {
    display: flex;
    height: 40px;

    img {
      border-radius: 4px;
    }
  }
}
</style>
