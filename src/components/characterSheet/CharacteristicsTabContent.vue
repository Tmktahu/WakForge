<template>
  <div class="flex flex-column h-full">
    <div class="characteristic-panels flex pb-3">
      <div class="flex flex-column flex-grow-1 mr-1">
        <div class="category-wrapper flex flex-column" :class="{ error: calcRemainingPoints('intelligence') < 0 }">
          <div class="characteristics-category-header px-2 py-2">
            <span>{{ $t('characterSheet.characteristicsContent.intelligence') }}</span>
            <div class="flex-grow-1" />
            <span>
              {{ calcRemainingPoints('intelligence') }}/{{ currentCharacter?.characteristics?.limits?.intelligence }}
              {{ $t('characterSheet.characteristicsContent.points') }}
            </span>
          </div>

          <div class="flex flex-column px-2 py-1">
            <CharacteristicInput
              v-model="percentHealthPoints"
              :label="$t('constants.percentHealthPoints')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/1.png"
              :remaining-points="calcRemainingPoints('intelligence')"
              :update-function="updateCharacteristics"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="intelligenceElementalResistance"
              :label="$t('constants.elementalResistance')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/116.png"
              :remaining-points="calcRemainingPoints('intelligence')"
              :update-function="updateCharacteristics"
              :max-override="10"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="barrier"
              :label="$t('characterSheet.characteristicsContent.barrier')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/17.png"
              :remaining-points="calcRemainingPoints('intelligence')"
              :update-function="updateCharacteristics"
              :max-override="10"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="percentHealsReceived"
              :label="$t('constants.percentHealsReceived')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/50.png"
              :remaining-points="calcRemainingPoints('intelligence')"
              :update-function="updateCharacteristics"
              :max-override="5"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="percentArmorHeathPoints"
              :label="$t('characterSheet.characteristicsContent.percentArmorHealthPoints')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/136.png"
              :remaining-points="calcRemainingPoints('intelligence')"
              :update-function="updateCharacteristics"
              :max-override="10"
              :step="stepValue"
            />
          </div>
        </div>

        <div class="category-wrapper flex flex-column mt-2" :class="{ error: calcRemainingPoints('strength') < 0 }">
          <div class="characteristics-category-header px-2 py-2">
            <span>{{ $t('characterSheet.characteristicsContent.strength') }}</span>
            <div class="flex-grow-1" />
            <span>{{ calcRemainingPoints('strength') }}/{{ currentCharacter?.characteristics?.limits?.strength }} {{ $t('characterSheet.characteristicsContent.points') }}</span>
          </div>

          <div class="flex flex-column px-2 py-1">
            <CharacteristicInput
              v-model="elementalMastery"
              :label="$t('characterSheet.characteristicsContent.elementalMastery')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/223.png"
              :remaining-points="calcRemainingPoints('strength')"
              :update-function="updateCharacteristics"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="meleeMastery"
              :label="$t('constants.meleeMastery')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/226.png"
              :remaining-points="calcRemainingPoints('strength')"
              :update-function="updateCharacteristics"
              :max-override="40"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="distanceMastery"
              :label="$t('constants.distanceMastery')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/230.png"
              :remaining-points="calcRemainingPoints('strength')"
              :update-function="updateCharacteristics"
              :max-override="40"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="healthPoints"
              :label="$t('constants.healthPoints')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/231.png"
              :remaining-points="calcRemainingPoints('strength')"
              :update-function="updateCharacteristics"
              :step="stepValue"
            />
          </div>
        </div>

        <div class="category-wrapper flex flex-column mt-2" :class="{ error: calcRemainingPoints('agility') < 0 }">
          <div class="characteristics-category-header px-2 py-2">
            <span>{{ $t('characterSheet.characteristicsContent.agility') }}</span>
            <div class="flex-grow-1" />
            <span>{{ calcRemainingPoints('agility') }}/{{ currentCharacter?.characteristics?.limits?.agility }} {{ $t('characterSheet.characteristicsContent.points') }}</span>
          </div>

          <div class="flex flex-column px-2 py-1">
            <CharacteristicInput
              v-model="lock"
              :label="$t('constants.lock')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/4.png"
              :remaining-points="calcRemainingPoints('agility')"
              :update-function="updateCharacteristics"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="dodge"
              :label="$t('constants.dodge')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/3.png"
              :remaining-points="calcRemainingPoints('agility')"
              :update-function="updateCharacteristics"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="initiative"
              :label="$t('constants.initiative')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/2.png"
              :remaining-points="calcRemainingPoints('agility')"
              :update-function="updateCharacteristics"
              :max-override="20"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="lockAndDodge"
              :label="$t('characterSheet.characteristicsContent.lockAndDodge')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/121.png"
              :remaining-points="calcRemainingPoints('agility')"
              :update-function="updateCharacteristics"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="forceOfWill"
              :label="$t('constants.forceOfWill')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/233.png"
              :remaining-points="calcRemainingPoints('agility')"
              :update-function="updateCharacteristics"
              :max-override="20"
              :step="stepValue"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-column flex-grow-1 ml-1">
        <div class="category-wrapper flex flex-column flex-grow-1" :class="{ error: calcRemainingPoints('fortune') < 0 }">
          <div class="characteristics-category-header px-2 py-2">
            <span>{{ $t('characterSheet.characteristicsContent.fortune') }}</span>
            <div class="flex-grow-1" />
            <span>{{ calcRemainingPoints('fortune') }}/{{ currentCharacter?.characteristics?.limits?.fortune }} {{ $t('characterSheet.characteristicsContent.points') }}</span>
          </div>

          <div class="flex flex-column px-2 py-1">
            <CharacteristicInput
              v-model="percentCriticalHit"
              :label="$t('constants.percentCriticalHit')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/109.png"
              :remaining-points="calcRemainingPoints('fortune')"
              :update-function="updateCharacteristics"
              :max-override="20"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="percentBlock"
              :label="$t('constants.percentBlock')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/49.png"
              :remaining-points="calcRemainingPoints('fortune')"
              :update-function="updateCharacteristics"
              :max-override="20"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="criticalMastery"
              :label="$t('constants.criticalMastery')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/19.png"
              :remaining-points="calcRemainingPoints('fortune')"
              :update-function="updateCharacteristics"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="rearMastery"
              :label="$t('constants.rearMastery')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/13.png"
              :remaining-points="calcRemainingPoints('fortune')"
              :update-function="updateCharacteristics"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="berserkMastery"
              :label="$t('constants.berserkMastery')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/5.png"
              :remaining-points="calcRemainingPoints('fortune')"
              :update-function="updateCharacteristics"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="healingMastery"
              :label="$t('constants.healingMastery')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/12.png"
              :remaining-points="calcRemainingPoints('fortune')"
              :update-function="updateCharacteristics"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="rearResistance"
              :label="$t('constants.rearResistance')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/115.png"
              :remaining-points="calcRemainingPoints('fortune')"
              :update-function="updateCharacteristics"
              :max-override="20"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="criticalResistance"
              :label="$t('constants.criticalResistance')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/20.png"
              :remaining-points="calcRemainingPoints('fortune')"
              :update-function="updateCharacteristics"
              :max-override="20"
              :step="stepValue"
            />
          </div>
        </div>

        <div class="category-wrapper flex flex-column flex-grow-1 mt-2" :class="{ error: calcRemainingPoints('major') < 0 }">
          <div class="characteristics-category-header px-2 py-2">
            <span>{{ $t('characterSheet.characteristicsContent.major') }}</span>
            <div class="flex-grow-1" />
            <span>{{ calcRemainingPoints('major') }}/{{ currentCharacter?.characteristics?.limits?.major }} {{ $t('characterSheet.characteristicsContent.points') }}</span>
          </div>

          <div class="flex flex-column px-2 py-1">
            <CharacteristicInput
              v-model="actionPoints"
              :label="$t('constants.actionPoints')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/8.png"
              :remaining-points="calcRemainingPoints('major')"
              :update-function="updateCharacteristics"
              :max-override="1"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="movementPointsAndDamage"
              :label="$t('characterSheet.characteristicsContent.movementPointsAndDamage')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/16.png"
              :remaining-points="calcRemainingPoints('major')"
              :update-function="updateCharacteristics"
              :max-override="1"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="rangeAndDamage"
              :label="$t('characterSheet.characteristicsContent.rangeAndDamage')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/48.png"
              :remaining-points="calcRemainingPoints('major')"
              :update-function="updateCharacteristics"
              :max-override="1"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="wakfuPoints"
              :label="$t('constants.wakfuPoints')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/105.png"
              :remaining-points="calcRemainingPoints('major')"
              :update-function="updateCharacteristics"
              :max-override="1"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="controlAndDamage"
              :label="$t('characterSheet.characteristicsContent.controlAndDamage')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/10.png"
              :remaining-points="calcRemainingPoints('major')"
              :update-function="updateCharacteristics"
              :max-override="1"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="percentDamageInflicted"
              :label="$t('constants.percentDamageInflicted')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/52.png"
              :remaining-points="calcRemainingPoints('major')"
              :update-function="updateCharacteristics"
              :max-override="1"
              :step="stepValue"
            />
            <CharacteristicInput
              v-model="majorElementalResistance"
              :label="$t('constants.elementalResistance')"
              image-path="https://tmktahu.github.io/WakfuAssets/characteristics/116.png"
              :remaining-points="calcRemainingPoints('major')"
              :update-function="updateCharacteristics"
              :max-override="1"
              :step="stepValue"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="characteristic-summary mt-2 px-2 py-2"> Summary down here? </div> -->
    <div class="mt-1">
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
                <p-image :src="`https://tmktahu.github.io/WakfuAssets/spells/${currentCharacter.spells['passiveSlot' + index].iconId}.png`" image-style="width: 40px" />
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
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted, watch } from 'vue';
import { debounce } from 'lodash';
import { useSpells, SPELL_CATEGORIES } from '@/models/spells/useSpells';
import { PASSIVE_SPELL_UNLOCK_MAP, PASSIVE_SPELL_SLOT_UNLOCK_LEVELS } from '@/models/useConstants';

