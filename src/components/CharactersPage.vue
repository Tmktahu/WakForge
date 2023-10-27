<template>
  <div class="flex flex-column flex-grow-1 ml-4 mr-3" style="height: 100%; overflow: hidden">
    <div class="mt-3" style="font-size: 42px">Welcome to Wakforge</div>
    <div class="mt-2">If you run into any issues, feel free to DM Fryke (fryke) on Discord.</div>

    <p-divider />

    <div class="character-area">
      <div class="flex justify-content-between w-full">
        <div class="text-xl">Saved Characters</div>
        <p-button icon="mdi mdi-plus-thick" label="Create New Character" class="create-character-button py-1 pr-3 pl-2" @click="onCreateCharacter" />
      </div>

      <div class="character-enties-wrapper flex flex-column mt-2 pr-2 pb-3">
        <template v-for="character in masterData.characters" :key="character.id">
          <div class="character-entry py-2 mt-2" @click="gotoBuild(character.id)">
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
            </div>
            <div class="character-items flex-grow-1">
              <EquipmentButtons :character="character" read-only />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

import { useCharacterBuilds } from '@/models/useCharacterBuilds.js';
import { CHARACTER_BUILDER_ROUTE } from '@/router/routes.js';

import EquipmentButtons from '@/components/EquipmentButtons.vue';

import addCompanionIconURL from '@/assets/images/ui/addCompanion.png';

const router = useRouter();
const masterData = inject('masterData');

const { createNewCharacter } = useCharacterBuilds(masterData);

const onCreateCharacter = () => {
  // we want to init new character data and then route to it

  let newCharacterData = createNewCharacter();

  router.push({
    name: CHARACTER_BUILDER_ROUTE,
    params: {
      characterId: newCharacterData.id,
    },
  });
};

const gotoBuild = (id) => {
  router.push({
    name: CHARACTER_BUILDER_ROUTE,
    params: {
      characterId: id,
    },
  });
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

.character-enties-wrapper {
  overflow-y: auto;

  .class-name {
    min-width: 100px;
    max-width: 300px;
  }

  .class-level {
    text-align: center;
    min-width: 60px;
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
    }
  }
}
</style>