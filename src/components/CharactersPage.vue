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
      <div class="flex w-full">
        <div class="text-xl">{{ $t('charactersPage.savedCharactersTitle') }}</div>
        <div class="flex-grow-1" />
        <p-button
          icon="mdi mdi-folder"
          :label="$t('charactersPage.createNewGroupButton')"
          class="create-character-button py-1 pr-3 pl-2"
          @click="onCreateGroup"
        />
      </div>

      <div class="character-enties-wrapper flex flex-column mt-2 pb-3">
        <p-accordion multiple :active-index="[...masterData.groups.keys(), masterData.groups.length]">
          <template v-for="group in masterData.groups" :key="group.id">
            <p-accordionTab>
              <template v-slot:header>
                <div class="flex align-items-center w-full px-3 py-2" @drop="onBuildDrop($event, group)" @dragover.prevent @dragenter.prevent>
                  <i class="mdi mdi-folder" />
                  <p-inplace :closable="true" :pt="{ content: { class: 'flex align-items-center' }, button: { class: 'py-1' } }" @click.stop>
                    <template v-slot:display>
                      <div class="flex">
                        <div class="mx-2">{{ group.name }}</div>
                        <i class="mdi mdi-pencil" />
                      </div>
                    </template>
                    <template v-slot:content>
                      <div class="px-3">
                        <p-inputText v-model="group.name" class="py-1" autofocus />
                      </div>
                    </template>
                  </p-inplace>
                  <div class="flex-grow-1" />
                  <p-button
                    icon="mdi mdi-plus-thick"
                    :label="$t('charactersPage.createNewCharacterButton')"
                    class="create-character-button py-1 pr-3 pl-2 ml-3"
                    @click.stop="onCreateCharacter(group)"
                  />
                  <p-button icon="pi pi-trash" class="ml-3 py-1" @click.stop="onDeleteGroup(group)" />
                </div>
              </template>
              <div @drop="onBuildDrop($event, group)" @dragover.prevent @dragenter.prevent>
                <template v-for="buildId in group.buildIds" :key="buildId">
                  <div class="character-entry py-2 mt-2" draggable="true" @click="gotoBuild($event, buildId)" @dragstart="onBuildDragStart($event, buildId)">
                    <div class="character-info flex align-items-center justify-content-left flex-grow-1">
                      <div class="ml-3">
                        <p-image
                          v-if="getBuildById(buildId).class"
                          class="class-image"
                          :src="`https://tmktahu.github.io/WakfuAssets/classes/${getBuildById(buildId).class}.png`"
                          image-style="width: 40px"
                        />
                        <p-image v-else class="class-image" :src="addCompanionIconURL" image-style="width: 40px" />
                      </div>
                      <p-divider class="mx-2" layout="vertical" />
                      <div class="class-name flex-grow-1 truncate">{{ getBuildById(buildId).name }}</div>
                      <p-divider class="mx-2" layout="vertical" />
                      <div class="class-level">Lvl {{ getBuildById(buildId).level }}</div>
                      <p-divider class="mx-2" layout="vertical" />
                      <p-button class="by-level-delete-button delete-button py-2 px-2 mr-3" icon="pi pi-trash" @click="onDeleteCharacter($event, buildId)" />
                    </div>
                    <div class="character-items flex-grow-1">
                      <EquipmentButtons :character="getBuildById(buildId)" read-only />
                    </div>
                    <p-button class="at-end-delete-button delete-button py-2 px-2 mr-3" icon="pi pi-trash" @click="onDeleteCharacter($event, buildId)" />
                  </div>
                </template>
              </div>
            </p-accordionTab>
          </template>

          <p-accordionTab>
            <template v-slot:header>
              <div class="flex align-items-center w-full px-3 py-2" draggable="true" @drop="onBuildDrop($event, 'none')" @dragover.prevent @dragenter.prevent>
                <i class="mdi mdi-folder" />
                <div class="mx-2">Ungrouped</div>
                <div class="flex-grow-1" />
                <p-button
                  icon="mdi mdi-plus-thick"
                  :label="$t('charactersPage.createNewCharacterButton')"
                  class="create-character-button py-1 pr-3 pl-2 ml-3"
                  @click.stop="onCreateCharacter"
                />
              </div>
            </template>
            <div @drop="onBuildDrop($event, group)" @dragover.prevent @dragenter.prevent>
              <template v-for="build in ungroupedBuilds" :key="build.id">
                <div class="character-entry py-2 mt-2" draggable="true" @click="gotoBuild($event, build.id)" @dragstart="onBuildDragStart($event, build.id)">
                  <div class="character-info flex align-items-center justify-content-left flex-grow-1">
                    <div class="ml-3">
                      <p-image
                        v-if="build.class"
                        class="class-image"
                        :src="`https://tmktahu.github.io/WakfuAssets/classes/${build.class}.png`"
                        image-style="width: 40px"
                      />
                      <p-image v-else class="class-image" :src="addCompanionIconURL" image-style="width: 40px" />
                    </div>
                    <p-divider class="mx-2" layout="vertical" />
                    <div class="class-name flex-grow-1 truncate">{{ build.name }}</div>
                    <p-divider class="mx-2" layout="vertical" />
                    <div class="class-level">Lvl {{ build.level }}</div>
                    <p-divider class="mx-2" layout="vertical" />
                    <p-button class="by-level-delete-button delete-button py-2 px-2 mr-3" icon="pi pi-trash" @click="onDeleteCharacter($event, build.id)" />
                  </div>
                  <div class="character-items flex-grow-1">
                    <EquipmentButtons :character="build" read-only />
                  </div>
                  <p-button class="at-end-delete-button delete-button py-2 px-2 mr-3" icon="pi pi-trash" @click="onDeleteCharacter($event, build.id)" />
                </div>
              </template>
            </div>
          </p-accordionTab>
        </p-accordion>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { v4 as uuidv4 } from 'uuid';

