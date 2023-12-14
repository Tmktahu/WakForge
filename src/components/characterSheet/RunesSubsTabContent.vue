<template>
  <div class="flex h-full">
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
                      'rune',
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
                    {{ $t(`items.${currentCharacter.equipment[slotKey][`runeSlot${index}`].rune.id}`) }}
                  </div>
                </template>
              </tippy>

              <div v-else class="rune-drop-zone ml-2" @dragover.prevent @dragenter.prevent @drop="onDrop($event, slotKey, `runeSlot${index}`)">
                <div class="rune-image">
                  <p-image :src="getEmptyRuneImage(null)" image-style="width: 26px" />
                </div>
              </div>
            </template>

            <tippy duration="0" class="flex h-full">
              <div
                class="sublimation-drop-zone ml-2"
                :class="{ invalid: !canSublimationFit(currentCharacter.equipment[slotKey], currentCharacter.equipment[slotKey].subSlot) }"
                @dragover.prevent
                @dragenter.prevent
                @drop="onDrop($event, slotKey, 'subSlot')"
                @click="onRemoveSublimation(slotKey)"
              >
                <template v-if="currentCharacter.equipment[slotKey].subSlot">
                  <div class="sublimation-entry flex align-items-center px-2">
                    <p-image
                      :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.equipment[slotKey].subSlot.imageId}.png`"
                      image-style="width: 24px"
                      class="flex"
                    />
                    <div class="ml-1">{{ $t(`items.${currentCharacter.equipment[slotKey].subSlot.id}`) }}</div>
                  </div>
                </template>

                <div v-else class="px-2" style="opacity: 0.5">
                  <p-image :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/812.png`" image-style="width: 30px" class="flex" />
                </div>
                <i class="pi pi-trash" />
              </div>

              <template v-slot:content>
                <div v-if="currentCharacter.equipment[slotKey].subSlot" class="item-card-tooltip">
                  <div class="effect-header flex pt-2 px-1">
                    <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.equipment[slotKey].subSlot.imageId}.png`" image-style="width: 40px" />
                    <div class="flex flex-column ml-1">
                      <div class="item-name mr-2">{{ $t(`items.${currentCharacter.equipment[slotKey].subSlot.id}`) }}</div>
                      <div class="rune-requirements flex justify-content-left gap-1 py-1">
                        <div
                          v-for="(colorId, index) in currentCharacter.equipment[slotKey].subSlot.sublimationParameters.slotColorPattern"
                          :key="index"
                          class="flex align-items-center"
                        >
                          <p-image :src="getFilledRuneImage(colorId)" image-style="width: 18px" class="flex" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <ItemStatList :item="currentCharacter.equipment[slotKey].subSlot" />
                </div>
              </template>
            </tippy>
          </div>

          <div v-else-if="slotKey !== 'undefined'" class="item-runes-section disabled flex align-items-center mb-2 pr-1">
            <div class="slot-image">
              <p-image :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${slotKey}.png`" image-style="width: 40px; height: 40px" />
            </div>

            <template v-for="index in 4" :key="index">
              <div class="rune-drop-zone ml-2" @dragover.prevent @dragenter.prevent @drop="onDrop($event, slotKey, `runeSlot${index}`)" />
            </template>

            <div class="info-text">An item must be equipped</div>
          </div>
        </template>
      </template>

      <div class="flex mb-2">
        <tippy duration="0" class="flex h-full">
          <div class="special-sublimation-drop-zone" @dragover.prevent @dragenter.prevent @drop="onDrop($event, null, 'epicSubSlot')" @click="onRemoveSublimation('epicSubSlot')">
            <template v-if="currentCharacter.epicSubSlot">
              <div class="sublimation-entry flex align-items-center px-2 py-1">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.epicSubSlot.imageId}.png`" image-style="width: 24px" class="flex" />
                <div class="ml-1">{{ $t(`items.${currentCharacter.epicSubSlot.id}`) }}</div>
              </div>
            </template>

            <div v-else class="flex align-items-center px-2" style="opacity: 0.7">
              <p-image :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/812.png`" image-style="width: 30px" class="flex" />
              Epic Sub
            </div>
            <i class="pi pi-trash" />
          </div>

          <template v-slot:content>
            <div v-if="currentCharacter.epicSubSlot" class="item-card-tooltip">
              <div class="effect-header flex pt-2 px-1">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.epicSubSlot.imageId}.png`" image-style="width: 40px" />
                <div class="flex flex-column ml-1">
                  <div class="item-name mr-2">{{ $t(`items.${currentCharacter.epicSubSlot.id}`) }}</div>
                  <div class="flex justify-content-left py-1 text-xs">
                    {{ currentCharacter.epicSubSlot.sublimationParameters.isEpic ? `${$t('constants.epicSublimation')}` : '' }}
                    {{ currentCharacter.epicSubSlot.sublimationParameters.isRelic ? `${$t('constants.relicSublimation')}` : '' }}
                  </div>
                </div>
              </div>

              <ItemStatList :item="currentCharacter.epicSubSlot" />
            </div>
          </template>
        </tippy>

        <tippy duration="0" class="flex h-full">
          <div
            class="special-sublimation-drop-zone ml-2"
            @dragover.prevent
            @dragenter.prevent
            @drop="onDrop($event, null, 'relicSubSlot')"
            @click="onRemoveSublimation('relicSubSlot')"
          >
            <template v-if="currentCharacter.relicSubSlot">
              <div class="sublimation-entry flex align-items-center px-2 py-1">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.relicSubSlot.imageId}.png`" image-style="width: 24px" class="flex" />
                <div class="ml-1">{{ $t(`items.${currentCharacter.relicSubSlot.id}`) }}</div>
              </div>
            </template>

            <div v-else class="flex align-items-center px-2" style="opacity: 0.7">
              <p-image :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/812.png`" image-style="width: 30px" class="flex" />
              Relic Sub
            </div>
            <i class="pi pi-trash" />
          </div>

          <template v-slot:content>
            <div v-if="currentCharacter.relicSubSlot" class="item-card-tooltip">
              <div class="effect-header flex pt-2 px-1">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.relicSubSlot.imageId}.png`" image-style="width: 40px" />
                <div class="flex flex-column ml-1">
                  <div class="item-name mr-2">{{ $t(`items.${currentCharacter.relicSubSlot.id}`) }}</div>
                  <div class="flex justify-content-left py-1 text-xs">
                    {{ currentCharacter.relicSubSlot.sublimationParameters.isEpic ? `${$t('constants.epicSublimation')}` : '' }}
                    {{ currentCharacter.relicSubSlot.sublimationParameters.isRelic ? `${$t('constants.relicSublimation')}` : '' }}
                  </div>
                </div>
              </div>

              <ItemStatList :item="currentCharacter.relicSubSlot" />
            </div>
          </template>
        </tippy>
      </div>

      <div class="stats-summary">
        <div class="text-lg my-1 pl-2">{{ $t('characterSheet.runesAndSubsContent.statsSummary') }}</div>
        <div class="stats-summary-list flex flex-column">
          <template v-for="runeOrSubId in Object.keys(summaryEntries)" :key="runeOrSubId">
            <div v-if="summaryEntries[runeOrSubId].rune" class="summary-entry px-2 py-1">
              <p-image :src="getFilledRuneImage(summaryEntries[runeOrSubId].rune.rune.shardsParameters.color)" image-style="width: 18px" />
              <div class="ml-2">+{{ summaryEntries[runeOrSubId].totalValue }} {{ $t(`items.${summaryEntries[runeOrSubId].rune.rune.id}`) }}</div>
            </div>

            <div
              v-else-if="summaryEntries[runeOrSubId].sublimation"
              class="summary-entry flex-column align-items-start"
              :class="{ warning: summaryEntries[runeOrSubId].totalValue > STATE_LEVEL_LIMITS[summaryEntries[runeOrSubId].sublimation.equipEffects[0].values[0]] }"
            >
              <div class="flex px-2 py-1">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${summaryEntries[runeOrSubId].sublimation.imageId}.png`" image-style="width: 18px" class="flex" />
                <div class="flex ml-2">
                  <span>+{{ summaryEntries[runeOrSubId].totalValue }} levels of</span>
                  <MultiTooltip :state-id="`${summaryEntries[runeOrSubId].sublimation.equipEffects[0].values[0]}`" :current-level="summaryEntries[runeOrSubId].totalValue" />
                </div>
              </div>
              <div
                v-if="summaryEntries[runeOrSubId].totalValue > STATE_LEVEL_LIMITS[summaryEntries[runeOrSubId].sublimation.equipEffects[0].values[0]]"
                class="warning-message flex pr-2 pl-3 py-1 w-full"
              >
                <i class="mdi mdi-arrow-up-left" style="margin-top: -2px; margin-right: 4px" />
                <span>This state only stacks up to level {{ STATE_LEVEL_LIMITS[summaryEntries[runeOrSubId].sublimation.equipEffects[0].values[0]] }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="flex flex-column mr-3">
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
              @dragstart="onDragStart($event, 'rune', rune)"
              @click="onRuneOptionClick($event, rune)"
            >
              <p-image class="rune-image" :src="getEmptyRuneImage(rune.shardsParameters.color)" image-style="width: 20px" />
              <div class="ml-2">+{{ getRuneValue(rune, runeLevel) }} {{ $t(`items.${rune.id}`) }}</div>
              <div class="flex-grow-1 mr-2" />
              <div v-for="slotId in rune.shardsParameters.doubleBonusPosition" :key="slotId" class="ml-1">
                <p-image
                  image-class="item-slot-image"
                  :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${slotNameFromId(slotId)}.png`"
                  :class="{ disabled: !currentCharacter.equipment[slotNameFromId(slotId)] }"
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

    <div class="flex flex-column">
      <p-inputText v-model="subSearchTerm" class="py-2" :placeholder="$t('characterSheet.runesAndSubsContent.searchSublimations')" />
      <div class="flex mt-2">
        <p-checkbox v-model="sortByMatching" :binary="true" />
        <div class="mx-2">{{ $t('characterSheet.runesAndSubsContent.sortByMatching') }}</div>
        <tippy placement="top">
          <i class="mdi mdi-information-outline" />
          <template v-slot:content>
            <div class="simple-tooltip">
              {{ $t('characterSheet.runesAndSubsContent.sortByMatchingNote') }}
            </div>
          </template>
        </tippy>
      </div>

      <div class="sublimation-options-wrapper flex flex-column my-2 py-1">
        <template v-for="sublimation in normalSublimationOptions" :key="sublimation.id">
          <MultiTooltip>
            <template v-slot:trigger>
              <div
                class="sublimation-option py-1 px-2 mb-1"
                :class="{ highlighted: canSublimationFit(currentCharacter.equipment[itemSlotHighlight], sublimation) }"
                draggable="true"
                @dragstart="onDragStart($event, 'sublimation', sublimation)"
              >
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${sublimation.imageId}.png`" image-style="width: 20px" class="flex" />
                <div v-if="sublimation.sublimationParameters?.slotColorPattern?.length" class="rune-requirements flex gap-1 mx-1 px-1 py-1">
                  <div v-for="(colorId, index) in sublimation.sublimationParameters.slotColorPattern" :key="index" class="flex align-items-center">
                    <p-image :src="getFilledRuneImage(colorId)" image-style="width: 18px" class="flex" />
                  </div>
                </div>
                <div>
                  {{ $t(`items.${sublimation.id}`) }}
                </div>
              </div>
            </template>

            <template v-slot:content>
              <div class="effect-header flex pt-2 px-1">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${sublimation.imageId}.png`" image-style="width: 40px" />
                <div class="flex flex-column ml-1">
                  <div class="item-name">{{ $t(`items.${sublimation.id}`) }}</div>
                  <div v-if="sublimation.sublimationParameters?.slotColorPattern?.length" class="rune-requirements flex justify-content-left gap-1 py-1">
                    <div v-for="(colorId, index) in sublimation.sublimationParameters.slotColorPattern" :key="index" class="flex align-items-center">
                      <p-image :src="getFilledRuneImage(colorId)" image-style="width: 18px" class="flex" />
                    </div>
                  </div>
                </div>
              </div>

              <ItemStatList :item="sublimation" />
            </template>
          </MultiTooltip>
        </template>
      </div>

      <p-inputText v-model="specialSubSearchTerm" class="py-2" :placeholder="$t('characterSheet.runesAndSubsContent.searchSublimations')" />
      <div class="flex mt-2">
        <p-checkbox v-model="showEpicSubs" :binary="true" />
        <div class="mx-2">{{ $t('constants.epic') }}</div>
        <p-checkbox v-model="showRelicSubs" :binary="true" />
        <div class="mx-2">{{ $t('constants.relic') }}</div>
      </div>

      <div class="sublimation-options-wrapper flex flex-column mt-2 py-1">
        <template v-for="sublimation in specialSublimationOptions" :key="sublimation.id">
          <MultiTooltip>
            <template v-slot:trigger>
              <div
                class="sublimation-option py-1 px-2 mb-1"
                :class="{ highlighted: canSublimationFit(currentCharacter.equipment[itemSlotHighlight], sublimation) }"
                draggable="true"
                @dragstart="onDragStart($event, 'sublimation', sublimation)"
              >
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${sublimation.imageId}.png`" image-style="width: 20px" class="flex" />
                <div class="ml-1">
                  {{ $t(`items.${sublimation.id}`) }}
                  {{ sublimation.sublimationParameters.isEpic ? `(${$t('constants.epic')})` : '' }}
                  {{ sublimation.sublimationParameters.isRelic ? `(${$t('constants.relic')})` : '' }}
                </div>
              </div>
            </template>

            <template v-slot:content>
              <div class="effect-header flex pt-2 px-1">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${sublimation.imageId}.png`" image-style="width: 40px" />
                <div class="flex flex-column ml-1">
                  <div class="item-name">{{ $t(`items.${sublimation.id}`) }}</div>
                  <div class="flex justify-content-left py-1 text-xs">
                    {{ sublimation.sublimationParameters.isEpic ? `${$t('constants.epicSublimation')}` : '' }}
                    {{ sublimation.sublimationParameters.isRelic ? `${$t('constants.relicSublimation')}` : '' }}
                  </div>
                </div>
              </div>

              <ItemStatList :item="sublimation" />
            </template>
          </MultiTooltip>
        </template>
      </div>
    </div>

    <p-contextMenu ref="runeContextMenu" :model="runeContextOptions">
      <template v-slot:item="{ item, props }">
        <div v-if="item.levelSlider" class="flex flex-column px-4 py-2">
          <div class="mb-2"> {{ $t('constants.level') }}: {{ currentCharacter.equipment[rightClickedRuneData.itemSlotKey][rightClickedRuneData.runeSlotKey].level }} </div>
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
import { ITEM_SLOT_DATA, RUNE_LEVEL_REQUIREMENTS, STATE_LEVEL_LIMITS } from '@/models/useConstants';

