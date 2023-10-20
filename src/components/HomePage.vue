<template>
  <div class="flex flex-column mx-5 my-5">
    <span>Home page</span>
    <span>Here we can display a list of loaded builds?</span>
    <span>Links to discord and repo and contact info?</span>

    <p-button label="Create New Character" @click="onCreateCharacter" />

    <div class="flex flex-column">
      <template v-for="character in masterData.characters" :key="character.id">
        <div class="character-entry mt-2" @click="gotoBuild(character.id)">{{ character.name }} | {{ character.id }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';

import { useCharacterBuilds } from '@/models/useCharacterBuilds.js';

import { CHARACTER_BUILDER_ROUTE } from '@/router/routes.js';

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
.character-entry {
  cursor: pointer;
  background: lightgreen;
}
</style>