import CharacteristicInput from '@/components/characterSheet/CharacteristicInput.vue';

const masterData = inject('masterData');
const currentCharacter = inject('currentCharacter');

const shiftHeld = ref(false);
const stepValue = computed(() => {
  return shiftHeld.value ? 10 : 1;
});

onMounted(() => {
  document.addEventListener('keydown', (event) => {
    handleShiftValue(event);
  });

  document.addEventListener('keyup', (event) => {
    handleShiftValue(event);
  });
});

const handleShiftValue = (event) => {
  if (event.shiftKey) {
    shiftHeld.value = true;
  } else {
    shiftHeld.value = false;
  }
};

// Intelligence vars
const percentHealthPoints = ref(currentCharacter.value.characteristics.intelligence.percentHealthPoints);
const intelligenceElementalResistance = ref(currentCharacter.value.characteristics.intelligence.elementalResistance);
const barrier = ref(currentCharacter.value.characteristics.intelligence.barrier);
const percentHealsReceived = ref(currentCharacter.value.characteristics.intelligence.percentHealsReceived);
const percentArmorHeathPoints = ref(currentCharacter.value.characteristics.intelligence.percentArmorHeathPoints);

// Strength vars
const elementalMastery = ref(currentCharacter.value.characteristics.strength.elementalMastery);
const meleeMastery = ref(currentCharacter.value.characteristics.strength.meleeMastery);
const distanceMastery = ref(currentCharacter.value.characteristics.strength.distanceMastery);
const healthPoints = ref(currentCharacter.value.characteristics.strength.healthPoints);