import MultiTooltip from '@/components/MultiTooltip.vue';
import ItemStatList from '@/components/characterSheet/ItemStatList.vue';

const { t } = useI18n();

const currentCharacter = inject('currentCharacter');

const { getRuneValue } = useStats();
const { getRunes, getSublimations, canSublimationFit } = useItems();
const runeOptions = computed(() => getRunes().sort((rune1, rune2) => rune1.shardsParameters.color - rune2.shardsParameters.color));
const normalSublimationOptions = computed(() =>
  getSublimations()
    .filter((sub) => sub.sublimationParameters.slotColorPattern.length > 0 && t(`items.${sub.id}`).toLowerCase().includes(subSearchTerm.value?.toLowerCase()))
    .sort((sub1, sub2) => t(`items.${sub1.id}`).localeCompare(t(`items.${sub2.id}`)))
    .sort((sub1, sub2) => {
      if (itemSlotHighlight.value && sortByMatching.value) {
        let match1 = canSublimationFit(currentCharacter.value.equipment[itemSlotHighlight.value], sub1) ? 1 : 0;
        let match2 = canSublimationFit(currentCharacter.value.equipment[itemSlotHighlight.value], sub2) ? 1 : 0;
        return match2 - match1;
      } else {
        return 0;
      }
    })
);
const specialSublimationOptions = computed(() =>
  getSublimations().filter((sub) => {
    return (
      isSpecialSublimation(sub) &&
      t(`items.${sub.id}`).toLowerCase().includes(specialSubSearchTerm.value?.toLowerCase()) &&
      (sub.sublimationParameters.isEpic ? showEpicSubs.value : true) &&
      (sub.sublimationParameters.isRelic ? showRelicSubs.value : true)
    );
  })
);
const subSearchTerm = ref('');
const specialSubSearchTerm = ref('');
const sortByMatching = ref(true);
const showEpicSubs = ref(true);
const showRelicSubs = ref(true);

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

      if (item.subSlot) {
        if (!entries[item.subSlot.equipEffects[0].values[0]]) {
          entries[item.subSlot.equipEffects[0].values[0]] = {
            totalValue: 0,
            sublimation: item.subSlot,
          };
        }

        entries[item.subSlot.equipEffects[0].values[0]].totalValue += item.subSlot.equipEffects[0].values[2];
      }
    }
  });

  if (currentCharacter.value.epicSubSlot) {
    entries[currentCharacter.value.epicSubSlot.equipEffects[0].values[0]] = {
      totalValue: 1,
      sublimation: currentCharacter.value.epicSubSlot,
    };
  }

  if (currentCharacter.value.relicSubSlot) {
    entries[currentCharacter.value.relicSubSlot.equipEffects[0].values[0]] = {
      totalValue: 1,
      sublimation: currentCharacter.value.relicSubSlot,
    };
  }

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
  if (itemSlotHighlight.value && currentCharacter.value.equipment[itemSlotHighlight.value] !== null) {
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

const onDragStart = (event, type, object, level) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';

  event.dataTransfer.setData('type', type);
  if (type === 'rune') {
    event.dataTransfer.setData('rune', JSON.stringify(object));
    if (level) {
      event.dataTransfer.setData('level', level);
    }
  }

  if (type === 'sublimation') {
    event.dataTransfer.setData('sublimation', JSON.stringify(object));
  }
};

