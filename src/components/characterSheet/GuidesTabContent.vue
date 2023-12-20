<template>
  <div class="flex flex-column h-full">
    <div class="text-xl font-bold" style="text-transform: capitalize"> {{ $t('characterSheet.guidesContent.classGuides', { class: currentCharacter.class }) }} </div>
    <div class="mt-1">{{ $t('characterSheet.guidesContent.doYouHaveAGuide') }}</div>

    <div class="mt-3">
      <template v-for="guide in guideData" :key="guide.name">
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

    <p-divider />
    <!--
    <div class="text-xl font-bold" style="text-transform: capitalize">{{ currentCharacter.class }} Curated Builds</div>

    <div class="mt-3">curated builds list</div> -->
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';
import { CLASS_GUIDES_DATA } from '@/models/useConstants';

const currentCharacter = inject('currentCharacter');

const guideData = computed(() => {
  return CLASS_GUIDES_DATA[currentCharacter.value.class];
});

const onOpenGuide = (guide) => {
  window.open(guide.url, '_blank').focus();
};
</script>

<style lang="scss" scoped>
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
