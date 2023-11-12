<template>
  <div class="flex flex-column flex-grow-1 ml-4 mr-3" style="height: 100%; overflow: hidden">
    <div class="mt-3" style="font-size: 42px">{{ $t('charactersPage.title') }}</div>
    <div class="mt-2">{{ $t('charactersPage.description') }}</div>

    <p-divider />

    <div>
      <div class="flex align-items-center w-full">
        <div class="text-xl mr-3">{{ $t('charactersPage.codeInputLabel') }}:</div>
        <p-inputText v-model="buildCode" :placeholder="$t('charactersPage.codeInputPlaceholder')" class="flex-grow-1 py-2" />
        <p-button
          icon="mdi mdi-plus-thick"
          :disabled="!isValidBuildCode"
          :label="$t('charactersPage.codeInputButton')"
          class="create-character-button py-1 pr-3 pl-2 ml-3"
          @click="onCreateCharacterFromCode"
        />
      </div>
      <div v-if="!isValidBuildCode && buildCode !== ''" class="mt-2" style="color: var(--error)">{{ $t('charactersPage.invalidBuildCode') }}</div>
    </div>

    <p-divider />

    <div class="character-area">
      <div class="flex justify-content-between w-full">
        <div class="text-xl">{{ $t('charactersPage.savedCharactersTitle') }}</div>
        <p-button
          icon="mdi mdi-plus-thick"
          :label="$t('charactersPage.createNewCharacterButton')"
          class="create-character-button py-1 pr-3 pl-2"
          @click="onCreateCharacter"
        />
      </div>

      <div class="character-enties-wrapper flex flex-column mt-2 pr-2 pb-3">
        <template v-for="character in masterData.characters" :key="character.id">
          <div class="character-entry py-2 mt-2" @click="gotoBuild($event, character.id)">
            <div class="character-info flex align-items-center justify-content-left flex-grow-1">
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
              <div class="class-name flex-grow-1 truncate">{{ character.name }}</div>
              <p-divider class="mx-2" layout="vertical" />
              <div class="class-level">Lvl {{ character.level }}</div>
              <p-divider class="mx-2" layout="vertical" />
              <p-button class="by-level-delete-button delete-button py-2 px-2 mr-3" icon="pi pi-trash" @click="onDeleteCharacter($event, character.id)" />
            </div>
            <div class="character-items flex-grow-1">
              <EquipmentButtons :character="character" read-only />
            </div>
            <p-button class="at-end-delete-button delete-button py-2 px-2 mr-3" icon="pi pi-trash" @click="onDeleteCharacter($event, character.id)" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';

import { useBuildCodes } from '@/models/useBuildCodes.js';
import { useCharacterBuilds } from '@/models/useCharacterBuilds.js';
import { CHARACTER_BUILDER_ROUTE } from '@/router/routes.js';

import EquipmentButtons from '@/components/characterSheet/EquipmentButtons.vue';
import addCompanionIconURL from '@/assets/images/ui/addCompanion.png';

import { useConfirm } from 'primevue/useconfirm';
const confirm = useConfirm();

const router = useRouter();
const masterData = inject('masterData');

const buildCode = ref('');

const { decodeBuildCode } = useBuildCodes();
const { createNewCharacter, createNewCharacterFromCode, deleteCharacter } = useCharacterBuilds(masterData);

const isValidBuildCode = computed(() => {
  return decodeBuildCode(buildCode.value) !== null;
});

const onCreateCharacter = () => {
  let newCharacterData = createNewCharacter();

  router.push({
    name: CHARACTER_BUILDER_ROUTE,
    params: {
      characterId: newCharacterData.id,
    },
  });
};

const onCreateCharacterFromCode = () => {
  let newCharacterData = createNewCharacterFromCode(buildCode.value);

  router.push({
    name: CHARACTER_BUILDER_ROUTE,
    params: {
      characterId: newCharacterData.id,
    },
  });
};

const onDeleteCharacter = (event, targetCharacterId) => {
  confirm.require({
    group: 'popup',
    target: event.currentTarget,
    message: 'Are you sure? This is irreversible.',
    accept: () => {
      deleteCharacter(targetCharacterId);
    },
  });
};

const gotoBuild = (event, id) => {
  // we have to do this nonsense so the confirm popup will work right. can't stop propogation
  if (!event.target.classList.contains('delete-button')) {
    router.push({
      name: CHARACTER_BUILDER_ROUTE,
      params: {
        characterId: id,
      },
    });
  }
};
</script>

<style lang="scss" scoped>
:deep(.character-entry) {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: var(--bonta-blue);
  border-radius: 8px;
  border: 1px solid var(--bonta-blue-60);

  &:hover {
    background-color: var(--bonta-blue-20);
  }

  .class-image {
    display: flex;
    height: 40px;

    img {
      border-radius: 4px;
    }
  }
}

.character-area {
  display: flex;
  flex-direction: column;
  justify-content: left;
  flex-grow: 1;
  overflow: hidden;
}

:deep(.character-enties-wrapper) {
  overflow-y: auto;

  .class-name {
    min-width: 100px;
    max-width: 300px;
  }

  .class-level {
    text-align: center;
    min-width: 60px;
  }

  .delete-button {
    width: 40px;
    height: 40px;
    background-color: var(--error-70);

    .p-button-icon {
      font-size: 24px;
      font-weight: 800;
      pointer-events: none;
    }

    &:hover {
      background-color: var(--error-90);
    }
  }

  .by-level-delete-button {
    display: none;
  }

  @media (max-width: 1024px) {
    .character-entry {
      flex-direction: column;
      padding-top: 10px !important;

      .p-divider-vertical {
        display: none;
      }

      .character-info {
        width: 100%;
        justify-content: left;
        margin-bottom: 12px;
      }

      .class-name {
        max-width: 100%;
        margin-left: 16px;
      }

      .class-level {
        text-align: right;
        margin-right: 16px;
      }

      .character-items {
        padding: 0 16px;
      }

      .by-level-delete-button {
        display: block;
      }

      .at-end-delete-button {
        display: none;
      }
    }
  }
}
</style>
