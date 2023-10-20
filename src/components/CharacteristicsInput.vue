<template>
  <div class="flex flex-column">
    <div class="flex flex-column">
      <p-panel toggleable>
        <template v-slot:header>
          <div class="characteristics-category-header">Intelligence - Points to Distribute: {{ calcRemainingPoints('intelligence') }}</div>
        </template>

        <div class="flex flex-column flex-grow-1">
          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>% Health Points</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="percentHealthPoints" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Elemental Resistance</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="intelligenceElementalResistance" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Barrier</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="barrier" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>% Heals Received</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="percentHealsReceived" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>% Armor Health Points</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="percentArmorHeathPoints" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>
        </div>
      </p-panel>

      <p-panel toggleable>
        <template v-slot:header>
          <div class="characteristics-category-header">Strength - Points to Distribute: {{ calcRemainingPoints('strength') }}</div>
        </template>

        <div class="flex flex-column flex-grow-1">
          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Elemental Mastery</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="elementalMastery" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Melee Mastery</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="meleeMastery" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Distance Mastery</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="distanceMastery" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Health Points</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="healthPoints" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>
        </div>
      </p-panel>

      <p-panel toggleable>
        <template v-slot:header>
          <div class="characteristics-category-header">Agility - Points to Distribute: {{ calcRemainingPoints('agility') }}</div>
        </template>

        <div class="flex flex-column flex-grow-1">
          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Lock</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="lock" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Dodge</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="dodge" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Initiative</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="initiative" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Lock and Dodge</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="lockAndDodge" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Force of Will</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="forceOfWill" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>
        </div>
      </p-panel>

      <p-panel toggleable>
        <template v-slot:header>
          <div class="characteristics-category-header">Fortune - Points to Distribute: {{ calcRemainingPoints('fortune') }}</div>
        </template>

        <div class="flex flex-column flex-grow-1">
          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>% Critical Hit</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="percentCriticalHit" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>% Block</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="percentBlock" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Critical Mastery</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="criticalMastery" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Rear Mastery</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="rearMastery" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Berserk Mastery</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="berserkMastery" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Healing Mastery</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="healingMastery" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Rear Resistance</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="rearResistance" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Critical Resistance</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="criticalResistance" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>
        </div>
      </p-panel>

      <p-panel toggleable>
        <template v-slot:header>
          <div class="characteristics-category-header">Major - Points to Distribute: {{ calcRemainingPoints('intelligence') }}</div>
        </template>

        <div class="flex flex-column flex-grow-1">
          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Action Points</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="actionPoints" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Movement Points and Damage</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="movementPointsAndDamage" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Range and Damage</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="rangeAndDamage" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Wakfu Points</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="wakfuPoints" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Control and Damage</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="controlAndDamage" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>% Damage Inflicted</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="percentDamageInflicted" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>

          <div class="flex mt-2">
            <i class="pi pi-question mr-3" />
            <span>Elemental Resistance</span>
            <div class="flex-grow-1" />
            <p-inputNumber v-model="majorElementalResistance" class="number-input" show-buttons :min="0" button-layout="horizontal" />
          </div>
        </div>
      </p-panel>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue';

const currentCharacter = inject('currentCharacter');

// Intelligence vars
const percentHealthPoints = ref(0);
const intelligenceElementalResistance = ref(0);
const barrier = ref(0);
const percentHealsReceived = ref(0);
const percentArmorHeathPoints = ref(0);

// Strength vars
const elementalMastery = ref(0);
const meleeMastery = ref(0);
const distanceMastery = ref(0);
const healthPoints = ref(0);

// Agility vars
const lock = ref(0);
const dodge = ref(0);
const initiative = ref(0);
const lockAndDodge = ref(0);
const forceOfWill = ref(0);

// Fortune vars
const percentCriticalHit = ref(0);
const percentBlock = ref(0);
const criticalMastery = ref(0);
const rearMastery = ref(0);
const berserkMastery = ref(0);
const healingMastery = ref(0);
const rearResistance = ref(0);
const criticalResistance = ref(0);

// Major vars
const actionPoints = ref(0);
const movementPointsAndDamage = ref(0);
const rangeAndDamage = ref(0);
const wakfuPoints = ref(0);
const controlAndDamage = ref(0);
const percentDamageInflicted = ref(0);
const majorElementalResistance = ref(0);

const calcRemainingPoints = (type) => {
  let currentTotal = 0;
  if (type === 'intelligence') {
    currentTotal =
      percentHealthPoints.value + intelligenceElementalResistance.value + barrier.value + percentHealsReceived.value + percentArmorHeathPoints.value;
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
</script>

<style lang="scss" scoped>
.characteristics-category-header {
  font-size: 1.25rem;
}
</style>
