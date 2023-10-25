<template>
  <div class="flex equipment-slots-wrapper pr-3">
    <template v-for="data in ITEM_SLOT_DATA" :key="data.id">
      <template v-if="readOnly">
        <div class="equipment-display" :class="{ 'has-item': currentCharacter.equipment[data.id] !== null }">
          <div v-if="currentCharacter?.equipment[data.id]?.imageId" class="flex align-items-center justify-content-center">
            <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.equipment[data.id]?.imageId}.png`" image-style="width: 40px" />
          </div>
          <div v-else class="flex align-items-center justify-content-center">
            <p-image :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${data.id}.png`" image-style="width: 60px" />
          </div>
        </div>
      </template>
      <template v-else>
        <p-button
          v-if="currentCharacter.equipment[data.id] === null"
          class="equipment-button"
          :class="{ 'has-item': currentCharacter.equipment[data.id] !== null }"
          @click="onEquipmentClick(data.id)"
        >
          <div class="flex align-items-center justify-content-center">
            <div class="hover-icon search"> <i class="pi pi-search" /> </div>
            <p-image :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${data.id}.png`" image-style="width: 60px" />
          </div>
        </p-button>
        <tippy v-else placement="bottom" interactive>
          <p-button class="equipment-button" :class="{ 'has-item': currentCharacter.equipment[data.id] !== null }" @click="onEquipmentClick(data.id)">
            <div class="flex align-items-center justify-content-center">
              <div class="hover-icon remove"> <i class="pi pi-trash" /> </div>
              <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.equipment[data.id]?.imageId}.png`" image-style="width: 40px" />
            </div>
          </p-button>
          <template v-slot:content>
            <div v-if="currentCharacter.equipment[data.id]" class="item-card-tooltip">
              <div class="effect-header flex pt-2 px-1">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.equipment[data.id]?.imageId}.png`" image-style="width: 40px" />
                <div class="flex flex-column">
                  <div class="item-name mr-2">{{ currentCharacter.equipment[data.id]?.name }}</div>
                  <div class="flex">
                    <p-image
                      class="mr-1"
                      :src="`https://tmktahu.github.io/WakfuAssets/rarities/${currentCharacter.equipment[data.id]?.rarity}.png`"
                      image-style="width: 12px;"
                    />
                    <p-image
                      class="mr-1"
                      :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${currentCharacter.equipment[data.id]?.type?.id}.png`"
                      image-style="width: 18px;"
                    />
                    <div v-if="LEVELABLE_ITEMS.includes(currentCharacter.equipment[data.id]?.type?.id)">Item Level: 50</div>
                    <div v-else>Level: {{ currentCharacter.equipment[data.id]?.level }}</div>
                  </div>
                </div>
              </div>
              <ItemStatList :item="currentCharacter.equipment[data.id]" />
            </div>
          </template>
        </tippy>
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

import { ITEM_SLOT_DATA, LEVELABLE_ITEMS } from '@/models/useConstants';

import ItemStatList from '@/components/ItemStatList.vue';

let props = defineProps({
  character: {
    type: Object,
    default: () => {},
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});

const currentCharacter = ref(props.character);
watch(
  () => props.character,
  () => {
    currentCharacter.value = props.character;
  }
);

const onEquipmentClick = (slotKey) => {
  if (currentCharacter.value.equipment[slotKey] !== null) {
    // if we have an item equipped in that slot, remove it
    currentCharacter.value.equipment[slotKey] = null;
  } else {
    // here we filter our search by this slot type
  }
};
</script>

<style lang="scss" scoped>
.equipment-slots-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.25rem;
}

.equipment-button {
  display: flex;
  justify-content: center;
  position: relative;

  min-width: 0px;
  width: 60px;
  height: 60px;
  padding: 0px;

  background: var(--bonta-blue-80);

  &.has-item {
    .p-image {
      background-color: var(--bonta-blue-20);
      border-radius: 4px;
      padding: 5px;
      height: 50px;
    }
  }

  .hover-icon {
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    display: none;
    color: white;

    &.remove {
      background-color: rgba(red, 0.3);
    }

    &.search {
      background-color: rgba(var(--bonta-blue-50), 0.3);
    }

    i {
      font-size: 40px;
    }
  }

  &:hover {
    .hover-icon {
      display: flex;
    }
  }
}

.equipment-display {
  display: flex;
  justify-content: center;
  position: relative;

  min-width: 0px;
  width: 60px;
  height: 60px;
  padding: 0px;

  background: var(--bonta-blue-80);

  &.has-item {
    .p-image {
      background-color: var(--bonta-blue-20);
      border-radius: 4px;
      padding: 5px;
      height: 50px;
    }
  }
}
</style>