// Agility vars
const lock = ref(currentCharacter.value.characteristics.agility.lock);
const dodge = ref(currentCharacter.value.characteristics.agility.dodge);
const initiative = ref(currentCharacter.value.characteristics.agility.initiative);
const lockAndDodge = ref(currentCharacter.value.characteristics.agility.lockAndDodge);
const forceOfWill = ref(currentCharacter.value.characteristics.agility.forceOfWill);

// Fortune vars
const percentCriticalHit = ref(currentCharacter.value.characteristics.fortune.percentCriticalHit);
const percentBlock = ref(currentCharacter.value.characteristics.fortune.percentBlock);
const criticalMastery = ref(currentCharacter.value.characteristics.fortune.criticalMastery);
const rearMastery = ref(currentCharacter.value.characteristics.fortune.rearMastery);
const berserkMastery = ref(currentCharacter.value.characteristics.fortune.berserkMastery);
const healingMastery = ref(currentCharacter.value.characteristics.fortune.healingMastery);
const rearResistance = ref(currentCharacter.value.characteristics.fortune.rearResistance);
const criticalResistance = ref(currentCharacter.value.characteristics.fortune.criticalResistance);

// Major vars
const actionPoints = ref(currentCharacter.value.characteristics.major.actionPoints);
const movementPointsAndDamage = ref(currentCharacter.value.characteristics.major.movementPointsAndDamage);
const rangeAndDamage = ref(currentCharacter.value.characteristics.major.rangeAndDamage);
const wakfuPoints = ref(currentCharacter.value.characteristics.major.wakfuPoints);
const controlAndDamage = ref(currentCharacter.value.characteristics.major.controlAndDamage);
const percentDamageInflicted = ref(currentCharacter.value.characteristics.major.percentDamageInflicted);
const majorElementalResistance = ref(currentCharacter.value.characteristics.major.elementalResistance);

