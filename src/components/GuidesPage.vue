<template>
  <div class="flex flex-column flex-grow-1 ml-4 mr-3" style="height: 100%; overflow: hidden">
    <div class="mt-3" style="font-size: 42px">{{ $t('guidesPage.title') }}</div>
    <div class="mt-2">{{ $t('guidesPage.description') }}</div>
    <div class="mt-2">{{ $t('characterSheet.guidesContent.doYouHaveAGuide') }}</div>

    <p-divider />

    <p-inputText v-model="searchTerm" :placeholder="$t('guidesPage.searchGuides')" />

    <div class="guide-list mt-3 pr-1">
      <template v-for="guide in guides" :key="guide.name">
        <div class="guide-entry px-3 py-1 mb-2">
          <div class="guide-name">{{ guide.name }}</div>
          <div class="flex-grow-1" />
          <p-divider layout="vertical" />
          <div class="guide-language">
            {{
              (guide.languages[0] ? $t(guide.languages[0]) : '') +
              (guide.languages[1] ? ', ' + $t(guide.languages[1]) : '') +
              (guide.languages[2] ? ', ' + $t(guide.languages[2]) : '')
            }}
          </div>
          <p-divider layout="vertical" />
          <div class="guide-description">{{ guide.description }}</div>
          <p-button :label="$t('characterSheet.guidesContent.openGuide')" class="ml-2 py-1 px-3" style="min-width: fit-content" @click="onOpenGuide(guide)" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';

import { GENERAL_GUIDES_DATA } from '@/models/useConstants';

const searchTerm = ref('');

const guides = computed(() => {
  return GENERAL_GUIDES_DATA.filter((guide) => {
    return guide.name.toLowerCase().includes(searchTerm.value.toLowerCase()) || guide.description.toLowerCase().includes(searchTerm.value.toLowerCase());
  });
});

const onOpenGuide = (guide) => {
  window.open(guide.url, '_blank').focus();
};
</script>

<style lang="scss" scoped>
.guide-list {
  overflow-y: auto;
}

.guide-entry {
  display: flex;
  align-items: center;
  border: 1px solid var(--primary-50);
  border-radius: 8px;

  .guide-name {
    font-size: 1rem;
  }

  .guide-language {
    font-size: 0.75rem;
  }

  .guide-description {
    font-size: 0.75rem;
    max-width: 60ch;
  }
}
</style>
