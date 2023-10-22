<template>
  <div class="flex flex-column h-full">
    <div class="characteristic-panels flex">
      <div class="flex flex-column flex-grow-1 mr-1">
        <div class="category-wrapper flex flex-column px-2 py-2">
          <div class="characteristics-category-header mb-2">Intelligence - Points to Distribute: {{ calcRemainingPoints('intelligence') }}</div>

          <CharacteristicInput
            v-model="percentHealthPoints"
            label="% Health Points"
            :remaining-points="calcRemainingPoints('intelligence')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="intelligenceElementalResistance"
            label="Elemental Resistance"
            :remaining-points="calcRemainingPoints('intelligence')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="barrier"
            label="Barrier"
            :remaining-points="calcRemainingPoints('intelligence')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="percentHealsReceived"
            label="% Heals Received"
            :remaining-points="calcRemainingPoints('intelligence')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="percentArmorHeathPoints"
            label="% Armor Health Points"
            :remaining-points="calcRemainingPoints('intelligence')"
            :update-function="updateCharacteristics"
          />
        </div>

        <div class="category-wrapper flex flex-column px-2 py-2 mt-2">
          <div class="characteristics-category-header mb-2">Strength - Points to Distribute: {{ calcRemainingPoints('strength') }}</div>

          <CharacteristicInput
            v-model="elementalMastery"
            label="Elemental Mastery"
            :remaining-points="calcRemainingPoints('strength')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="meleeMastery"
            label="Melee Mastery"
            :remaining-points="calcRemainingPoints('strength')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="distanceMastery"
            label="Distance Mastery"
            :remaining-points="calcRemainingPoints('strength')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="healthPoints"
            label="Health Points"
            :remaining-points="calcRemainingPoints('strength')"
            :update-function="updateCharacteristics"
          />
        </div>

        <div class="category-wrapper flex flex-column px-2 py-2 mt-2">
          <div class="characteristics-category-header mb-2">Agility - Points to Distribute: {{ calcRemainingPoints('agility') }}</div>

          <CharacteristicInput v-model="lock" label="Lock" :remaining-points="calcRemainingPoints('agility')" :update-function="updateCharacteristics" />
          <CharacteristicInput v-model="dodge" label="Dodge" :remaining-points="calcRemainingPoints('agility')" :update-function="updateCharacteristics" />
          <CharacteristicInput
            v-model="initiative"
            label="Initiative"
            :remaining-points="calcRemainingPoints('agility')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="lockAndDodge"
            label="Lock and Dodge"
            :remaining-points="calcRemainingPoints('agility')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="forceOfWill"
            label="Force of Will"
            :remaining-points="calcRemainingPoints('agility')"
            :update-function="updateCharacteristics"
          />
        </div>
      </div>

      <div class="flex flex-column flex-grow-1 ml-1">
        <div class="category-wrapper flex flex-column flex-grow-1 px-2 py-2">
          <div class="characteristics-category-header mb-2">Fortune - Points to Distribute: {{ calcRemainingPoints('fortune') }}</div>

          <CharacteristicInput
            v-model="percentCriticalHit"
            label="% Critical Hit"
            :remaining-points="calcRemainingPoints('fortune')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="percentBlock"
            label="% Block"
            :remaining-points="calcRemainingPoints('fortune')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="criticalMastery"
            label="Critical Mastery"
            :remaining-points="calcRemainingPoints('fortune')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="rearMastery"
            label="Rear Mastery"
            :remaining-points="calcRemainingPoints('fortune')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="berserkMastery"
            label="Berserk Mastery"
            :remaining-points="calcRemainingPoints('fortune')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="healingMastery"
            label="Healing Mastery"
            :remaining-points="calcRemainingPoints('fortune')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="rearResistance"
            label="Rear Resistance"
            :remaining-points="calcRemainingPoints('fortune')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="criticalResistance"
            label="Critical Resistance"
            :remaining-points="calcRemainingPoints('fortune')"
            :update-function="updateCharacteristics"
          />
        </div>

        <div class="category-wrapper flex flex-column flex-grow-1 px-2 py-2 mt-2">
          <div class="characteristics-category-header mb-2">Major - Points to Distribute: {{ calcRemainingPoints('major') }}</div>

          <CharacteristicInput
            v-model="actionPoints"
            label="Action Points"
            :remaining-points="calcRemainingPoints('major')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="movementPointsAndDamage"
            label="Movement Points and Damage"
            :remaining-points="calcRemainingPoints('major')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="rangeAndDamage"
            label="Range and Damage"
            :remaining-points="calcRemainingPoints('major')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="wakfuPoints"
            label="Wakfu Points"
            :remaining-points="calcRemainingPoints('major')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="controlAndDamage"
            label="Control and Damage"
            :remaining-points="calcRemainingPoints('major')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="percentDamageInflicted"
            label="% Damage Inflicted"
            :remaining-points="calcRemainingPoints('major')"
            :update-function="updateCharacteristics"
          />
          <CharacteristicInput
            v-model="majorElementalResistance"
            label="Elemental Resistance"
            :remaining-points="calcRemainingPoints('major')"
            :update-function="updateCharacteristics"
          />
        </div>
      </div>
    </div>

    <div class="characteristic-summary mt-2 px-2 py-2"> Summary down here? </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue';

import CharacteristicInput from '@/components/CharacteristicInput.vue';

const currentCharacter = inject('currentCharacter');

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
</script>

<style lang="scss" scoped>
:deep(.characteristic-panels) {
  .p-panel-header {
    padding: 0 0px 0 10px;
  }

  .category-wrapper {
    border: 1px solid var(--bonta-blue-100);
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
      color: white;
    }

    &:hover {
      background: var(--bonta-blue-30);

      span {
        font-size: 14px;
        color: var(--bonta-blue-100);
      }
    }
  }
}
.characteristics-category-header {
  font-size: 1rem;
}

.characteristic-summary {
  display: flex;
  flex-grow: 1;
  border: 1px solid var(--bonta-blue-100);
}
</style>
