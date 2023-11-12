<template>
  <div class="flex">
    <div class="flex flex-column">
      <template v-for="slotKey in Object.keys(currentCharacter.equipment)" :key="slotKey">
        <template v-if="slotKey !== 'ACCESSORY' && slotKey !== 'PET' && slotKey !== 'MOUNT' && slotKey !== 'SECOND_WEAPON'">
          <div v-if="slotKey !== 'undefined' && currentCharacter.equipment[slotKey]" class="item-runes-section flex align-items-center mb-2">
            <div class="slot-image"><p-image :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${slotKey}.png`" image-style="width: 40px" /></div>

            <template v-for="index in 4" :key="index">
              <div class="rune-drop-zone ml-2" @dragover.prevent @dragenter.prevent @drop="onDrop($event, slotKey, `runeSlot${index}`)">
                <div v-if="currentCharacter.equipment[slotKey][`runeSlot${index}`]" class="rune-image">
                  <!-- {{ currentCharacter.equipment[slotKey][`runeSlot${index}`] }} -->
                  <p-image :src="getRuneImage(currentCharacter.equipment[slotKey][`runeSlot${index}`].rune)" image-style="width: 26px" />
                </div>
                <div v-else class="rune-image">
                  <p-image :src="getRuneImage(null)" image-style="width: 26px" />
                </div>
              </div>
            </template>

            <div class="sublimation-drop-zone ml-2 pl-2 pr-2">sub</div>
          </div>
          <div v-else-if="slotKey !== 'undefined'" class="item-runes-section disabled flex align-items-center mb-2 pr-1">
            <div class="slot-image"><p-image :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${slotKey}.png`" image-style="width: 40px" /></div>

            <template v-for="index in 4" :key="index">
              <div class="rune-drop-zone ml-2" @dragover.prevent @dragenter.prevent @drop="onDrop($event, slotKey, `runeSlot${index}`)" />
            </template>
          </div>
        </template>
      </template>
    </div>

    <div class="rune-options flex flex-column ml-3">
      <template v-for="rune in runeOptions" :key="rune.id">
        <div class="rune-draggable mb-1 px-2" draggable="true" @dragstart="onDragStart($event, rune)">
          <p-image :src="getRuneImage(rune)" image-style="width: 20px" />
          <div class="ml-2">{{ rune.name }}</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue';

import { useItems } from '@/models/useItems';

const currentCharacter = inject('currentCharacter');

const { getRunes, getSublimations } = useItems();
const runeOptions = computed(() => getRunes().sort((rune1, rune2) => rune1.shardsParameters.color - rune2.shardsParameters.color));
const sublimationOptions = ref(getSublimations());

const onDragStart = (event, rune) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('rune', JSON.stringify(rune));
};

const onDrop = (event, itemSlotKey, runeSlotKey) => {
  try {
    let rune = JSON.parse(event.dataTransfer.getData('rune'));
    console.log(rune);
    currentCharacter.value.equipment[itemSlotKey][runeSlotKey] = {
      rune,
      level: 1, // TODO
    };
  } catch (error) {
    // console.error(error)
  }
};

const getRuneImage = (rune) => {
  if (rune) {
    console.log(rune);
    let colorId = rune.shardsParameters.color;
    console.log(rune.name, colorId);
    switch (colorId) {
      case 1:
        return 'https://tmktahu.github.io/WakfuAssets/misc/shardRedEmpty.png';
      case 2:
        return 'https://tmktahu.github.io/WakfuAssets/misc/shardGreenEmpty.png';
      case 3:
        return 'https://tmktahu.github.io/WakfuAssets/misc/shardBlueEmpty.png';
      default:
        return 'https://tmktahu.github.io/WakfuAssets/misc/shardWhiteEmpty.png';
    }
  } else {
    return 'https://tmktahu.github.io/WakfuAssets/misc/shardWhiteEmpty.png';
  }
};
</script>

<style lang="scss" scoped>
.item-runes-section {
  border: 1px solid var(--bonta-blue-100);
  width: fit-content;
  border-radius: 8px;
  height: 42px;

  &.disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  .slot-image {
    width: 42px;
    height: 42px;
    border-radius: 8px;
    background-color: var(--bonta-blue-100);
  }
}
.rune-drop-zone {
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: var(--bonta-blue-50);
  border-radius: 4px;
}

.sublimation-drop-zone {
  display: flex;
  align-items: center;
  height: 100%;
  border-left: 1px solid var(--bonta-blue-100);
}

.rune-draggable {
  display: flex;
  align-items: center;
  height: 30px;
  background-color: var(--bonta-blue-40);
  cursor: pointer;
  font-size: 0.9rem;

  .p-image {
    pointer-events: none;
  }

  &:hover {
    background-color: var(--bonta-blue-60);
  }
}

.rune-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 1px;
  margin-left: 1px;

  span {
    display: flex;
    height: fit-content;
  }
}
</style>