import { useBuildCodes } from '@/models/useBuildCodes.js';
import { useCharacterBuilds } from '@/models/useCharacterBuilds.js';
import { CHARACTER_BUILDER_ROUTE } from '@/router/routes.js';

import EquipmentButtons from '@/components/characterSheet/EquipmentButtons.vue';
import addCompanionIconURL from '@/assets/images/ui/addCompanion.png';

import { useToast } from 'primevue/usetoast';
const toast = useToast();

import { useConfirm } from 'primevue/useconfirm';
const confirm = useConfirm();

const { t } = useI18n();

const router = useRouter();
const masterData = inject('masterData');

const buildCode = ref('');

const { decodeBuildCode } = useBuildCodes();
const { createNewCharacter, createNewCharacterFromCode, deleteCharacter } = useCharacterBuilds(masterData);

const isValidBuildCode = computed(() => {
  return decodeBuildCode(buildCode.value) !== null;
});

const ungroupedBuilds = computed(() => {
  let groupedBuildIds = [];
  masterData.groups.forEach((group) => {
    groupedBuildIds.push(...group.buildIds);
  });

  let characters = masterData.characters.filter((character) => {
    return !groupedBuildIds.includes(character.id);
  });

  return characters;
});

const onCreateCharacter = (group) => {
  let newCharacterData = createNewCharacter();
  group.buildIds.push(newCharacterData.id);

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

const onCreateGroup = () => {
  masterData.groups.push({
    id: uuidv4(),
    name: t('charactersPage.newGroup'),
    buildIds: [],
  });
};

const onDeleteGroup = (group) => {
  if (group.buildIds.length === 0) {
    let targetIndex = masterData.groups.indexOf(group);
    masterData.groups.splice(targetIndex, 1);
  } else {
    toast.add({ severity: 'error', summary: 'You cannot delete a group that has characters in it.', life: 3000 });
  }
};

const onDeleteCharacter = (event, buildId) => {
  confirm.require({
    group: 'popup',
    target: event.currentTarget,
    message: t('confirms.irreversable'),
    accept: () => {
      masterData.groups.forEach((group) => {
        if (group.buildIds.includes(buildId)) {
          let index = group.buildIds.indexOf(buildId);
          group.buildIds.splice(index, 1);
        }
      });

      deleteCharacter(buildId);
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

const getBuildById = (buildId) => {
  return masterData.characters.find((character) => character.id === buildId);
};

const onBuildDragStart = (event, buildId) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('buildId', buildId);
};

const onBuildDrop = (event, group) => {
  try {
    let buildId = event.dataTransfer.getData('buildId');

    masterData.groups.forEach((group) => {
      if (group.buildIds.includes(buildId)) {
        let index = group.buildIds.indexOf(buildId);
        group.buildIds.splice(index, 1);
      }
    });

    if (group !== 'none') {
      group.buildIds.push(buildId);
    }
  } catch (error) {
    // console.error(error)
  }
};
</script>

<style lang="scss" scoped>
:deep(.character-entry) {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: var(--background-20);
  border-radius: 8px;
  border: 1px solid var(--highlight-50);

  &:hover {
    background-color: var(--primary-40);
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
