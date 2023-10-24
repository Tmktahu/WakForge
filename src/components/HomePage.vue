<template>
  <div class="flex flex-column flex-grow-1 mx-5 my-5">
    <div style="font-size: 42px">Welcome to Wakforge</div>
    <div class="mt-2">If you run into any issues, feel free to DM Fryke (fryke) on Discord.</div>

    <p-divider />

    <div>import / export things</div>

    <p-divider />

    <div class="character-area">
      <div class="flex justify-content-between w-full">
        <div class="text-xl">Characters</div>
        <p-button label="Create New Character" class="py-1 px-3" @click="onCreateCharacter" />
      </div>

      <div class="flex flex-column">
        <template v-for="character in masterData.characters" :key="character.id">
          <div class="character-entry py-2 mt-2" @click="gotoBuild(character.id)">
            <div class="ml-3">
              <p-image v-if="character.class" class="class-image" :src="`../src/assets/images/classes/${character.class}.png`" image-style="width: 40px" />
              <p-image v-else class="class-image" :src="`../src/assets/images/ui/addCompanion.png`" image-style="width: 40px" />
            </div>
            <p-divider class="mx-2" layout="vertical" />
            <div class="flex-grow-1 truncate" style="max-width: 300px">{{ character.name }}</div>
            <p-divider class="mx-2" layout="vertical" />
            <div class="text-center" style="min-width: 60px">Lvl {{ character.level }}</div>
            <p-divider class="mx-2" layout="vertical" />
            <div class="flex-grow-1">
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
</style>
