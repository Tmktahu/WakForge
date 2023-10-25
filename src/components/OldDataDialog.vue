<template>
  <p-dialog v-model:visible="visible" modal :closable="false" style="width: 50vw">
    <div ref="modelContent" class="px-4 py-4">
      <div style="font-size: 36px"> Migrate Old Data</div>
      <div class="mt-5"> An old storage data structure has been detected and it must be updated before you can use the app. </div>
      <div class="mb-3"> Once the update is complete, this page will reload. </div>

      <div class="mb-3">
        It is highly reccomended that you backup your current data before attempting to update it to the new structure. I do my best to try and automatically
        handle this for you, but there is always a chance that something goes wrong with the update.
      </div>

      <div class="mb-3">
        If the update fails to work and you lose your data, don't worry. As long as you have a backup JSON you can recover everything. Feel free to reach out to
        Fryke (fryke) directly on Discord for assistance, or try to tackle a manual data structure update based on the information you find in the Github
        repository.
      </div>

      <div class="flex mt-4">
        <p-button class="px-3" label="Download Current Data" icon="mdi mdi-content-save-outline" @click="onSave" />
        <div class="flex-grow-1" />
        <tippy :append-to="() => modelContent">
          <p-button
            :disabled="!downloadedData"
            :loading="updateLoading"
            icon="mdi mdi-content-save-outline"
            :label="updateLoading ? 'Updating Data. Please Wait' : 'Update Data to New Structure'"
            class="update-data-button px-3"
            @click="onUpdate"
          />

          <template v-slot:content>
            <div v-if="!downloadedData" class="simple-tooltip"> You must download a backup of your data first. </div>
          </template>
        </tippy>
      </div>
    </div>
  </p-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { useStorage } from '@/models/useStorage';

const visible = ref(false);
const updateLoading = ref(false);

const { migrateData, saveToLocalStorage } = useStorage();

const modelContent = ref(null);

const oldData = ref(null);
const downloadedData = ref(false);

const open = (inData) => {
  visible.value = true;
  oldData.value = inData;
};

const onSave = () => {
  // we want to save the app data to JSON file
  let data = JSON.stringify(oldData.value, null, 2);

  let elem = document.createElement('a');
  let file = new Blob([data], { type: 'text/plain' });
  elem.href = URL.createObjectURL(file);
  let today = new Date();
  elem.download = `OLD_wakforge_${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}.json`;
  elem.click();

  downloadedData.value = true;
};

const onUpdate = () => {
  // we want to spin off the data migration update
  updateLoading.value = true;
  let migratedData = migrateData(oldData.value);
  saveToLocalStorage(migratedData);

  setTimeout(() => {
    window.location.reload(false);
  }, 5000);
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.update-data-button {
  background-color: rgba(rgb(255, 39, 19), 1);

  &:hover {
    background-color: rgba(rgb(255, 39, 19), 0.8);
  }
}
</style>
