<template>
  <p-dialog :id="uuid" v-model:visible="visible">
    <template v-slot:header> <div class="drag-bar" /> </template>

    <div class="edit-item-modal-content flex flex-column pb-2">
      <div class="header-area flex px-3 pt-2 pb-1">
        <p-image :src="`https://tmktahu.github.io/WakfuAssets/items/${item.imageId}.png`" image-style="width: 40px" />
        <div class="flex flex-column ml-1">
          <div class="item-name mr-2 truncate" style="max-width: 15ch">{{ item.name }}</div>
          <div class="flex">
            <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/rarities/${item.rarity}.png`" image-style="width: 12px;" />
            <p-image class="mr-1" :src="`https://tmktahu.github.io/WakfuAssets/itemTypes/${item.type.id}.png`" image-style="width: 18px;" />
            <div v-if="LEVELABLE_ITEMS.includes(item.type.id)">Item Level: 50</div>
            <div v-else>Level: {{ item.level }}</div>
          </div>
        </div>
        <div class="flex-grow-1" />

        <p-button class="close-button px-1 py-1" icon="mdi mdi-close-thick" @click="close" />
      </div>

      <div v-if="randomMasteryEffect" class="random-mastery-section flex flex-column px-3">
        <div class="text-center w-full text-lg mb-2 pt-2">+{{ randomMasteryEffect.values[0] }} Mastery Assignment</div>
        <div class="flex justify-content-center gap-2 px-3">
          <template v-for="index in randomMasteryEffect.values[2]" :key="index">
            <p-dropdown
              v-model="inputModels['masterySlot' + index]"
              class="mastery-dropdown"
              option-label="label"
              :options="elementOptions"
              @change="onMasteryStatChange($event, 'masterySlot' + index)"
            >
              <template v-slot:value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <p-image
                    :src="`https://tmktahu.github.io/WakfuAssets/statistics/${slotProps.value.icon}.png`"
                    style="height: 40px"
                    image-style="height: 40px; margin-top: -1px"
                  />
                </div>
                <span v-else>
                  <p-image
                    :src="`https://tmktahu.github.io/WakfuAssets/statistics/empty_coin.png`"
                    style="height: 36px"
                    image-style="height: 36px; margin-top: 1px; margin-left: 2px"
                  />
                </span>
              </template>

              <template v-slot:option="slotProps">
                <div class="flex align-items-center py-1 px-2">
                  <div class="capitalize">{{ slotProps.option.label }}</div>
                </div>
              </template>
            </p-dropdown>
          </template>
        </div>
      </div>

      <div v-if="randomResistanceEffect" class="random-resistance-section flex flex-column px-3">
        <div class="text-center w-full text-lg mb-2 pt-2">+{{ randomResistanceEffect.values[0] }} Resistance Assignment</div>
        <div class="flex justify-content-center gap-2 px-3">
          <template v-for="index in randomResistanceEffect.values[2]" :key="index">
            <p-dropdown
              v-model="inputModels['resistanceSlot' + index]"
              class="mastery-dropdown"
              :options="elementOptions"
              option-label="label"
              @change="onResistanceStatChange"
            >
              <template v-slot:value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <p-image
                    :src="`https://tmktahu.github.io/WakfuAssets/statistics/${slotProps.value.icon}.png`"
                    style="height: 40px"
                    image-style="height: 40px; margin-top: -1px"
                  />
                </div>
                <span v-else>
                  <p-image
                    :src="`https://tmktahu.github.io/WakfuAssets/statistics/empty_coin.png`"
                    style="height: 36px"
                    image-style="height: 36px; margin-top: 1px; margin-left: 2px"
                  />
                </span>
              </template>

              <template v-slot:option="slotProps">
                <div class="flex align-items-center py-1 px-2">
                  <div class="capitalize">{{ slotProps.option.label }}</div>
                </div>
              </template>
            </p-dropdown>
          </template>
        </div>
      </div>

      <div class="flex justify-content-center mt-2">
        <p-button class="py-2" label="Apply to all Items" @click="onApplyToAll" />
      </div>
    </div>
  </p-dialog>
</template>

