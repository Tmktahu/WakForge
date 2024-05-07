<template>
  <div class="flex flex-column w-full" style="height: 100vh">
    <div class="mt-3 ml-4" style="font-size: 42px">{{ $t('dataPage.title') }}</div>

    <div class="flex gap-2 w-full mt-3 h-full" style="overflow: hidden">
      <div class="flex flex-column flex-grow-1 px-4">
        <div class="mr-2">
          <div class="mb-2">
            {{ $t('dataPage.operatesOffLocalstorage') }}<br />
            {{ $t('dataPage.currentLocalstorageKey') }}
            <span style="color: var(--primary-50); font-weight: bold"> {{ LOCALSTORAGE_KEY }}</span>
          </div>
          <div class="mb-2">
            {{ $t('dataPage.storageLimit') }}<br />
            {{ $t('dataPage.currentStorageSize') }}
            <span style="color: var(--primary-50); font-weight: bold">{{ getLocalStorageSize() }}</span>
            <br />{{ $t('dataPage.contactForHelp') }}
          </div>
          <div class="mb-2">
            <span style="color: orangered; font-weight: 800">!!! {{ $t('dataPage.warning') }} !!!</span>
            {{ $t('dataPage.warningMessage') }}
          </div>
          <div class="flex">
            <tippy>
              <p-button
                class="local-storage-button mr-2"
                :disabled="invalidJson || !downloadedData"
                :label="invalidJson ? $t('dataPage.invalidJSON') : $t('dataPage.saveToLocalstorage')"
                @click="onSaveEditorToLocalStorage"
              />

              <template v-slot:content>
                <div v-if="!downloadedData" class="simple-tooltip">{{ $t('oldDataDialog.mustDownloadFirst') }}</div>
              </template>
            </tippy>

            <p-button class="local-storage-button" :label="$t('app.downloadData')" @click="onDownloadData" />
            <div class="flex-grow-1" />
            <tippy>
              <p-button :disabled="!downloadedData" class="local-storage-button delete" :label="$t('dataPage.deleteAllData')" @click="onDeleteData" />

              <template v-slot:content>
                <div v-if="!downloadedData" class="simple-tooltip">{{ $t('oldDataDialog.mustDownloadFirst') }}</div>
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
import { useI18n } from 'vue-i18n';

import { useStorage, LOCALSTORAGE_KEY } from '@/models/useStorage';

import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { defaultKeymap } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';

import { useToast } from 'primevue/usetoast';
const toast = useToast();
const { t } = useI18n();

const jsonEditor = ref(null);
const editedJson = ref(null);
const invalidJson = ref(false);
const downloadedData = ref(false);
let editorView = null;

const { saveJsonToLocalStorage } = useStorage();

const getLocalStorageSize = () => {
  let storageEntry = window.localStorage.getItem(LOCALSTORAGE_KEY);
  if (storageEntry === null) {
    return 0;
  }
  let length = (storageEntry.length + LOCALSTORAGE_KEY.length) * 2;
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
    doc: storageEntry || t('dataPage.noDataFound'),
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
  saveJsonToLocalStorage(json);

  toast.add({ severity: 'info', summary: 'Data has been saved. You will need to refresh to see the changes.', life: 3000 });
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
    changes: { from: 0, to: editorView.state.doc.length, insert: t('dataPage.noDataFound') },
  });
};
</script>

<style lang="scss" scoped>
:deep(.p-fileupload) {
  .select-file-button {
    width: 100%;
    border-radius: 0;
    background-color: var(--primary-80);

    &:hover {
      background-color: var(--primary-70);
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
  border: 1px solid var(--primary-60);
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
  background-color: var(--primary-20);
  border: 1px solid transparent;
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
  // background-color: var(--primary-40);

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
    background-color: var(--primary-20);
    border: none !important;
  }

  .ͼ2 .cm-activeLineGutter {
    background-color: var(--primary-40);
  }
}

.character-list {
  overflow-y: auto;
}

:deep(.character-entry) {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: var(--primary-40);
  border-radius: 8px;
  border: 1px solid var(--primary-60);

  &:hover {
    background-color: var(--primary-40-20);
    border: 1px solid var(--primary-50);
  }

  &.selected {
    background-color: var(--primary-70);
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