const calcRemainingPoints = (type) => {
  let currentTotal = 0;
  if (type === 'intelligence') {
    currentTotal = percentHealthPoints.value + intelligenceElementalResistance.value + barrier.value + percentHealsReceived.value + percentArmorHeathPoints.value;
  } else if (type === 'strength') {
    currentTotal = elementalMastery.value + meleeMastery.value + distanceMastery.value + healthPoints.value;
  } else if (type === 'agility') {
    currentTotal = lock.value + dodge.value + initiative.value + lockAndDodge.value + forceOfWill.value;
  } else if (type === 'fortune') {
    currentTotal =
      percentCriticalHit.value +
      percentBlock.value +
      criticalMastery.value +
      rearMastery.value +
      berserkMastery.value +
      healingMastery.value +
      rearResistance.value +
      criticalResistance.value;
  } else if (type === 'major') {
    currentTotal =
      actionPoints.value +
      movementPointsAndDamage.value +
      rangeAndDamage.value +
      wakfuPoints.value +
      controlAndDamage.value +
      percentDamageInflicted.value +
      majorElementalResistance.value;
  }

  return currentCharacter.value.characteristics.limits[type] - currentTotal;
};

const updateCharacteristics = () => {
  currentCharacter.value.characteristics.intelligence.percentHealthPoints = percentHealthPoints.value;
  currentCharacter.value.characteristics.intelligence.elementalResistance = intelligenceElementalResistance.value;
  currentCharacter.value.characteristics.intelligence.barrier = barrier.value;
  currentCharacter.value.characteristics.intelligence.percentHealsReceived = percentHealsReceived.value;
  currentCharacter.value.characteristics.intelligence.percentArmorHeathPoints = percentArmorHeathPoints.value;

  currentCharacter.value.characteristics.strength.elementalMastery = elementalMastery.value;
  currentCharacter.value.characteristics.strength.meleeMastery = meleeMastery.value;
  currentCharacter.value.characteristics.strength.distanceMastery = distanceMastery.value;
  currentCharacter.value.characteristics.strength.healthPoints = healthPoints.value;

  currentCharacter.value.characteristics.agility.lock = lock.value;
  currentCharacter.value.characteristics.agility.dodge = dodge.value;
  currentCharacter.value.characteristics.agility.initiative = initiative.value;
  currentCharacter.value.characteristics.agility.lockAndDodge = lockAndDodge.value;
  currentCharacter.value.characteristics.agility.forceOfWill = forceOfWill.value;

  currentCharacter.value.characteristics.fortune.percentCriticalHit = percentCriticalHit.value;
  currentCharacter.value.characteristics.fortune.percentBlock = percentBlock.value;
  currentCharacter.value.characteristics.fortune.criticalMastery = criticalMastery.value;
  currentCharacter.value.characteristics.fortune.rearMastery = rearMastery.value;
  currentCharacter.value.characteristics.fortune.berserkMastery = berserkMastery.value;
  currentCharacter.value.characteristics.fortune.healingMastery = healingMastery.value;
  currentCharacter.value.characteristics.fortune.rearResistance = rearResistance.value;
  currentCharacter.value.characteristics.fortune.criticalResistance = criticalResistance.value;

  currentCharacter.value.characteristics.major.actionPoints = actionPoints.value;
  currentCharacter.value.characteristics.major.movementPointsAndDamage = movementPointsAndDamage.value;
  currentCharacter.value.characteristics.major.rangeAndDamage = rangeAndDamage.value;
  currentCharacter.value.characteristics.major.wakfuPoints = wakfuPoints.value;
  currentCharacter.value.characteristics.major.controlAndDamage = controlAndDamage.value;
  currentCharacter.value.characteristics.major.percentDamageInflicted = percentDamageInflicted.value;
  currentCharacter.value.characteristics.major.elementalResistance = majorElementalResistance.value;
};

