<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="w-full h-full">
    <div>
      <tippy placement="left">
        <i class="mdi mdi-information-outline" />
        <template v-slot:content>
          <div class="simple-tooltip">{{ $t('characterSheet.spellsAndPassivesContent.activesNote') }}</div>
        </template>
      </tippy>
      {{ $t('characterSheet.spellsAndPassivesContent.activeSpells') }}
    </div>
    <div class="flex mt-2">
      <div class="flex flex-wrap gap-1 mr-3" style="max-width: 260px">
        <template v-for="index in 12" :key="index">
          <div v-if="currentCharacter.spells['activeSlot' + index] !== null" class="spell-button disabled" @click="onRemoveSpell(spell)">
            <div class="disabled-mask"> {{}} </div>
            <div class="hover-icon remove"> <i class="pi pi-trash" /> </div>
            <p-image
              :src="`https://tmktahu.github.io/WakfuAssets/spells/${currentCharacter.spells['activeSlot' + index].iconId}.png`"
              image-style="width: 40px"
            />
          </div>

          <div v-else class="spell-button disabled">
            <p-image :src="`https://tmktahu.github.io/WakfuAssets/spells/empty_slot.png`" image-style="width: 40px" />
            <div class="disabled-mask"> {{}} </div>
          </div>
        </template>
      </div>

      <!-- <div class="flex flex-wrap gap-1">
        <template v-for="spell in activeSpells" :key="spell.id">
          <tippy>
            <div class="spell-button" @click="onEquipSpell(spell)">
              <div class="hover-icon add"> <i class="mdi mdi-plus-thick" /> </div>
              <p-image :src="`https://tmktahu.github.io/WakfuAssets/spells/${spell.id}.png`" image-style="width: 40px" />
            </div>

            <template v-slot:content> <div>bleh</div> </template>
          </tippy>
        </template>
      </div> -->
    </div>

    <div class="mt-3">
      <tippy placement="left">
        <i class="mdi mdi-information-outline" />
        <template v-slot:content>
          <div class="simple-tooltip">{{ $t('characterSheet.spellsAndPassivesContent.passivesNote') }}</div>
        </template>
      </tippy>
      {{ $t('characterSheet.spellsAndPassivesContent.passives') }}
    </div>
    <div class="flex mt-2">
      <div class="flex gap-1 mr-3" style="max-width: 260px">
        <template v-for="index in 6" :key="index">
          <div v-if="currentCharacter.spells['passiveSlot' + index] !== null">
            <tippy duration="0">
              <div class="spell-button" @click="onRemoveSpell('passiveSlot' + index)">
                <div class="hover-icon remove"> <i class="pi pi-trash" /> </div>
                <p-image
                  :src="`https://tmktahu.github.io/WakfuAssets/spells/${currentCharacter.spells['passiveSlot' + index].iconId}.png`"
                  image-style="width: 40px"
                />
              </div>
              <template v-slot:content>
                <div class="spell-tooltip">
                  <div class="spell-name px-2 py-1">
                    {{ currentCharacter.spells['passiveSlot' + index].name }} (Level {{ getSpellLevel(currentCharacter.spells['passiveSlot' + index]) }})
                  </div>
                  <div class="spell-description px-2 py-1">{{ currentCharacter.spells['passiveSlot' + index].description }}</div>
                  <div class="spell-details" v-html="getSpellHtml(currentCharacter.spells['passiveSlot' + index])" />
                </div>
              </template>
            </tippy>
          </div>

          <div v-else class="spell-slot" :class="{ disabled: !isPassiveSpellSlotUnlocked(index) }">
            <p-image :src="`https://tmktahu.github.io/WakfuAssets/spells/empty_slot.png`" image-style="width: 40px" />
            <div v-if="!isPassiveSpellSlotUnlocked(index)" class="spell-unlock-number">{{ PASSIVE_SPELL_SLOT_UNLOCK_LEVELS[index - 1] }}</div>
          </div>
        </template>
      </div>

      <div class="flex flex-wrap gap-1">
        <template v-for="spell in passiveClassSpells" :key="spell.id">
          <tippy duration="0">
            <div class="spell-button" :class="{ disabled: hasSpellEquipped(spell) || !isUnlocked(spell) }" @click="onEquipSpell(spell)">
              <div class="hover-icon add"> <i class="mdi mdi-plus-thick" /> </div>
              <div class="disabled-mask" />
              <p-image :src="`https://tmktahu.github.io/WakfuAssets/spells/${spell.iconId}.png`" image-style="width: 40px" />
              <div v-if="!isUnlocked(spell)" class="spell-unlock-number">{{ PASSIVE_SPELL_UNLOCK_MAP[spell.id] }}</div>
            </div>

            <template v-slot:content>
              <div class="spell-tooltip">
                <div class="spell-name px-2 py-1">{{ spell.name }} (Level {{ getSpellLevel(spell) }})</div>
                <div class="spell-description px-2 py-1">{{ spell.description }}</div>
                <div class="spell-details" v-html="getSpellHtml(spell)" />
              </div>
            </template>
          </tippy>
        </template>
      </div>

      <div class="flex flex-wrap gap-1">
        <template v-for="spell in passiveSharedSpells" :key="spell.id">
          <tippy duration="0">
            <div class="spell-button" :class="{ disabled: hasSpellEquipped(spell) || !isUnlocked(spell) }" @click="onEquipSpell(spell)">
              <div class="hover-icon add"> <i class="mdi mdi-plus-thick" /> </div>
              <div class="disabled-mask" />
              <p-image :src="`https://tmktahu.github.io/WakfuAssets/spells/${spell.iconId}.png`" image-style="width: 40px" />
              <div v-if="!isUnlocked(spell)" class="spell-unlock-number">{{ PASSIVE_SPELL_UNLOCK_MAP[spell.id] }}</div>
            </div>

            <template v-slot:content>
              <div class="spell-tooltip">
                <div class="spell-name px-2 py-1">{{ spell.name }} (Level {{ getSpellLevel(spell) }})</div>
                <div class="spell-description px-2 py-1">{{ spell.description }}</div>
                <div class="spell-details" v-html="getSpellHtml(spell)" />
              </div>
            </template>
          </tippy>
        </template>
      </div>
    </div>

    <!-- <template v-for="key in Object.keys(currentCharacter.activeSpells)" :key="key">
        <div class="spell-selector-wrapper">
          <p-dropdown v-model="currentCharacter.activeSpells[key].assignedSpell" class="spell-dropdown" :options="spellOptions" @change="onChange($event, key)">
            <template v-slot:value="slotProps">
              <div v-if="slotProps.value" class="flex align-items-center">
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/spells/${slotProps.value.iconId}.png`" image-style="width: 40px" />
              </div>
              <span v-else> ??? </span>
            </template>

            <template v-slot:option="slotProps">
              <div class="flex align-items-center">
                <div class="mr-2" style="height: 40px">
                  <p-image :src="`https://tmktahu.github.io/WakfuAssets/spells/${slotProps.option.iconId}.png`" image-style="width: 40px" />
                </div>
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </p-dropdown>
        </div>
      </template> -->
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';

