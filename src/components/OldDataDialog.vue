<template>
  <p-dialog v-model:visible="visible" modal :closable="false" style="width: 50vw">
    <div ref="modelContent" class="px-4 py-4">
      <div style="font-size: 36px">{{ $t('oldDataDialog.migrateOldData') }}</div>
      <div class="mt-5">{{ $t('oldDataDialog.oldDataDetected') }}</div>
      <div class="mb-3">{{ $t('oldDataDialog.reloadNotice') }}</div>

      <div class="mb-3">
        {{ $t('oldDataDialog.backupReccomendation') }}
      </div>

      <div class="mb-3">
        {{ $t('oldDataDialog.ifUpdateFails') }}
      </div>

      <div class="flex mt-4">
        <p-button class="px-3" :label="$t('oldDataDialog.downloadCurrentData')" icon="mdi mdi-content-save-outline" @click="onSave" />
        <div class="flex-grow-1" />
        <tippy :append-to="() => modelContent">
          <p-button
            :disabled="!downloadedData"
            :loading="updateLoading"
            icon="mdi mdi-content-save-outline"
            :label="updateLoading ? $t('oldDataDialog.updatingPleaseWait') : $t('oldDataDialog.updateData')"
            class="update-data-button px-3"
            @click="onUpdate"
          />

          <template v-slot:content>
            <div v-if="!downloadedData" class="simple-tooltip">{{ $t('oldDataDialog.mustDownloadFirst') }}</div>
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