watch(
  masterData,
  debounce(() => {
    percentHealthPoints.value = currentCharacter.value.characteristics.intelligence.percentHealthPoints;
    intelligenceElementalResistance.value = currentCharacter.value.characteristics.intelligence.elementalResistance;
    barrier.value = currentCharacter.value.characteristics.intelligence.barrier;
    percentHealsReceived.value = currentCharacter.value.characteristics.intelligence.percentHealsReceived;
    percentArmorHeathPoints.value = currentCharacter.value.characteristics.intelligence.percentArmorHeathPoints;

    elementalMastery.value = currentCharacter.value.characteristics.strength.elementalMastery;
    meleeMastery.value = currentCharacter.value.characteristics.strength.meleeMastery;
    distanceMastery.value = currentCharacter.value.characteristics.strength.distanceMastery;
    healthPoints.value = currentCharacter.value.characteristics.strength.healthPoints;

    lock.value = currentCharacter.value.characteristics.agility.lock;
    dodge.value = currentCharacter.value.characteristics.agility.dodge;
    initiative.value = currentCharacter.value.characteristics.agility.initiative;
    lockAndDodge.value = currentCharacter.value.characteristics.agility.lockAndDodge;
    forceOfWill.value = currentCharacter.value.characteristics.agility.forceOfWill;

    percentCriticalHit.value = currentCharacter.value.characteristics.fortune.percentCriticalHit;
    percentBlock.value = currentCharacter.value.characteristics.fortune.percentBlock;
    criticalMastery.value = currentCharacter.value.characteristics.fortune.criticalMastery;
    rearMastery.value = currentCharacter.value.characteristics.fortune.rearMastery;
    berserkMastery.value = currentCharacter.value.characteristics.fortune.berserkMastery;
    healingMastery.value = currentCharacter.value.characteristics.fortune.healingMastery;
    rearResistance.value = currentCharacter.value.characteristics.fortune.rearResistance;
    criticalResistance.value = currentCharacter.value.characteristics.fortune.criticalResistance;

    actionPoints.value = currentCharacter.value.characteristics.major.actionPoints;
    movementPointsAndDamage.value = currentCharacter.value.characteristics.major.movementPointsAndDamage;
    rangeAndDamage.value = currentCharacter.value.characteristics.major.rangeAndDamage;
    wakfuPoints.value = currentCharacter.value.characteristics.major.wakfuPoints;
    controlAndDamage.value = currentCharacter.value.characteristics.major.controlAndDamage;
    percentDamageInflicted.value = currentCharacter.value.characteristics.major.percentDamageInflicted;
    majorElementalResistance.value = currentCharacter.value.characteristics.major.elementalResistance;
  }, 100)
);

const hasCharacteristicsError = computed(() => {
  return (
    calcRemainingPoints('intelligence') < 0 ||
    calcRemainingPoints('strength') < 0 ||
    calcRemainingPoints('agility') < 0 ||
    calcRemainingPoints('fortune') < 0 ||
    calcRemainingPoints('major') < 0
  );
});

const hasCharacteristicsPointsToSpend = computed(() => {
  return (
    calcRemainingPoints('intelligence') > 0 ||
    calcRemainingPoints('strength') > 0 ||
    calcRemainingPoints('agility') > 0 ||
    calcRemainingPoints('fortune') > 0 ||
    calcRemainingPoints('major') > 0
  );
});

// Spell Stuff

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

defineExpose({
  hasCharacteristicsError,
  hasCharacteristicsPointsToSpend,
});
</script>

<style lang="scss" scoped>
:deep(.characteristic-panels) {
  .p-panel-header {
    padding: 0 0px 0 10px;
  }

  .category-wrapper {
    border: 1px solid var(--highlight-50);
    border-radius: 8px;
    overflow: hidden;

    &.error {
      background: var(--error-10);

      .characteristics-category-header {
        background: var(--error-60);
      }
    }
  }

  .p-inputnumber-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border-radius: 2px;

    span {
      font-size: 12px;
      font-weight: 800;
    }

    &:hover {
      background: var(--primary-40-30);

      span {
        font-size: 14px;
        color: var(--primary-50);
      }
    }
  }
}
.characteristics-category-header {
  display: flex;
  font-size: 1rem;
  background-color: var(--background-20);
  border-bottom: 1px solid var(--highlight-50);
}

.characteristic-summary {
  display: flex;
  flex-grow: 1;
  border: 1px solid var(--highlight-50);
  border-radius: 8px;
}

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