const onDrop = (event, itemSlotKey, targetSlotKey) => {
  try {
    let type = event.dataTransfer.getData('type');
    if (type === 'rune' && targetSlotKey.includes('rune')) {
      let rune = JSON.parse(event.dataTransfer.getData('rune'));
      let level = event.dataTransfer.getData('level');
      currentCharacter.value.equipment[itemSlotKey][targetSlotKey] = {
        rune,
        color: rune.shardsParameters.color,
        level: level || runeLevel.value,
      };
    }

    if (type === 'sublimation') {
      let sublimation = JSON.parse(event.dataTransfer.getData('sublimation'));
      if (isSpecialSublimation(sublimation)) {
        if (sublimation.sublimationParameters.isEpic && targetSlotKey === 'epicSubSlot') {
          currentCharacter.value.epicSubSlot = sublimation;
        } else if (sublimation.sublimationParameters.isRelic && targetSlotKey === 'relicSubSlot') {
          currentCharacter.value.relicSubSlot = sublimation;
        }
      } else {
        currentCharacter.value.equipment[itemSlotKey].subSlot = sublimation;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const onRemoveAll = () => {
  let runeSlotKeys = ['runeSlot1', 'runeSlot2', 'runeSlot3', 'runeSlot4'];
  Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
    if (currentCharacter.value.equipment[slotKey]) {
      runeSlotKeys.forEach((runeSlotKey) => {
        currentCharacter.value.equipment[slotKey][runeSlotKey] = undefined;
      });
      currentCharacter.value.equipment[slotKey].subSlot = null;
    }
  });
};

const onRemoveSublimation = (itemSlotKey) => {
  if (itemSlotKey === 'epicSubSlot') {
    currentCharacter.value.epicSubSlot = null;
  } else if (itemSlotKey === 'relicSubSlot') {
    currentCharacter.value.relicSubSlot = null;
  } else {
    currentCharacter.value.equipment[itemSlotKey].subSlot = null;
  }
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

const isSpecialSublimation = (sublimation) => {
  return sublimation.sublimationParameters.isRelic || sublimation.sublimationParameters.isEpic;
};

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
    position: relative;
    pointer-events: none;

    .slot-image {
      opacity: 0.3;
    }

    .rune-drop-zone {
      opacity: 0.3;
    }

    .info-text {
      display: flex;
      align-items: center;
      justify-content: center;
      inset: 0;
      position: absolute;
      font-weight: 500;
    }
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
    cursor: grab;

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
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  border-left: 1px solid var(--primary-50);
  background-color: var(--primary-10);

  &.invalid {
    background-color: var(--error-40);
  }

  &:has(.sublimation-entry):hover {
    cursor: pointer;

    i {
      display: flex;
    }
  }

  i {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0;
    color: white;
    background-color: rgba(red, 0.5);
    font-size: 22px;
    font-weight: bold;
    pointer-events: none;
  }
}

.special-sublimation-drop-zone {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  border: 1px solid var(--primary-50);
  background-color: var(--primary-10);
  border-radius: 8px;
  overflow: hidden;

  &.invalid {
    background-color: var(--error-40);
  }

  &:has(.sublimation-entry):hover {
    cursor: pointer;

    i {
      display: flex;
    }
  }

  i {
    display: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    inset: 0;
    color: white;
    background-color: rgba(red, 0.5);
    font-size: 22px;
    font-weight: bold;
    pointer-events: none;
  }
}

:deep(.rune-draggable) {
  display: flex;
  align-items: center;
  height: 30px;
  background-color: var(--background-20);
  cursor: grab;
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

  .disabled {
    pointer-events: none;
    opacity: 0.3;
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

  .stats-summary-list {
    height: calc(100% - 30px);
    overflow-y: auto;
  }
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

    &.warning {
      background: var(--error-50) !important;
    }

    .warning-message {
      background-color: var(--error-40);
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
  border-radius: 4px;
  overflow: hidden;
}

.sublimation-options-wrapper {
  overflow-y: auto;
  border: 1px solid var(--primary-50);
  border-radius: 4px;
  min-height: 200px;
  .sublimation-option {
    display: flex;
    align-items: center;
    background-color: var(--background-20);
    cursor: grab;

    &:hover {
      background-color: var(--primary-30);
    }

    &.highlighted {
      background-color: var(--secondary-30);
    }
  }

  .rune-requirements {
    background-color: var(--background-40);
    border-radius: 8px;
  }
}
</style>
