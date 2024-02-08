<template>
  <div class="flex equipment-slots-wrapper">
    <div v-if="withDefaultElemSelector" class="flex flex-column h-full">
      <div>
        <tippy>
          <div class="random-defaults-button flex align-items-center justify-content-center w-full" @click="onEditDefaults(defaultRandomMasteries, 'mastery', $event)">
            <p-image v-for="type in defaultRandomMasteries" :key="type" :src="`https://tmktahu.github.io/WakfuAssets/statistics/${type}_coin.png`" image-style="width: 24px" />
          </div>

          <template v-slot:content>
            <div class="simple-tooltip">Random Mastery Defaults</div>
          </template>
        </tippy>
      </div>

      <div class="flex-grow-1" />

      <div>
        <tippy placement="bottom" duration="0">
          <div class="random-defaults-button flex align-items-center justify-content-center w-full" @click="onEditDefaults(defaultRandomResistances, 'resistance', $event)">
            <p-image v-for="type in defaultRandomResistances" :key="type" :src="`https://tmktahu.github.io/WakfuAssets/statistics/${type}_coin.png`" image-style="width: 24px" />
          </div>
          <template v-slot:content>
            <div class="simple-tooltip">Random Resistance Defaults</div>
          </template>
        </tippy>
      </div>
    </div>

    <template v-for="(data, key, index) in ITEM_SLOT_DATA" :key="data.id">
      <template v-if="readOnly">
        <div class="equipment-display" :class="{ 'has-item': items[data.id] && items[data.id].item !== null }">
          <div v-if="items[data.id] && items[data.id].item">
            <!-- <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${items[data.id].item?.imageId}.png`" image-style="width: 40px" /> -->

            <MultiTooltip placement="bottom" duration="0">
              <template v-slot:trigger>
                <div class="equipment-button" :class="{ 'has-item': items[data.id].item !== null }">
                  <div class="flex align-items-center justify-content-center w-full" style="position: relative">
                    <p-image class="equipment-image" :src="`https://tmktahu.github.io/WakfuAssets/items/${items[data.id].item.imageId}.png`" image-style="width: 40px" />

                    <div v-if="getRandomMasteryEffect(data.id) !== null" class="random-stat-icons-wrapper">
                      <p-image
                        v-for="masteryIndex in getRandomMasteryEffect(data.id).values[2]"
                        :key="masteryIndex"
                        :src="`https://tmktahu.github.io/WakfuAssets/statistics/${getRandomMasteryEffect(data.id)[`masterySlot${masteryIndex}`].type}_coin.png`"
                        image-style="width: 16px"
                      />
                    </div>

                    <div v-if="getRandomResistanceEffect(data.id) !== null" class="random-stat-icons-wrapper">
                      <p-image
                        v-for="resistanceIndex in getRandomResistanceEffect(data.id).values[2]"
                        :key="resistanceIndex"
                        :src="`https://tmktahu.github.io/WakfuAssets/statistics/${getRandomResistanceEffect(data.id)[`resistanceSlot${resistanceIndex}`].type}_coin.png`"
                        image-style="width: 16px"
                      />
                    </div>
                  </div>
                </div>
              </template>

              <template v-slot:content>
                <div v-if="items[data.id].item" class="item-card-tooltip">
                  <ItemStatList :item="items[data.id].item" :with-totals="withTotals" />

                  <div class="effect-header flex pt-2 px-1">
                    <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${items[data.id].item?.imageId}.png`" image-style="width: 40px" />
                    <div class="flex flex-column">
                      <div class="item-name mr-2">{{ $t(`items.${items[data.id].item.id}`) }}</div>
                      <div class="flex">
                        <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${items[data.id].item?.rarity}.png`" image-style="width: 12px;" />
                        <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${items[data.id].item?.type?.id}.png`" image-style="width: 18px;" />
                        <div v-if="LEVELABLE_ITEMS.includes(items[data.id].item?.type?.id)" class="white-space-nowrap">
                          Item Level: {{ items[data.id].item.id === 12237 ? '25' : '50' }}
                        </div>
                        <div v-else class="white-space-nowrap">Level: {{ items[data.id].item?.level }}</div>
                      </div>
                    </div>
                    <div class="flex-grow-1" />
                    <div class="flex">
                      <tippy placement="left">
                        <p-button icon="pi pi-question-circle" class="equip-button" @click="onGotoEncyclopedia(items[data.id].item)" />
                        <template v-slot:content> <div class="simple-tooltip">Open Encyclopedia Page</div></template>
                      </tippy>
                    </div>
                  </div>
                </div>
              </template>
            </MultiTooltip>
          </div>
          <div v-else class="flex align-items-center justify-content-center">
            <p-image :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${data.id}.png`" image-style="width: 60px" />
          </div>
        </div>
      </template>

      <template v-else>
        <p-button v-if="!items[data.id] || items[data.id].item === null" class="equipment-button" @click="onSearch(data.id)">
          <div class="flex align-items-center justify-content-center">
            <div class="hover-icon search"> <i class="pi pi-search" /> </div>
            <p-image
              v-if="data.id === ITEM_SLOT_DATA.SECOND_WEAPON.id && secondWeaponDisabled"
              class="equipment-image"
              :src="`https://tmktahu.github.io/WakfuAssets/items/${items[ITEM_SLOT_DATA.FIRST_WEAPON.id]?.item.imageId}.png`"
              image-style="width: 40px"
            />
            <p-image v-else class="equipment-image" :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${data.id}.png`" image-style="width: 60px" />
          </div>
        </p-button>

        <MultiTooltip v-else placement="bottom" duration="0">
          <template v-slot:trigger>
            <div class="equipment-button" :class="{ 'has-item': items[data.id].item !== null }">
              <div class="flex align-items-center justify-content-center w-full" style="position: relative">
                <div class="hover-icon edit" @click="onEdit(index, data.id, $event)"> <i class="pi pi-pencil" /> </div>
                <div class="hover-icon remove" @click="onRemove(data.id, $event)"> <i class="pi pi-trash" /> </div>

                <p-image class="equipment-image" :src="`https://tmktahu.github.io/WakfuAssets/items/${items[data.id].item.imageId}.png`" image-style="width: 40px" />

                <div v-if="getRandomMasteryEffect(data.id) !== null" class="random-stat-icons-wrapper">
                  <p-image
                    v-for="masteryIndex in getRandomMasteryEffect(data.id).values[2]"
                    :key="masteryIndex"
                    :src="`https://tmktahu.github.io/WakfuAssets/statistics/${getRandomMasteryEffect(data.id)[`masterySlot${masteryIndex}`].type}_coin.png`"
                    image-style="width: 16px"
                  />
                </div>

                <div v-if="getRandomResistanceEffect(data.id) !== null" class="random-stat-icons-wrapper">
                  <p-image
                    v-for="resistanceIndex in getRandomResistanceEffect(data.id).values[2]"
                    :key="resistanceIndex"
                    :src="`https://tmktahu.github.io/WakfuAssets/statistics/${getRandomResistanceEffect(data.id)[`resistanceSlot${resistanceIndex}`].type}_coin.png`"
                    image-style="width: 16px"
                  />
                </div>
              </div>
            </div>
          </template>

          <template v-slot:content>
            <div v-if="items[data.id].item" class="item-card-tooltip">
              <ItemStatList :item="items[data.id].item" :with-totals="withTotals" />

              <div class="effect-header flex gap-1 pt-2 px-1">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${items[data.id].item?.imageId}.png`" image-style="width: 40px" />
                <div class="flex flex-column">
                  <div class="item-name mr-2">{{ $t(`items.${items[data.id].item.id}`) }}</div>
                  <div class="flex">
                    <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${items[data.id].item?.rarity}.png`" image-style="width: 12px;" />
                    <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${items[data.id].item?.type?.id}.png`" image-style="width: 18px;" />
                    <div v-if="LEVELABLE_ITEMS.includes(items[data.id].item?.type?.id)">Item Level: {{ items[data.id].item.id === 12237 ? '25' : '50' }}</div>
                    <div v-else>Level: {{ items[data.id].item?.level }}</div>
                  </div>
                </div>
                <div class="flex-grow-1" />
                <div class="flex">
                  <tippy placement="left">
                    <p-button icon="pi pi-question-circle" class="equip-button" @click="onGotoEncyclopedia(items[data.id].item)" />
                    <template v-slot:content> <div class="simple-tooltip">Open Encyclopedia Page</div></template>
                  </tippy>
                </div>
              </div>
            </div>
          </template>
        </MultiTooltip>
      </template>
    </template>

    <EditEquipmentModal ref="editEquipmentModal" @change="onAssignmentsChange" />
  </div>
</template>

<script setup>
import { ref, watch, inject, computed, nextTick } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useI18n } from 'vue-i18n';
import { debounce } from 'lodash';

import { defaultRandomMasteries, defaultRandomResistances } from '@/models/useItems';
import { ITEM_SLOT_DATA, LEVELABLE_ITEMS } from '@/models/useConstants';
import { useEncyclopedia } from '@/models/useEncyclopedia';

import ItemStatList from '@/components/characterSheet/ItemStatList.vue';
import EditEquipmentModal from '@/components/characterSheet/EditEquipmentModal.vue';
import MultiTooltip from '@/components/MultiTooltip.vue';

const { t } = useI18n();

let props = defineProps({
  character: {
    type: Object,
    default: () => {},
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  withTotals: {
    type: Boolean,
    default: false,
  },
  withDefaultElemSelector: {
    type: Boolean,
    default: false,
  },
});

const confirm = useConfirm();

const { getItemEncyclopediaUrl } = useEncyclopedia();

const itemFilters = inject('itemFilters');
const editEquipmentModal = ref(null);
const secondWeaponDisabled = computed(() => {
  let firstWeaponItem = currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id].item;
  if (firstWeaponItem) {
    if (firstWeaponItem.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id)) {
      return true;
    } else {
      return false;
    }
  } else {
    // there is no first weapon equipped, make sure the second weapon is enabled
    return false;
  }
});

const masterData = inject('masterData');
const currentCharacter = ref(props.character);
const items = ref({});
watch(
  masterData,
  debounce(() => {
    nextTick(() => {
      currentCharacter.value = props.character;
      items.value = currentCharacter.value?.equipment;
    });
  }, 100),
  { immediate: true }
);

const onSearch = (slotKey) => {
  // here we filter our search by this slot type
  itemFilters.itemTypeFilters.forEach((filter) => {
    if (filter.validSlots.includes(ITEM_SLOT_DATA[slotKey])) {
      filter.checked = true;
    } else {
      filter.checked = false;
    }
  });
};

const onEdit = (index, slotKey, event) => {
  editEquipmentModal.value.open(slotKey, event.target.getBoundingClientRect().left - 200, event.target.getBoundingClientRect().bottom + 10);
};

const onEditDefaults = (dataContainer, type, event) => {
  editEquipmentModal.value.openForDefaults(dataContainer, type, event.target.getBoundingClientRect().left - 200, event.target.getBoundingClientRect().bottom + 10);
};

const onAssignmentsChange = ({ type, value }) => {
  if (type === 'mastery') {
    defaultRandomMasteries.value = value;
  } else {
    defaultRandomResistances.value = value;
  }
};

const onRemove = (slotKey, event) => {
  confirm.require({
    group: 'popup',
    target: event.currentTarget,
    message: t('confirms.areYouSure'),
    accept: () => {
      currentCharacter.value.equipment[slotKey].item = null;
    },
  });
};

const getRandomMasteryEffect = (slotKey) => {
  return (
    currentCharacter.value.equipment[slotKey].item?.equipEffects?.find((effect) => {
      return effect.id === 1068;
    }) || null
  );
};

const getRandomResistanceEffect = (slotKey) => {
  return (
    currentCharacter.value.equipment[slotKey].item?.equipEffects?.find((effect) => {
      return effect.id === 1069;
    }) || null
  );
};

const onGotoEncyclopedia = (item) => {
  let url = getItemEncyclopediaUrl(item);
  window.open(url, '_blank');
};
</script>

<style lang="scss" scoped>
.equipment-slots-wrapper {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem 0.5rem;
}

.equipment-button {
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 4px;

  min-width: 0px;
  width: 60px;
  height: 60px;
  padding: 0px;

  background: var(--background-50);

  cursor: pointer;

  &.has-item {
    .equipment-image {
      background-color: var(--primary-30);
      border-radius: 4px;
      padding: 5px;
      height: 50px;
    }
  }

  &.disabled {
    pointer-events: none;
    .equipment-image {
      background-color: var(--primary-30);
      border-radius: 4px;
      padding: 5px;
      height: 50px;
      opacity: 0.5;
    }
  }

  .hover-icon {
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    display: none;

    &.remove {
      left: 50%;
      background-color: rgba(red, 0.5);

      i {
        font-size: 20px;
      }
    }
    &.edit {
      right: 50%;
      background-color: rgba(yellow, 0.4);

      i {
        font-size: 20px;
      }
    }

    &.search {
      color: black;
      background-color: var(--highlight-50);
    }

    i {
      pointer-events: none;
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
  border-radius: 4px;

  background-color: var(--background-40);

  &.has-item {
    background-color: var(--primary-30);
    .equipment-image {
      border-radius: 4px;
      padding: 5px;
      height: 50px;
    }
  }
}

.random-stat-icons-wrapper {
  display: flex;
  position: absolute;
  bottom: -12px;
  background-color: var(--background-10);
  border-radius: 12px;
  padding: 2px 4px;
  border: 1px solid var(--highlight-50);
  .p-image {
    height: 16px;
  }
}

.equip-button {
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

.random-defaults-button {
  display: flex;
  justify-content: space-between;
  position: relative;
  border-radius: 4px;

  min-width: 0px;
  width: 60px;
  padding: 2px 0px;

  background: var(--background-50);

  cursor: pointer;

  .p-image {
    height: 24px;
  }

  &:hover {
    background-color: var(--secondary-40);
  }
}
</style>
