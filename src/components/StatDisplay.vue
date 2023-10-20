<template>
  <div>
    <div class="flex">
      <span>Health Points</span>
      <span>Action Points</span>
      <span>Movement Points</span>
      <span>Wakfu Points</span>
    </div>

    <div class="flex flex-column">
      <div class="text-center flex-grow-1 py-1">Mastery</div>
      <div class="flex">
        <div class="flex flex-column flex-grow-1">
          <div class="flex align-items-center pr-2">
            <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
            <span>Water Mastery</span>
            <div class="flex-grow-1" />
            <span>num</span>
          </div>

          <div class="flex align-items-center pr-2">
            <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
            <span>Air Mastery</span>
            <div class="flex-grow-1" />
            <span>num</span>
          </div>
        </div>
        <div class="flex flex-column flex-grow-1">
          <div class="flex align-items-center pr-2">
            <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
            <span>Earth Mastery</span>
            <div class="flex-grow-1" />
            <span>num</span>
          </div>

          <div class="flex align-items-center pr-2">
            <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
            <span>Fire Mastery</span>
            <div class="flex-grow-1" />
            <span>num</span>
          </div>
        </div>
      </div>

      <div class="flex flex-column">
        <div class="text-center flex-grow-1 py-1">Battle</div>
        <div class="flex">
          <div class="flex flex-column flex-grow-1">
            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Damage Inflicted</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Critical Hit</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Initiative</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Dodge</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Wisdom</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Control</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>
          </div>
          <div class="flex flex-column flex-grow-1">
            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Heals Performed</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Block</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Range</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Lock</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Prospecting</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Force of Will</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-column">
        <div class="text-center flex-grow-1 py-1">Secondary</div>
        <div class="flex">
          <div class="flex flex-column flex-grow-1">
            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Critical Mastery</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Rear Mastery</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Melee Mastery</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Distance Mastery</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Healing Mastery</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Berserk Mastery</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>
          </div>
          <div class="flex flex-column flex-grow-1">
            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Critical Resistance</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Rear Resistance</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Armor Given</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Armor Received</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>

            <div class="flex align-items-center pr-2">
              <i class="pi pi-question mr-1" style="font-size: 0.75rem" />
              <span>Indirect Damage</span>
              <div class="flex-grow-1" />
              <span>num</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
