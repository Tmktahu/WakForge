<template>
  <div v-if="withStats" class="item-card with-stats flex flex-column">
    <div class="flex px-2 py-2 relative">
      <div class="rarity-background-color" :style="`background-color: ${getRarityColor(item.rarity)}`"></div>
      <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${item.imageId}.png`" image-style="width: 40px" />
      <div class="flex flex-column ml-1">
        <div class="item-name mr-2 truncate" style="max-width: 15ch">{{ $t(`items.${item.id}`) }}</div>
        <div class="flex">
          <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
          <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
          <div v-if="LEVELABLE_ITEMS.includes(item.type.id)"> {{ $t('characterSheet.equipmentContent.itemLevel') }}: {{ item.id === 12237 ? '25' : '50' }} </div>
          <div v-else>Lvl: {{ item.level }}</div>
          <div v-if="item.type.validSlots[0] === ITEM_SLOT_DATA.FIRST_WEAPON.id" class="ml-1">
            {{ item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) ? '(2H)' : '(1H)' }}
          </div>
        </div>
      </div>
      <div class="flex-grow-1" />

      <div class="flex flex-column gap-1">
        <p-button icon="pi pi-plus" class="equip-button" @click="onEquipItem(item, $event)" />
        <p-button icon="pi pi-question-circle" class="equip-button" @click="onGotoEncyclopedia(item)" />
      </div>
    </div>

    <div class="flex w-full" style="overflow-y: auto">
      <ItemStatList card-mode :item="item" :with-totals="withTotals" :with-comparisons="withComparisons" class="w-full" />
    </div>
  </div>

  <MultiTooltip v-else delay="[0, 0]" duration="0" position="top" :offset="[0, -2]" :append-to="() => documentVar.body" :sticky="sticky" :max-width="500" inline>
    <template v-slot:trigger>
      <div class="item-card">
        <div v-if="withSlotLabel" class="slot-label text-center pt-1 pb-1">
          {{ item.type.validSlots[0] === 'LEFT_HAND' ? 'Ring' : $t(ITEM_SLOT_DATA[item.type.validSlots[0]].name) }} Slot
        </div>
        <div class="flex px-2 py-2 relative">
          <div class="rarity-background-color" :style="`background-color: ${getRarityColor(item.rarity)}`"></div>
          <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${item.imageId}.png`" image-style="width: 40px" />
          <div class="flex flex-column ml-1">
            <div class="item-name mr-2 truncate" :style="`max-width: ${withExcludeButton ? '116px' : '15ch'}`">{{ $t(`items.${item.id}`) }}</div>
            <div class="flex align-items-center">
              <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
              <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
              <div v-if="LEVELABLE_ITEMS.includes(item.type.id)" class="text-sm">{{ $t('tooltips.itemLevel') }}: {{ item.id === 12237 ? '25' : '50' }} </div>
              <div v-else class="text-sm">Lvl: {{ item.level }}</div>
              <div v-if="item.type.validSlots[0] === ITEM_SLOT_DATA.FIRST_WEAPON.id" class="ml-1">
                {{ item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) ? '(2H)' : '(1H)' }}
              </div>
            </div>
          </div>
          <div class="flex-grow-1" />

          <div class="flex flex-column">
            <p-button icon="pi pi-plus" class="action-button mb-1" @click="onEquipItem(item, $event)" />

            <tippy placement="left">
              <p-button icon="pi pi-question-circle" class="action-button" @click="onGotoEncyclopedia(item)" />
              <template v-slot:content>
                <div class="simple-tooltip">{{ $t('tooltips.openEncyclopediaPage') }}</div>
              </template>
            </tippy>
          </div>

          <div v-if="withExcludeButton" class="flex ml-1">
            <tippy placement="left">
              <p-button icon="pi pi-ban" class="exclude-button" @click="onExcludeItem(item)" />
              <template v-slot:content>
                <div class="simple-tooltip">{{ $t('tooltips.excludeItem') }}</div>
              </template>
            </tippy>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:content>
      <div v-if="item" class="item-card-tooltip">
        <div v-if="conflictingItem && withComparisons" class="effect-header existing-item flex pt-2 px-1">
          <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${conflictingItem.imageId}.png`" image-style="width: 40px" />
          <div class="flex flex-column ml-1">
            <div class="item-name mr-2">{{ $t(`items.${conflictingItem.id}`) }}</div>
            <div class="flex align-items-center">
              <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${conflictingItem.rarity}.png`" image-style="width: 12px;" />
              <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${conflictingItem.type.id}.png`" image-style="width: 18px;" />
              <div v-if="LEVELABLE_ITEMS.includes(conflictingItem.type.id)" class="text-sm">{{ $t('tooltips.itemLevel') }}: {{ conflictingItem.id === 12237 ? '25' : '50' }}</div>
              <div v-else class="text-sm">Lvl: {{ conflictingItem.level }}</div>
              <div v-if="conflictingItem.type.validSlots[0] === ITEM_SLOT_DATA.FIRST_WEAPON.id" class="ml-1">
                {{ conflictingItem.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) ? '(2H)' : '(1H)' }}
              </div>
              <div class="ml-1">({{ $t('tooltips.equipped') }})</div>
            </div>
          </div>
        </div>

        <ItemStatList :item="item" :with-comparisons="withComparisons" :with-totals="withTotals" />

        <div class="effect-header flex pt-2 px-1">
          <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${item.imageId}.png`" image-style="width: 40px" />
          <div class="flex flex-column ml-1">
            <div class="item-name mr-2">{{ $t(`items.${item.id}`) }}</div>
            <div class="flex">
              <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
              <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
              <div v-if="LEVELABLE_ITEMS.includes(item.type.id)">{{ $t('tooltips.itemLevel') }}: {{ item.id === 12237 ? '25' : '50' }}</div>
              <div v-else>Lvl: {{ item.level }}</div>
              <div v-if="item.type.validSlots[0] === ITEM_SLOT_DATA.FIRST_WEAPON.id" class="ml-1">
                {{ item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) ? '(2H)' : '(1H)' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </MultiTooltip>
</template>

<script setup>
import { computed, inject } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

import { LEVELABLE_ITEMS, ITEM_SLOT_DATA, ITEM_RARITY_DATA } from '@/models/useConstants';
import { useEncyclopedia } from '@/models/useEncyclopedia';
import { useItems } from '@/models/useItems';

import ItemStatList from '@/components/characterSheet/ItemStatList.vue';
import MultiTooltip from '@/components/MultiTooltip.vue';

let emit = defineEmits(['excludeItem']);

let props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  withSlotLabel: {
    type: Boolean,
    default: false,
  },
  withTotals: {
    type: Boolean,
    default: false,
  },
  withComparisons: {
    type: Boolean,
    default: false,
  },
  withExcludeButton: {
    type: Boolean,
    default: false,
  },
  withStats: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
});