import { useSpells, SPELL_CATEGORIES } from '@/models/spells/useSpells';
import { PASSIVE_SPELL_UNLOCK_MAP, PASSIVE_SPELL_SLOT_UNLOCK_LEVELS } from '@/models/useConstants';

const currentCharacter = inject('currentCharacter');

const { getClassPassiveSpells, getSpellHtml, getSpellLevel } = useSpells(currentCharacter);
const passiveClassSpells = computed(() => {
  let spells = getClassPassiveSpells(currentCharacter.value.class);

  let sortedSpells = spells.sort((spell1, spell2) => {
    let requiredLevel1 = PASSIVE_SPELL_UNLOCK_MAP[spell1.id];
    let requiredLevel2 = PASSIVE_SPELL_UNLOCK_MAP[spell2.id];

    return requiredLevel1 - requiredLevel2;
  });
  return sortedSpells;
});

const passiveSharedSpells = computed(() => {
  let spells = getClassPassiveSpells('all');

  let sortedSpells = spells.sort((spell1, spell2) => {
    let requiredLevel1 = PASSIVE_SPELL_UNLOCK_MAP[spell1.id];
    let requiredLevel2 = PASSIVE_SPELL_UNLOCK_MAP[spell2.id];

    return requiredLevel1 - requiredLevel2;
  });
  return sortedSpells;
});

const onEquipSpell = (spell) => {
  if (spell.category === SPELL_CATEGORIES.passive) {
    Object.keys(currentCharacter.value.spells).forEach((slotKey) => {
      if (slotKey.includes(SPELL_CATEGORIES.passive)) {
        if (currentCharacter.value.spells[slotKey]?.id === spell.id) {
          currentCharacter.value.spells[slotKey] = null;
        }
      }
    });

    Object.keys(currentCharacter.value.spells).some((slotKey) => {
      if (slotKey.includes(SPELL_CATEGORIES.passive)) {
        if (isPassiveSpellSlotUnlocked(parseInt(slotKey.replace('passiveSlot', '')))) {
          if (currentCharacter.value.spells[slotKey] === null) {
            currentCharacter.value.spells[slotKey] = spell;
            return true;
          }
        }
      }
    });
  }
};

const onRemoveSpell = (slotKey) => {
  currentCharacter.value.spells[slotKey] = null;
};

const hasSpellEquipped = (spell) => {
  let isEquipped = false;
  Object.keys(currentCharacter.value.spells).forEach((slotKey) => {
    if (currentCharacter.value.spells[slotKey]?.id === spell.id) {
      isEquipped = true;
    }
  });

  return isEquipped;
};

const isUnlocked = (spell) => {
  let requiredLevel = PASSIVE_SPELL_UNLOCK_MAP[spell.id];
  return currentCharacter.value.level >= requiredLevel;
};

const isPassiveSpellSlotUnlocked = (slotNumber) => {
  let requiredLevel = PASSIVE_SPELL_SLOT_UNLOCK_LEVELS[slotNumber - 1];
  return currentCharacter.value.level >= requiredLevel;
};
</script>

<style lang="scss" scoped>
.spells-container {
  display: flex;
  gap: 0.25rem;
  max-width: 500px;
  flex-wrap: wrap;
}

.spell-button {
  height: 40px;
  position: relative;
  cursor: pointer;

  &.disabled {
    pointer-events: none;

    .disabled-mask {
      display: flex;
    }
  }
  .disabled-mask {
    display: none;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    background-color: rgba(black, 0.6);
  }

  .hover-icon {
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    display: none;

    &.remove {
      background-color: rgba(red, 0.3);

      i {
        font-size: 20px;
      }
    }

    &.add {
      background-color: rgba(black, 0.3);

      i {
        font-size: 40px;
      }
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

  .spell-unlock-number {
    position: absolute;
    inset: 0;
    color: var(--primary-90);
    text-shadow: 0px -1px 6px rgba(0, 0, 0, 1);
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.spell-slot {
  position: relative;
  height: fit-content;
  &.disabled {
    .p-image {
      opacity: 0.3;
    }
  }

  .spell-unlock-number {
    position: absolute;
    inset: 0;
    color: var(--primary-90);
    text-shadow: 0px -1px 6px rgba(0, 0, 0, 1);
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
