<template>
  <div v-if="currentCharacter">
    <div class="flex justify-content-between w-full px-2">
      <div class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/health_points.png" />
          <span class="ml-1">{{ $t('constants.hp') }}</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.healthPoints }}</div>
      </div>
      <div class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/armor.png" />
          <span class="ml-1">{{ $t('characterSheet.statsDisplay.ar') }}</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.armorPoints }}</div>
      </div>
      <div class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/action_points.png" />
          <span class="ml-1">{{ $t('constants.ap') }}</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.actionPoints }}</div>
      </div>
      <div class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/movement_points.png" />
          <span class="ml-1">{{ $t('constants.mp') }}</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.movementPoints }}</div>
      </div>
      <div v-if="currentCharacter.class === CLASS_CONSTANTS.huppermage" class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/quadrumental_breeze.png" />
          <span class="ml-1">{{ $t('characterSheet.statsDisplay.qb') }}</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.quadrumentalBreeze }}</div>
      </div>
      <div v-else class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/wakfu_points.png" />
          <span class="ml-1">{{ $t('constants.wp') }}</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.wakfuPoints }}</div>
      </div>
    </div>

    <div class="main-stat-area flex flex-column mt-2 pb-2">
      <div class="section-header py-1 mb-1">{{ $t('characterSheet.statsDisplay.elementalMasteries') }}</div>
      <div class="flex pl-1">
        <div class="flex flex-column flex-grow-1" style="max-width: 50%">
          <div class="stat-block pr-2">
            <p-image class="stat-icon element" src="https://tmktahu.github.io/WakfuAssets/statistics/water_coin.png" />
            <span class="ml-1">{{ $t('characterSheet.statsDisplay.water') }}</span>
            <div class="flex-grow-1" />
            <span>{{ currentCharacter.masteries.water }}</span>
          </div>

          <div class="stat-block pr-2">
            <p-image class="stat-icon element" src="https://tmktahu.github.io/WakfuAssets/statistics/air_coin.png" />
            <span class="ml-1">{{ $t('characterSheet.statsDisplay.air') }}</span>
            <div class="flex-grow-1" />
            <span>{{ currentCharacter.masteries.air }}</span>
          </div>
        </div>
        <div class="flex flex-column flex-grow-1" style="max-width: 50%">
          <div class="stat-block pr-2">
            <p-image class="stat-icon element" src="https://tmktahu.github.io/WakfuAssets/statistics/earth_coin.png" />
            <span class="ml-1">{{ $t('characterSheet.statsDisplay.earth') }}</span>
            <div class="flex-grow-1" />
            <span>{{ currentCharacter.masteries.earth }}</span>
          </div>

          <div class="stat-block pr-2">
            <p-image class="stat-icon element" src="https://tmktahu.github.io/WakfuAssets/statistics/fire_coin.png" />
            <span class="ml-1">{{ $t('characterSheet.statsDisplay.fire') }}</span>
            <div class="flex-grow-1" />
            <span>{{ currentCharacter.masteries.fire }}</span>
          </div>
        </div>
      </div>

      <div class="section-header py-1 mb-1">{{ $t('characterSheet.statsDisplay.elmentalResistances') }}</div>
      <div class="flex pl-1">
        <div class="flex flex-column flex-grow-1" style="max-width: 50%">
          <div class="stat-block pr-2">
            <p-image class="stat-icon element" src="https://tmktahu.github.io/WakfuAssets/statistics/water_coin.png" />
            <span class="ml-1">{{ $t('characterSheet.statsDisplay.water') }}</span>
            <div class="flex-grow-1" />
            <span>{{ calcElemResistancePercentage(currentCharacter.resistances.water) }}% ({{ currentCharacter.resistances.water }})</span>
          </div>

          <div class="stat-block pr-2">
            <p-image class="stat-icon element" src="https://tmktahu.github.io/WakfuAssets/statistics/air_coin.png" />
            <span class="ml-1">{{ $t('characterSheet.statsDisplay.air') }}</span>
            <div class="flex-grow-1" />
            <span>{{ calcElemResistancePercentage(currentCharacter.resistances.air) }}% ({{ currentCharacter.resistances.air }})</span>
          </div>
        </div>
        <div class="flex flex-column flex-grow-1" style="max-width: 50%">
          <div class="stat-block pr-2">
            <p-image class="stat-icon element" src="https://tmktahu.github.io/WakfuAssets/statistics/earth_coin.png" />
            <span class="ml-1">{{ $t('characterSheet.statsDisplay.earth') }}</span>
            <div class="flex-grow-1" />
            <span>{{ calcElemResistancePercentage(currentCharacter.resistances.earth) }}% ({{ currentCharacter.resistances.earth }})</span>
          </div>

          <div class="stat-block pr-2">
            <p-image class="stat-icon element" src="https://tmktahu.github.io/WakfuAssets/statistics/fire_coin.png" />
            <span class="ml-1">{{ $t('characterSheet.statsDisplay.fire') }}</span>
            <div class="flex-grow-1" />
            <span>{{ calcElemResistancePercentage(currentCharacter.resistances.fire) }}% ({{ currentCharacter.resistances.fire }})</span>
          </div>
        </div>
      </div>

      <div class="lex flex-column">
        <div class="section-header py-1 mb-1">{{ $t('characterSheet.statsDisplay.battle') }}</div>
        <div class="flex pl-1">
          <div class="flex flex-column flex-grow-1" style="max-width: 50%">
            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/damage_inflicted.png" />
              <span class="ml-1">{{ $t('characterSheet.statsDisplay.damageInflicted') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.damageInflicted }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/critical_hit.png" />
              <span class="ml-1">{{ $t('characterSheet.statsDisplay.criticalHit') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.criticalHit }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/initiative.png" />
              <span class="ml-1">{{ $t('constants.initiative') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.initiative }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/dodge.png" />
              <span class="ml-1">{{ $t('constants.dodge') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.dodge }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/wisdom.png" />
              <span class="ml-1">{{ $t('constants.wisdom') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.wisdom }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/control.png" />
              <span class="ml-1">{{ $t('constants.control') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.control }}</span>
            </div>
          </div>
          <div class="flex flex-column flex-grow-1" style="max-width: 50%">
            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/heals_performed.png" />
              <span class="ml-1">{{ $t('characterSheet.statsDisplay.healsPerformed') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.healsPerformed }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/block.png" />
              <span class="ml-1">{{ $t('characterSheet.statsDisplay.block') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.block }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/range.png" />
              <span class="ml-1">{{ $t('constants.range') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.range }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/lock.png" />
              <span class="ml-1">{{ $t('constants.lock') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.lock }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/prospecting.png" />
              <span class="ml-1">{{ $t('constants.prospecting') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.prospecting }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/force_of_will.png" />
              <span class="ml-1">{{ $t('constants.forceOfWill') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.forceOfWill }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-column">
        <div class="section-header py-1 mb-1">{{ $t('characterSheet.statsDisplay.secondary') }}</div>
        <div class="flex pl-1">
          <div class="flex flex-column flex-grow-1" style="max-width: 50%">
            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/critical_mastery.png" />
              <span class="ml-1">{{ $t('constants.criticalMastery') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.critical }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/rear_mastery.png" />
              <span class="ml-1">{{ $t('constants.rearMastery') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.rear }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/melee_mastery.png" />
              <span class="ml-1">{{ $t('constants.meleeMastery') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.melee }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/distance_mastery.png" />
              <span class="ml-1">{{ $t('constants.distanceMastery') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.distance }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/healing_mastery.png" />
              <span class="ml-1">{{ $t('constants.healingMastery') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.healing }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/berserk_mastery.png" />
              <span class="ml-1">{{ $t('constants.berserkMastery') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.berserk }}</span>
            </div>
          </div>
          <div class="flex flex-column flex-grow-1" style="max-width: 50%">
            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/critical_resistance.png" />
              <span class="ml-1">{{ $t('constants.criticalResistance') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.resistances.critical }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/rear_resistance.png" />
              <span class="ml-1">{{ $t('constants.rearResistance') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.resistances.rear }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/armor_given.png" />
              <span class="ml-1">{{ $t('characterSheet.statsDisplay.armorGiven') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.armorGiven }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/armor_received.png" />
              <span class="ml-1">{{ $t('characterSheet.statsDisplay.armorReceived') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.armorReceived }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image class="stat-icon" src="https://tmktahu.github.io/WakfuAssets/statistics/indirect_damage.png" />
              <span class="ml-1">{{ $t('characterSheet.statsDisplay.indirectDamage') }}</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.indirectDamage }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="section-header py-1 mb-1">Summary</div> -->
    <!-- <div class="summary-area px-2"> This is where we will display a summary of various conditional and other things </div> -->
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { CLASS_CONSTANTS } from '@/models/useConstants';
import { useStats } from '@/models/useStats';

const currentCharacter = inject('currentCharacter');

const { calcElemResistancePercentage } = useStats();
</script>

<style lang="scss" scoped>
.main-stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 18px;

  width: 70px;

  background-color: var(--background-30);
  border-radius: 8px;
  border: 1px solid var(--highlight-50);

  .stat-value {
    border-top: 1px solid var(--highlight-50);
    width: 100%;
    text-align: center;
  }
}

.main-stat-area {
  background-color: var(--background-10);
}

.section-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--background-20);
}

.stat-block {
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-top: 2px;
  padding-bottom: 2px;

  .p-image {
    display: flex;
    align-items: center;
    background: rgba(white, 0.8);
    border-radius: 4px;
    height: 20px;
  }
}

:deep(.stat-icon) {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;

  img {
    width: 20px;
  }
}
</style>
