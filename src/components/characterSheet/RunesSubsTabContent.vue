<template>
  <div class="flex">
    <div class="flex flex-column">
      <div class="mb-2">
        <tippy placement="left" duration="0">
          <div class="flex">
            <div class="mr-2">{{ $t('characterSheet.runesAndSubsContent.hotkeysAndShortcuts') }}</div>
            <i class="mdi mdi-information-outline" />
          </div>
          <template v-slot:content>
            <div class="simple-tooltip flex flex-column">
              <div class="mb-1">{{ $t('characterSheet.runesAndSubsContent.dragAndDrop') }}</div>
              <div class="mb-1">{{ $t('characterSheet.runesAndSubsContent.dragReplace') }}</div>
              <div class="mb-1">{{ $t('characterSheet.runesAndSubsContent.ctrlClick') }}</div>
              <div class="mb-1">{{ $t('characterSheet.runesAndSubsContent.shiftClick') }}</div>
              <div class="mb-1">{{ $t('characterSheet.runesAndSubsContent.rightClick') }}</div>
              <div class="mb-1">{{ $t('characterSheet.runesAndSubsContent.hightlightClick') }}</div>
            </div>
          </template>
        </tippy>
      </div>

      <template v-for="slotKey in Object.keys(currentCharacter.equipment)" :key="slotKey">
        <template v-if="slotKey !== 'ACCESSORY' && slotKey !== 'PET' && slotKey !== 'MOUNT' && slotKey !== 'SECOND_WEAPON'">
          <div v-if="slotKey !== 'undefined' && currentCharacter.equipment[slotKey]" class="item-runes-section flex align-items-center mb-2">
            <div class="slot-image" :class="{ highlighted: itemSlotHighlight === slotKey }" @click="onItemSlotClick($event, slotKey)">
              <p-image :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${slotKey}.png`" image-style="width: 40px; height: 40px" />
            </div>

            <template v-for="index in 4" :key="index">
              <tippy v-if="currentCharacter.equipment[slotKey][`runeSlot${index}`]" duration="0">
                <div
                  class="rune-drop-zone equipped ml-2"
                  draggable="true"
                  @click="onRuneClick($event, slotKey, `runeSlot${index}`)"
                  @dragover.prevent
                  @dragenter.prevent
                  @drop="onDrop($event, slotKey, `runeSlot${index}`)"
                  @contextmenu="onRightClick($event, slotKey, `runeSlot${index}`)"
                  @dragstart="
                    onDragStart(
                      $event,
                      currentCharacter.equipment[slotKey][`runeSlot${index}`].rune,
                      // eslint-disable-next-line vue/comma-dangle
                      currentCharacter.equipment[slotKey][`runeSlot${index}`].level
                    )
                  "
                >
                  <div class="rune-image">
                    <p-image :src="getFilledRuneImage(currentCharacter.equipment[slotKey][`runeSlot${index}`].color)" image-style="width: 26px" />
                  </div>
                  <div class="rune-level">{{ currentCharacter.equipment[slotKey][`runeSlot${index}`].level }}</div>
                </div>

                <template v-slot:content>
                  <div class="simple-tooltip">
                    +{{
                      getRuneValue(
                        currentCharacter.equipment[slotKey][`runeSlot${index}`].rune,
                        currentCharacter.equipment[slotKey][`runeSlot${index}`].level,
                        // eslint-disable-next-line vue/comma-dangle
                        slotKey
                      )
                    }}
                    {{ currentCharacter.equipment[slotKey][`runeSlot${index}`].rune.name }}
                  </div>
                </template>
              </tippy>

              <div v-else class="rune-drop-zone ml-2" @dragover.prevent @dragenter.prevent @drop="onDrop($event, slotKey, `runeSlot${index}`)">
                <div class="rune-image">
                  <p-image :src="getEmptyRuneImage(null)" image-style="width: 26px" />
                </div>
              </div>
            </template>

            <div class="sublimation-drop-zone ml-2 pl-2 pr-2">sub</div>
          </div>
          <div v-else-if="slotKey !== 'undefined'" class="item-runes-section disabled flex align-items-center mb-2 pr-1">
            <div class="slot-image">
              <p-image :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${slotKey}.png`" image-style="width: 40px; height: 40px" />
            </div>

            <template v-for="index in 4" :key="index">
              <div class="rune-drop-zone ml-2" @dragover.prevent @dragenter.prevent @drop="onDrop($event, slotKey, `runeSlot${index}`)" />
            </template>
          </div>
        </template>
      </template>

      <div class="stats-summary">
        <div class="text-lg my-1 pl-2">{{ $t('characterSheet.runesAndSubsContent.statsSummary') }}</div>
        <div class="stats-summary-list flex flex-column">
          <template v-for="runeId in Object.keys(summaryEntries)" :key="runeId">
            <div class="summary-entry px-2 py-1">
              <p-image :src="getFilledRuneImage(summaryEntries[runeId].rune.rune.shardsParameters.color)" image-style="width: 18px" />
              <div class="ml-2">+{{ summaryEntries[runeId].totalValue }} {{ summaryEntries[runeId].rune.rune.name }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="flex flex-column">
      <div class="rune-options-wrapper flex flex-column ml-3 pt-2">
        <div class="flex align-items-center justify-content-center">
          <tippy placement="left" duration="0">
            <i class="mdi mdi-information-outline" />
            <template v-slot:content>
              <div class="simple-tooltip">
                {{ $t('characterSheet.runesAndSubsContent.runeLevelTooltip') }}
              </div>
            </template>
          </tippy>
          <span class="mx-2">{{ $t('characterSheet.runesAndSubsContent.runeLevel') }}</span>
          <p-inputNumber v-model="runeLevel" class="number-input" show-buttons button-layout="horizontal" :min="1" :max="maxRuneLevel" :allow-empty="false" />
        </div>

        <div class="rune-options flex flex-column mt-2">
          <template v-for="rune in runeOptions" :key="rune.id">
            <div
              class="rune-draggable mb-1 px-2"
              :class="{ highlighted: itemSlotHighlight && rune.shardsParameters.doubleBonusPosition.includes(ITEM_SLOT_DATA[itemSlotHighlight].rawId) }"
              draggable="true"
              @dragstart="onDragStart($event, rune)"
              @click="onRuneOptionClick($event, rune)"
            >
              <p-image class="rune-image" :src="getEmptyRuneImage(rune.shardsParameters.color)" image-style="width: 20px" />
              <div class="ml-2">+{{ getRuneValue(rune, runeLevel) }} {{ rune.name }}</div>
              <div class="flex-grow-1 mr-2" />
              <div v-for="slotId in rune.shardsParameters.doubleBonusPosition" :key="slotId" class="ml-1">
                <p-image
                  image-class="item-slot-image"
                  :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${slotNameFromId(slotId)}.png`"
                  @click="onItemSlotClick($event, slotNameFromId(slotId))"
                />
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="ml-3 mt-2">
        <p-button :label="$t('characterSheet.runesAndSubsContent.removeAllRunes')" @click="onRemoveAll" />
      </div>
    </div>

    <p-contextMenu ref="runeContextMenu" :model="runeContextOptions">
      <template v-slot:item="{ item, props }">
        <div v-if="item.levelSlider" class="flex flex-column px-4 py-2">
          <div class="mb-2"
            >{{ $t('constants.level') }}: {{ currentCharacter.equipment[rightClickedRuneData.itemSlotKey][rightClickedRuneData.runeSlotKey].level }}</div
          >
          <p-slider v-model="currentCharacter.equipment[rightClickedRuneData.itemSlotKey][rightClickedRuneData.runeSlotKey].level" :min="1" :max="11" />
        </div>
        <a v-else v-ripple class="flex align-items-center" v-bind="props.action">
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
    </p-contextMenu>
  </div>
</template>

<script setup>
import { ref, inject, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useItems } from '@/models/useItems';
import { useStats } from '@/models/useStats';
import { ITEM_SLOT_DATA, RUNE_LEVEL_REQUIREMENTS } from '@/models/useConstants';

const { t } = useI18n();

const currentCharacter = inject('currentCharacter');

const { getRuneValue } = useStats();
const { getRunes, getSublimations } = useItems();
const runeOptions = computed(() => getRunes().sort((rune1, rune2) => rune1.shardsParameters.color - rune2.shardsParameters.color));
const sublimationOptions = ref(getSublimations());

const runeLevel = ref(1);
const itemSlotHighlight = ref(null);

const rightClickedRuneData = ref(null);
const runeContextMenu = ref(null);
const runeContextOptions = ref([
  {
    label: t('constants.level'),
    levelSlider: true,
  },
  {
    label: t('characterSheet.runesAndSubsContent.toggleWhite'),
    command: () => {
      if (rightClickedRuneData.value) {
        if (currentCharacter.value.equipment[rightClickedRuneData.value.itemSlotKey][rightClickedRuneData.value.runeSlotKey].color === 0) {
          currentCharacter.value.equipment[rightClickedRuneData.value.itemSlotKey][rightClickedRuneData.value.runeSlotKey].color =
            currentCharacter.value.equipment[rightClickedRuneData.value.itemSlotKey][rightClickedRuneData.value.runeSlotKey].rune.shardsParameters.color;
        } else {
          currentCharacter.value.equipment[rightClickedRuneData.value.itemSlotKey][rightClickedRuneData.value.runeSlotKey].color = 0;
        }
      }
    },
  },
  {
    label: t('constants.remove'),
    command: () => {
      currentCharacter.value.equipment[rightClickedRuneData.value.itemSlotKey][rightClickedRuneData.value.runeSlotKey] = null;
    },
  },
]);

const summaryEntries = computed(() => {
  let entries = {};

  Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
    // if the item slot has an item assigned, we're good to go
    if (currentCharacter.value.equipment[slotKey] !== null) {
      // grab the item
      let item = currentCharacter.value.equipment[slotKey];

      for (let runeSlotIndex = 1; runeSlotIndex <= 4; runeSlotIndex++) {
        let possibleRune = item[`runeSlot${runeSlotIndex}`];
        if (possibleRune) {
          if (!entries[possibleRune.rune.id]) {
            entries[possibleRune.rune.id] = {
              totalValue: 0,
              rune: possibleRune,
            };
          }

          entries[possibleRune.rune.id].totalValue += getRuneValue(possibleRune.rune, possibleRune.level, slotKey);
        }
      }
    }
  });

  return entries;
});

const onItemSlotClick = (event, slotKey) => {
  event.stopPropagation();
  if (itemSlotHighlight.value === slotKey) {
    itemSlotHighlight.value = null;
  } else {
    itemSlotHighlight.value = slotKey;
  }
};

const onRuneClick = (event, itemSlotKey, runeSlotKey) => {
  if (event.shiftKey) {
    if (currentCharacter.value.equipment[itemSlotKey][runeSlotKey].color === 0) {
      currentCharacter.value.equipment[itemSlotKey][runeSlotKey].color = currentCharacter.value.equipment[itemSlotKey][runeSlotKey].rune.shardsParameters.color;
    } else {
      currentCharacter.value.equipment[itemSlotKey][runeSlotKey].color = 0;
    }
  }

  if (event.ctrlKey) {
    currentCharacter.value.equipment[itemSlotKey][runeSlotKey] = null;
  }
};

const onRightClick = (event, itemSlotKey, runeSlotKey) => {
  let rune = currentCharacter.value.equipment[itemSlotKey][runeSlotKey];

  if (rune) {
    rightClickedRuneData.value = { itemSlotKey, runeSlotKey };
    runeContextMenu.value.show(event);
  }
};

const onRuneOptionClick = (event, rune) => {
  if (itemSlotHighlight.value) {
    let runeSlotKeys = ['runeSlot1', 'runeSlot2', 'runeSlot3', 'runeSlot4'];

    for (let keyIndex in runeSlotKeys) {
      if (
        currentCharacter.value.equipment[itemSlotHighlight.value][runeSlotKeys[keyIndex]] === null ||
        currentCharacter.value.equipment[itemSlotHighlight.value][runeSlotKeys[keyIndex]] === undefined
      ) {
        currentCharacter.value.equipment[itemSlotHighlight.value][runeSlotKeys[keyIndex]] = {
          rune,
          color: rune.shardsParameters.color,
          level: runeLevel.value,
        };
        break;
      }
    }
  }
};

const onDragStart = (event, rune, level) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('rune', JSON.stringify(rune));
  if (level) {
    event.dataTransfer.setData('level', level);
  }
};

const onDrop = (event, itemSlotKey, runeSlotKey) => {
  try {
    let rune = JSON.parse(event.dataTransfer.getData('rune'));
    let level = event.dataTransfer.getData('level');
    currentCharacter.value.equipment[itemSlotKey][runeSlotKey] = {
      rune,
      color: rune.shardsParameters.color,
      level: level || runeLevel.value,
    };
  } catch (error) {
    // console.error(error)
  }
};

const onRemoveAll = () => {
  let runeSlotKeys = ['runeSlot1', 'runeSlot2', 'runeSlot3', 'runeSlot4'];
  Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
    if (currentCharacter.value.equipment[slotKey]) {
      runeSlotKeys.forEach((runeSlotKey) => {
        currentCharacter.value.equipment[slotKey][runeSlotKey] = undefined;
      });
    }
  });
};

const getEmptyRuneImage = (colorId) => {
  if (colorId) {
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

const getFilledRuneImage = (colorId) => {
  if (colorId) {
    switch (colorId) {
      case 1:
        return 'https://tmktahu.github.io/WakfuAssets/misc/shardRedFull.png';
      case 2:
        return 'https://tmktahu.github.io/WakfuAssets/misc/shardGreenFull.png';
      case 3:
        return 'https://tmktahu.github.io/WakfuAssets/misc/shardBlueFull.png';
      default:
        return 'https://tmktahu.github.io/WakfuAssets/misc/shardWhiteFull.png';
    }
  } else {
    return 'https://tmktahu.github.io/WakfuAssets/misc/shardWhiteFull.png';
  }
};

const slotNameFromId = (slotRawId) => {
  return Object.keys(ITEM_SLOT_DATA).find((id) => ITEM_SLOT_DATA[id].rawId === slotRawId);
};

const maxRuneLevel = computed(() => {
  let level = 1;
  RUNE_LEVEL_REQUIREMENTS.some((levelBreakpoint, index) => {
    if (levelBreakpoint <= currentCharacter.value.level) {
      level = index + 1;
      return false;
    } else {
      return true;
    }
  });

  return level;
});

watch(
  () => currentCharacter.value.level,
  () => {
    runeLevel.value = maxRuneLevel.value;
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.item-runes-section {
  border: 1px solid var(--highlight-50);
  width: fit-content;
  border-radius: 8px;
  height: 42px;
  overflow: hidden;

  &.disabled {
    pointer-events: none;
    opacity: 0.3;
  }

  .slot-image {
    width: 40px;
    height: 40px;
    background-color: var(--highlight-50);
    cursor: pointer;

    &.highlighted {
      background-color: var(--secondary-30);
    }

    &:hover {
      background-color: var(--secondary-40);
    }
  }
}

.rune-drop-zone {
  position: relative;
  display: flex;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: var(--primary-30);
  border-radius: 4px;

  &.equipped {
    cursor: pointer;

    &:hover {
      background-color: var(--primary-70);
    }
  }

  .rune-level {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 16px;
    font-weight: bold;
    background-color: black;
    padding-left: 2px;
    padding-right: 2px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 4px;
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
}

.sublimation-drop-zone {
  display: flex;
  align-items: center;
  height: 100%;
  border-left: 1px solid var(--primary-50);
}

:deep(.rune-draggable) {
  display: flex;
  align-items: center;
  height: 30px;
  background-color: var(--background-20);
  cursor: pointer;
  font-size: 0.9rem;

  .rune-image {
    pointer-events: none;
  }

  span {
    display: flex;
    height: fit-content;
  }

  &.highlighted {
    background-color: var(--secondary-30);
  }

  &:hover {
    background-color: var(--primary-30);
  }

  .item-slot-image {
    width: 27px;
    height: 27px;
    background: var(--primary-50);
    border-radius: 8px;

    &:hover {
      background-color: var(--secondary-60);
    }
  }
}

.stats-summary {
  border: 1px solid var(--highlight-50);
  border-radius: 8px;
  overflow: hidden;
}

.stats-summary-list {
  .summary-entry {
    display: flex;
    align-items: center;
    font-size: 0.9rem;

    span {
      display: flex;
      height: fit-content;
    }
  }

  .summary-entry:nth-child(2n-1) {
    background: var(--background-20);
  }

  .summary-entry:nth-child(2n) {
    background: var(--primary-20);
  }
}

.rune-options-wrapper {
  border: 1px solid var(--primary-50);
  height: fit-content;
  border-radius: 8px;
  overflow: hidden;
}
</style>
