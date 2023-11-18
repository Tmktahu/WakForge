<template>
  <div class="flex equipment-slots-wrapper">
    <template v-for="(data, key, index) in ITEM_SLOT_DATA" :key="data.id">
      <template v-if="readOnly">
        <div class="equipment-display" :class="{ 'has-item': items[data.id] !== null }">
          <div v-if="items[data.id]?.imageId" class="flex align-items-center justify-content-center">
            <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${items[data.id]?.imageId}.png`" image-style="width: 40px" />
          </div>
          <div v-else class="flex align-items-center justify-content-center">
            <p-image :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${data.id}.png`" image-style="width: 60px" />
          </div>
        </div>
      </template>
      <template v-else>
        <p-button
          v-if="items[data.id] === null"
          class="equipment-button"
          :class="{ 'has-item': items[data.id] !== null, disabled: data.id === ITEM_SLOT_DATA.SECOND_WEAPON.id && secondWeaponDisabled }"
          @click="onSearch(data.id)"
        >
          <div class="flex align-items-center justify-content-center">
            <div class="hover-icon search"> <i class="pi pi-search" /> </div>
            <p-image
              v-if="data.id === ITEM_SLOT_DATA.SECOND_WEAPON.id && secondWeaponDisabled"
              class="equipment-image"
              :src="`https://tmktahu.github.io/WakfuAssets/items/${items[ITEM_SLOT_DATA.FIRST_WEAPON.id]?.imageId}.png`"
              image-style="width: 40px"
            />
            <p-image v-else class="equipment-image" :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${data.id}.png`" image-style="width: 60px" />
          </div>
        </p-button>
        <tippy v-else placement="bottom" interactive duration="0">
          <div class="equipment-button" :class="{ 'has-item': items[data.id] !== null }">
            <div class="flex align-items-center justify-content-center w-full" style="position: relative">
              <div class="hover-icon edit" @click="onEdit(index, data.id, $event)"> <i class="pi pi-pencil" /> </div>
              <div class="hover-icon remove" @click="onRemove(data.id, $event)"> <i class="pi pi-trash" /> </div>
              <p-image class="equipment-image" :src="`https://tmktahu.github.io/WakfuAssets/items/${items[data.id]?.imageId}.png`" image-style="width: 40px" />

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
                  :src="`https://tmktahu.github.io/WakfuAssets/statistics/${
                    getRandomResistanceEffect(data.id)[`resistanceSlot${resistanceIndex}`].type
                  }_coin.png`"
                  image-style="width: 16px"
                />
              </div>
            </div>
          </div>

          <template v-slot:content>
            <div v-if="items[data.id]" class="item-card-tooltip">
              <div class="effect-header flex pt-2 px-1">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${items[data.id]?.imageId}.png`" image-style="width: 40px" />
                <div class="flex flex-column">
                  <div class="item-name mr-2">{{ $t(`items.${items[data.id].id}`) }}</div>
                  <div class="flex">
                    <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${items[data.id]?.rarity}.png`" image-style="width: 12px;" />
                    <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${items[data.id]?.type?.id}.png`" image-style="width: 18px;" />
                    <div v-if="LEVELABLE_ITEMS.includes(items[data.id]?.type?.id)">Item Level: 50</div>
                    <div v-else>Level: {{ items[data.id]?.level }}</div>
                  </div>
                </div>
                <div class="flex-grow-1" />
                <div class="flex">
                  <tippy placement="left">
                    <p-button icon="pi pi-question-circle" class="equip-button" @click="onGotoEncyclopedia(items[data.id])" />
                    <template v-slot:content> <div class="simple-tooltip">Open Encyclopedia Page</div></template>
                  </tippy>
                </div>
              </div>
              <ItemStatList :item="items[data.id]" />
            </div>
          </template>
        </tippy>

        <EditEquipmentModal ref="editEquipmentModal" />
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, inject, computed, nextTick } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

import { ITEM_SLOT_DATA, LEVELABLE_ITEMS } from '@/models/useConstants';
import { useEncyclopedia } from '@/models/useEncyclopedia';

import ItemStatList from '@/components/characterSheet/ItemStatList.vue';
import EditEquipmentModal from '@/components/characterSheet/EditEquipmentModal.vue';

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

const confirm = useConfirm();

const { getItemEncyclopediaUrl } = useEncyclopedia();

const itemFilters = inject('itemFilters');
const editEquipmentModal = ref(null);
const secondWeaponDisabled = computed(() => {
  let firstWeaponItem = currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id];
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
  () => {
    nextTick(() => {
      currentCharacter.value = props.character;
      items.value = currentCharacter.value?.equipment;
    });
  },
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
  editEquipmentModal.value[index].open(slotKey, event.target.getBoundingClientRect().left - 200, event.target.getBoundingClientRect().bottom + 10);
};

const onRemove = (slotKey, event) => {
  confirm.require({
    group: 'popup',
    target: event.currentTarget,
    message: 'Are you sure?',
    accept: () => {
      currentCharacter.value.equipment[slotKey] = null;
    },
  });
};

const getRandomMasteryEffect = (slotKey) => {
  return (
    currentCharacter.value.equipment[slotKey]?.equipEffects.find((effect) => {
      return effect.id === 1068;
    }) || null
  );
};

const getRandomResistanceEffect = (slotKey) => {
  return (
    currentCharacter.value.equipment[slotKey]?.equipEffects.find((effect) => {
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
</style>
