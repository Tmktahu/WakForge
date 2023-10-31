<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  </header> -->

  <div class="flex">
    <AppSidebar />
    <div class="flex flex-column" style="height: 100vh; width: 100%">
      <router-view />
      <div class="disclaimer">WAKFU is an MMORPG published by Ankama. "WakForge" is an unofficial website with no link to Ankama.</div>
    </div>
  </div>

  <p-confirmPopup />
  <OldDataDialog ref="oldDataDialog" />
</template>

<script setup>
import { ref, watch, provide, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { EventBus, Events } from '@/eventBus';

import { masterData, useStorage } from '@/models/useStorage.js';
import { useCharacterBuilds } from '@/models/useCharacterBuilds.js';
import { useItems } from '@/models/useItems.js';
import { useStats } from '@/models/useStats';
import { useSpells } from '@/models/spells/useSpells';
import { useLevels } from '@/models/useLevels';
import { useAutoBuilder } from '@/models/useAutoBuilder';

import OldDataDialog from '@/components/OldDataDialog.vue';

import AppSidebar from '@/components/AppSidebar.vue';

const route = useRoute();

const oldDataDialog = ref(null);

// const showSidebar = ref(true);

// First thing we do is grab data from storage
const { setup: storageSetup } = useStorage();
const { errors: storageErrors } = storageSetup();

const { setup: setupCharacterBuilds, setContext } = useCharacterBuilds(masterData);
const { currentCharacter } = setupCharacterBuilds();

const { setup: setupLevels } = useLevels(currentCharacter);
setupLevels();

const { itemFilters, setup: setupItems } = useItems();
const { currentItemList } = setupItems();

const { setup: setupSpells } = useSpells(currentCharacter);
setupSpells();

const { setup: setupStats } = useStats(currentCharacter);
setupStats();

const { setup: setupAutoBuilder } = useAutoBuilder();
setupAutoBuilder();

const setContextIds = () => {
  setContext();
};

watch(
  [() => route.name, () => route.query],
  () => {
    nextTick(() => {
      setContextIds();
    });
  },
  { immediate: true }
);

provide('masterData', masterData);
provide('currentCharacter', currentCharacter);
provide('itemFilters', itemFilters);
provide('currentItemList', currentItemList);

onMounted(() => {
  console.log(
    // eslint-disable-next-line quotes
    "%cIf you're reading this, then I may be able to use your help!\nJoin the Discord server at https://discord.gg/k3v2fXQWJp if you are interested!",
    'font-size: 1rem'
  );
});

EventBus.on(Events.OPEN_OLD_DATA_DIALOG, (data) => {
  setTimeout(() => {
    oldDataDialog.value.open(data);
  }, 100);
});
</script>

<style lang="scss" scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.disclaimer {
  padding: 3px 0;
  width: 100%;
  text-align: center;
  font-size: 14px;
  background-color: var(--bonta-blue);
}
</style>