let documentVar = document;
const confirm = useConfirm();

const currentCharacter = inject('currentCharacter');

const { getItemEncyclopediaUrl } = useEncyclopedia();
const { equipItem } = useItems(currentCharacter);

const conflictingItem = computed(() => {
  let validSlots = props.item.type.validSlots;
  let targetSlot = validSlots[0]; // how do we handle rings?
  let equippedItemEntry = currentCharacter?.value?.equipment[targetSlot];

  if (equippedItemEntry && equippedItemEntry.item?.id !== props.item?.id) {
    return equippedItemEntry.item;
  } else {
    return null;
  }
});

const onEquipItem = (item, event) => {
  equipItem(item, event, confirm);
};

const onExcludeItem = (item) => {
  emit('excludeItem', item);
};

const onGotoEncyclopedia = (item) => {
  let url = getItemEncyclopediaUrl(item);
  window.open(url, '_blank');
};

const getRarityColor = (rarityId) => {
  return ITEM_RARITY_DATA.find((entry) => entry.id === rarityId).color;
}
</script>

<style lang="scss" scoped>
.item-card {
  width: 230px;
  height: 85px;
  overflow: hidden;

  &.with-stats {
    height: 215px !important;
    width: 310px !important;
  }

  .slot-label {
    background-color: var(--primary-30);
  }
}

.action-button {
  padding: 2px;
  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;

  .p-button-icon {
    font-size: 14px;
    font-weight: 800;
  }
}

.exclude-button {
  padding: 2px;
  min-width: 20px;
  max-width: 20px;
  height: 100%;
  background-color: var(--error-80);

  .p-button-icon {
    font-size: 14px;
    font-weight: 800;
  }
}

.rarity-background-color {
  position: absolute;
  inset: 0;
  opacity: 0.1;
}
</style>
