<template>
  <div class="flex equipment-slots-wrapper pr-3">
    <template v-for="(data, key, index) in ITEM_SLOT_DATA" :key="data.id">
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
          :class="{ 'has-item': currentCharacter.equipment[data.id] !== null, disabled: data.id === ITEM_SLOT_DATA.SECOND_WEAPON.id && secondWeaponDisabled }"
          @click="onSearch(data.id)"
        >
          <div class="flex align-items-center justify-content-center">
            <div class="hover-icon search"> <i class="pi pi-search" /> </div>
            <p-image
              v-if="data.id === ITEM_SLOT_DATA.SECOND_WEAPON.id && secondWeaponDisabled"
              class="equipment-image"
              :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id]?.imageId}.png`"
              image-style="width: 40px"
            />
            <p-image v-else :src="`https://tmktahu.github.io/WakfuAssets/equipmentDefaults/${data.id}.png`" image-style="width: 60px" />
          </div>
        </p-button>
        <tippy v-else placement="bottom" interactive>
          <div class="equipment-button" :class="{ 'has-item': currentCharacter.equipment[data.id] !== null }">
            <div class="flex align-items-center justify-content-center w-full" style="position: relative">
              <div class="hover-icon edit" @click="onEdit(index, data.id, $event)"> <i class="pi pi-pencil" /> </div>
              <div class="hover-icon remove" @click="onRemove(data.id, $event)"> <i class="pi pi-trash" /> </div>
              <p-image
                class="equipment-image"
                :src="`https://tmktahu.github.io/WakfuAssets/items/${currentCharacter.equipment[data.id]?.imageId}.png`"
                image-style="width: 40px"
              />

              <div v-if="getRandomMasteryEffect(data.id, 'masterySlot1') !== null" class="random-stat-icons-wrapper">
                <p-image
                  v-if="getRandomMasteryEffect(data.id, 'masterySlot1') !== null"
                  :src="`https://tmktahu.github.io/WakfuAssets/statistics/${getRandomMasteryEffect(data.id, 'masterySlot1').type}_coin.png`"
                  image-style="width: 16px"
                />
                <p-image
                  v-if="getRandomMasteryEffect(data.id, 'masterySlot2') !== null"
                  :src="`https://tmktahu.github.io/WakfuAssets/statistics/${getRandomMasteryEffect(data.id, 'masterySlot2').type}_coin.png`"
                  image-style="width: 16px"
                />
                <p-image
                  v-if="getRandomMasteryEffect(data.id, 'masterySlot3') !== null"
                  :src="`https://tmktahu.github.io/WakfuAssets/statistics/${getRandomMasteryEffect(data.id, 'masterySlot3').type}_coin.png`"
                  image-style="width: 16px"
                />
              </div>

              <div v-if="getRandomResistanceEffect(data.id, 'resistanceSlot1') !== null" class="random-stat-icons-wrapper">
                <p-image
                  v-if="getRandomResistanceEffect(data.id, 'resistanceSlot1') !== null"
                  :src="`https://tmktahu.github.io/WakfuAssets/statistics/${getRandomResistanceEffect(data.id, 'resistanceSlot1').type}_coin.png`"
                  image-style="width: 16px"
                />
                <p-image
                  v-if="getRandomResistanceEffect(data.id, 'resistanceSlot2') !== null"
                  :src="`https://tmktahu.github.io/WakfuAssets/statistics/${getRandomResistanceEffect(data.id, 'resistanceSlot2').type}_coin.png`"
                  image-style="width: 16px"
                />
                <p-image
                  v-if="getRandomResistanceEffect(data.id, 'resistanceSlot3') !== null"
                  :src="`https://tmktahu.github.io/WakfuAssets/statistics/${getRandomResistanceEffect(data.id, 'resistanceSlot3').type}_coin.png`"
                  image-style="width: 16px"
                />
              </div>
            </div>
          </div>
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

        <EditEquipmentModal ref="editEquipmentModal" />
      </template>
    </template>

    <p-confirmPopup />
  </div>
</template>

<script setup>
import { ref, watch, inject, computed } from 'vue';
import { useConfirm } from 'primevue/useconfirm';

import { ITEM_SLOT_DATA, LEVELABLE_ITEMS } from '@/models/useConstants';

import ItemStatList from '@/components/ItemStatList.vue';
import EditEquipmentModal from '@/components/EditEquipmentModal.vue';

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
watch(masterData, () => {
  currentCharacter.value = props.character;
});

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
    target: event.currentTarget,
    message: 'Are you sure?',
    accept: () => {
      currentCharacter.value.equipment[slotKey] = null;
    },
  });
};

const getRandomMasteryEffect = (slotKey, masteryKey) => {
  return (
    currentCharacter.value.equipment[slotKey].equipEffects.find((effect) => {
      return effect.id === 1068;
    })?.[masteryKey] || null
  );
};

const getRandomResistanceEffect = (slotKey, masteryKey) => {
  return (
    currentCharacter.value.equipment[slotKey].equipEffects.find((effect) => {
      return effect.id === 1069;
    })?.[masteryKey] || null
  );
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

  cursor: pointer;

  &.has-item {
    .equipment-image {
      background-color: var(--bonta-blue-20);
      border-radius: 4px;
      padding: 5px;
      height: 50px;
    }
  }

  &.disabled {
    pointer-events: none;
    .equipment-image {
      background-color: var(--bonta-blue-20);
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
    color: white;

    &.remove {
      left: 50%;
      background-color: rgba(red, 0.3);

      i {
        font-size: 20px;
      }
    }
    &.edit {
      right: 50%;
      background-color: rgba(yellow, 0.3);

      i {
        font-size: 20px;
      }
    }

    &.search {
      background-color: rgba(var(--bonta-blue-50), 0.3);
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

  background: var(--bonta-blue-80);

  &.has-item {
    .equipment-image {
      background-color: var(--bonta-blue-20);
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
  background-color: var(--bonta-blue);
  border-radius: 12px;
  padding: 2px 4px;
  border: 1px solid var(--bonta-blue-80);
  .p-image {
    height: 16px;
  }
}
</style>