<script setup>
import { ref, nextTick, inject, computed, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { EventBus, Events } from '@/eventBus';

import { LEVELABLE_ITEMS } from '@/models/useConstants';

let uuid = uuidv4();
const currentCharacter = inject('currentCharacter');

const visible = ref(false);
const item = ref(null);

const inputModels = ref({});
const elementOptions = [
  { value: 'empty', label: 'None', icon: 'empty_coin' },
  { value: 'water', label: 'Water', icon: 'water_coin' },
  { value: 'earth', label: 'Earth', icon: 'earth_coin' },
  { value: 'air', label: 'Air', icon: 'air_coin' },
  { value: 'fire', label: 'Fire', icon: 'fire_coin' },
];

const randomMasteryEffect = computed(() => {
  return item.value?.equipEffects?.find((effect) => {
    return effect.id === 1068;
  });
});

const randomResistanceEffect = computed(() => {
  return item.value?.equipEffects?.find((effect) => {
    return effect.id === 1069;
  });
});

EventBus.on(Events.UPDATE_RAND_ELEM_SELECTORS, () => {
  updateMasterySelectors();
  updateResistanceSelectors();
});

const updateMasterySelectors = () => {
  if (visible.value) {
    if (randomMasteryEffect.value !== undefined) {
      inputModels.value['masterySlot1'] = elementOptions.find((option) => {
        return option.value === randomMasteryEffect.value['masterySlot1']?.type;
      });
      inputModels.value['masterySlot2'] = elementOptions.find((option) => {
        return option.value === randomMasteryEffect.value['masterySlot2']?.type;
      });
      inputModels.value['masterySlot3'] = elementOptions.find((option) => {
        return option.value === randomMasteryEffect.value['masterySlot3']?.type;
      });
    }
  }
};

const updateResistanceSelectors = () => {
  if (visible.value) {
    if (randomResistanceEffect.value !== undefined) {
      inputModels.value['resistanceSlot1'] = elementOptions.find((option) => {
        return option.value === randomResistanceEffect.value?.['resistanceSlot1']?.type;
      });
      inputModels.value['resistanceSlot2'] = elementOptions.find((option) => {
        return option.value === randomResistanceEffect.value?.['resistanceSlot2']?.type;
      });
      inputModels.value['resistanceSlot3'] = elementOptions.find((option) => {
        return option.value === randomResistanceEffect.value?.['resistanceSlot3']?.type;
      });
    }
  }
};

const onMasteryStatChange = (event, changedSlotKey) => {
  let effect = item.value?.equipEffects?.find((effect) => {
    return effect.id === 1068;
  });

  effect[changedSlotKey] = {
    type: inputModels.value[changedSlotKey].value,
    value: randomMasteryEffect.value.values[0],
  };

  Object.keys(effect).forEach((key) => {
    if (key !== changedSlotKey) {
      if (effect[key]?.type === inputModels.value[changedSlotKey].value) {
        effect[key] = {
          type: elementOptions[0].value,
          value: [],
        };

        inputModels.value[key] = elementOptions[0];
      }
    }
  });
};

const onResistanceStatChange = () => {
  Object.keys(inputModels.value).forEach((key) => {
    if (inputModels.value[key]) {
      let effect = item.value?.equipEffects?.find((effect) => {
        return effect.id === 1069;
      });

      effect[key] = {
        type: inputModels.value[key].value,
        value: randomResistanceEffect.value.values[0],
      };
    }
  });
};

const onApplyToAll = () => {
  Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
    if (currentCharacter.value.equipment[slotKey] !== null) {
      currentCharacter.value.equipment[slotKey].equipEffects.forEach((equipEffect) => {
        if (equipEffect.id === 1068 && randomMasteryEffect.value) {
          // mastery handling

          if (equipEffect.values[2] >= 1) {
            equipEffect.masterySlot1 = {
              type: inputModels.value.masterySlot1?.value || 'empty',
              value: equipEffect.values[0],
            };
          }

          if (equipEffect.values[2] >= 2) {
            equipEffect.masterySlot2 = {
              type: inputModels.value.masterySlot2?.value || 'empty',
              value: equipEffect.values[0],
            };
          }

          if (equipEffect.values[2] >= 3) {
            equipEffect.masterySlot3 = {
              type: inputModels.value.masterySlot3?.value || 'empty',
              value: equipEffect.values[0],
            };
          }
        }

        if (equipEffect.id === 1069 && randomResistanceEffect.value) {
          // resistance handling
          if (equipEffect.values[2] >= 1) {
            equipEffect.resistanceSlot1 = {
              type: inputModels.value.resistanceSlot1?.value || 'empty',
              value: equipEffect.values[0],
            };
          }

          if (equipEffect.values[2] >= 2) {
            equipEffect.resistanceSlot2 = {
              type: inputModels.value.resistanceSlot2?.value || 'empty',
              value: equipEffect.values[0],
            };
          }

          if (equipEffect.values[2] >= 3) {
            equipEffect.resistanceSlot3 = {
              type: inputModels.value.resistanceSlot3?.value || 'empty',
              value: equipEffect.values[0],
            };
          }
        }
      });
    }
  });

  EventBus.emit(Events.UPDATE_RAND_ELEM_SELECTORS);
};

const open = (slotKey, left, top) => {
  item.value = currentCharacter.value.equipment[slotKey];
  visible.value = true;

  nextTick(() => {
    let dialogElement = document.getElementById(uuid);

    dialogElement.style.position = 'fixed';
    dialogElement.style.left = `${left}px`;
    dialogElement.style.top = `${top}px`;

    updateMasterySelectors();
    updateResistanceSelectors();
  });
};

const close = () => {
  visible.value = false;
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.edit-item-modal-content {
  background-color: var(--background-10);
  border: 1px solid var(--highlight-50);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.header-area {
  background-color: var(--primary-30);
}

.close-button {
  width: 24px;
  height: 24px;
}

:deep(.mastery-dropdown) {
  min-height: 40px;
  max-height: 40px;

  .p-dropdown-label {
    padding: 0;
    min-height: 40px;
    max-height: 40px;
  }

  .p-dropdown-trigger {
    width: 32px;
  }
}

.random-mastery-section {
  border-top: 1px solid var(--primary-50);
}
</style>
