<template>
  <div v-if="currentCharacter">
    <div class="flex justify-content-between w-full px-2">
      <div class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image src="../src/assets/images/ui/health_points.png" style="height: 20px" image-style="height: 20px" />
          <span class="ml-1">HP</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.healthPoints }}</div>
      </div>
      <div class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image src="../src/assets/images/ui/armor.png" style="height: 20px" image-style="height: 20px" />
          <span class="ml-1">AR</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.armorPoints }}</div>
      </div>
      <div class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image src="../src/assets/images/ui/action_points.png" style="height: 20px" image-style="height: 20px" />
          <span class="ml-1">AP</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.actionPoints }}</div>
      </div>
      <div class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image src="../src/assets/images/ui/movement_points.png" style="height: 20px" image-style="height: 20px" />
          <span class="ml-1">MP</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.movementPoints }}</div>
      </div>
      <div v-if="currentCharacter.class === CLASS_CONSTANTS.huppermage" class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image src="../src/assets/images/ui/quadrumental_breeze.png" style="height: 20px" image-style="height: 20px" />
          <span class="ml-1">QB</span>
        </div>
        <div class="stat-value py-1">{{ currentCharacter.quadrumentalBreeze }}</div>
      </div>
      <div v-else class="main-stat-box">
        <div class="flex align-items-center my-1">
          <p-image src="../src/assets/images/ui/wakfu_points.png" style="height: 20px" image-style="height: 20px" />
          <span class="ml-1">WP</span>
        </div>
        <div>{{ currentCharacter.wakfuPoints }}</div>
      </div>
    </div>

    <div class="main-stat-area flex flex-column mt-2 pb-2">
      <div class="section-header py-1 mb-1">Elemental Masteries</div>
      <div class="flex pl-1">
        <div class="flex flex-column flex-grow-1" style="max-width: 50%">
          <div class="stat-block pr-2">
            <p-image src="../src/assets/images/ui/water_coin.png" style="height: 20px" image-style="height: 20px" />
            <span class="ml-1">Water Mastery</span>
            <div class="flex-grow-1" />
            <span>{{ currentCharacter.masteries.water }}</span>
          </div>

          <div class="stat-block pr-2">
            <p-image src="../src/assets/images/ui/air_coin.png" style="height: 20px" image-style="height: 20px" />
            <span class="ml-1">Air Mastery</span>
            <div class="flex-grow-1" />
            <span>{{ currentCharacter.masteries.air }}</span>
          </div>
        </div>
        <div class="flex flex-column flex-grow-1" style="max-width: 50%">
          <div class="stat-block pr-2">
            <p-image src="../src/assets/images/ui/earth_coin.png" style="height: 20px" image-style="height: 20px" />
            <span class="ml-1">Earth Mastery</span>
            <div class="flex-grow-1" />
            <span>{{ currentCharacter.masteries.earth }}</span>
          </div>

          <div class="stat-block pr-2">
            <p-image src="../src/assets/images/ui/fire_coin.png" style="height: 20px" image-style="height: 20px" />
            <span class="ml-1">Fire Mastery</span>
            <div class="flex-grow-1" />
            <span>{{ currentCharacter.masteries.fire }}</span>
          </div>
        </div>
      </div>

      <div class="section-header py-1 mb-1">Elemental Resistances</div>
      <div class="flex pl-1">
        <div class="flex flex-column flex-grow-1" style="max-width: 50%">
          <div class="stat-block pr-2">
            <p-image src="../src/assets/images/ui/water_coin.png" style="height: 20px" image-style="height: 20px" />
            <span class="ml-1">Water Res</span>
            <div class="flex-grow-1" />
            <span>{{ calcElemResistancePercentage(currentCharacter.resistances.water) }}% ({{ currentCharacter.resistances.water }})</span>
          </div>

          <div class="stat-block pr-2">
            <p-image src="../src/assets/images/ui/air_coin.png" style="height: 20px" image-style="height: 20px" />
            <span class="ml-1">Air Res</span>
            <div class="flex-grow-1" />
            <span>{{ calcElemResistancePercentage(currentCharacter.resistances.air) }}% ({{ currentCharacter.resistances.air }})</span>
          </div>
        </div>
        <div class="flex flex-column flex-grow-1" style="max-width: 50%">
          <div class="stat-block pr-2">
            <p-image src="../src/assets/images/ui/earth_coin.png" style="height: 20px" image-style="height: 20px" />
            <span class="ml-1">Earth Res</span>
            <div class="flex-grow-1" />
            <span>{{ calcElemResistancePercentage(currentCharacter.resistances.earth) }}% ({{ currentCharacter.resistances.earth }})</span>
          </div>

          <div class="stat-block pr-2">
            <p-image src="../src/assets/images/ui/fire_coin.png" style="height: 20px" image-style="height: 20px" />
            <span class="ml-1">Fire Res</span>
            <div class="flex-grow-1" />
            <span>{{ calcElemResistancePercentage(currentCharacter.resistances.fire) }}% ({{ currentCharacter.resistances.fire }})</span>
          </div>
        </div>
      </div>

      <div class="lex flex-column">
        <div class="section-header py-1 mb-1">Battle</div>
        <div class="flex pl-1">
          <div class="flex flex-column flex-grow-1" style="max-width: 50%">
            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/damage_inflicted.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Damage Inflicted</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.damageInflicted }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/critical_hit.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Critical Hit</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.criticalHit }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/initiative.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Initiative</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.initiative }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/dodge.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Dodge</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.dodge }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/wisdom.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Wisdom</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.wisdom }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/control.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Control</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.control }}</span>
            </div>
          </div>
          <div class="flex flex-column flex-grow-1" style="max-width: 50%">
            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/heals_performed.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Heals Performed</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.healsPerformed }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/block.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Block</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.block }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/range.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Range</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.range }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/lock.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Lock</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.lock }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/prospecting.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Prospecting</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.prospecting }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/force_of_will.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Force of Will</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.forceOfWill }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-column">
        <div class="section-header py-1 mb-1">Secondary</div>
        <div class="flex pl-1">
          <div class="flex flex-column flex-grow-1" style="max-width: 50%">
            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/critical_mastery.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Critical Mastery</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.critical }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/rear_mastery.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Rear Mastery</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.rear }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/melee_mastery.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Melee Mastery</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.melee }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/distance_mastery.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Distance Mastery</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.distance }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/healing_mastery.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Healing Mastery</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.healing }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/berserk_mastery.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Berserk Mastery</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.masteries.berserk }}</span>
            </div>
          </div>
          <div class="flex flex-column flex-grow-1" style="max-width: 50%">
            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/critical_resistance.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Critical Resistance</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.resistances.critical }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/rear_resistance.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Rear Resistance</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.resistances.rear }}</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/armor_given.png" style="height: 20px" image-style="height: 16px" />
              <span class="ml-1">Armor Given</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.armorGiven }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/armor_received.png" style="height: 20px" image-style="height: 16px" />
              <span class="ml-1">Armor Received</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.armorReceived }}%</span>
            </div>

            <div class="stat-block pr-2">
              <p-image src="../src/assets/images/ui/indirect_damage.png" style="height: 20px" image-style="height: 20px" />
              <span class="ml-1">Indirect Damage</span>
              <div class="flex-grow-1" />
              <span>{{ currentCharacter.stats.indirectDamage }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-header py-1 mb-1">Summary</div>
    <div class="summary-area px-2"> This is where we will display a summary of various conditional and other things </div>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue';
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

  background-color: var(--bonta-blue-30);
  border-radius: 8px;
  border: 1px solid var(--bonta-blue-60);

  .stat-value {
    border-top: 1px solid var(--bonta-blue-20);
    width: 100%;
    text-align: center;
  }
}

.main-stat-area {
  background-color: var(--bonta-blue);
}

.section-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: var(--bonta-blue-20);
}

.stat-block {
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-top: 2px;
  padding-bottom: 2px;

  border-bottom: 1px solid var(--bonta-blue);

  .p-image {
    display: flex;
    align-items: center;
    background: rgba(white, 0.8);
    border-radius: 4px;
    height: 20px;
  }
}
</style>
