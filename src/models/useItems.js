import { ref, reactive, watch } from 'vue';
import itemData from './item_data.json';
import { EFFECT_TYPE_DATA, ITEM_RARITY_DATA, ITEM_TYPE_FILTERS, ITEM_SLOT_DATA } from '@/models/useConstants';
import { useI18n } from 'vue-i18n';
import deepUnref from '@/plugins/deepUnref.js';

// eslint-disable-next-line import/no-unresolved
import workerThing from '@/models/itemFilteringWorker?worker&url';
let worker = new Worker(import.meta.env.MODE === 'development' ? '../src/models/itemFilteringWorker.js' : workerThing);

export const sortOrderOptions = [
  { id: 'ascending', label: 'characterSheet.equipmentContent.itemFilters.smallToBig' },
  { id: 'descending', label: 'characterSheet.equipmentContent.itemFilters.bigToSmall' },
];

export const sortByOptions = [
  { id: 'none', label: 'characterSheet.equipmentContent.itemFilters.none' },
  { id: 'level', label: 'constants.level' },
  { id: 'name', label: 'constants.name' },

  { id: 20, label: 'characterSheet.equipmentContent.itemFilters.healthPoints' },
  { id: 120, label: 'constants.elementalMastery' },
  { id: 124, label: 'constants.waterMastery' },
  { id: 123, label: 'constants.earthMastery' },
  { id: 125, label: 'constants.airMastery' },
  { id: 122, label: 'constants.fireMastery' },

  { id: 1068, label: 'characterSheet.equipmentContent.itemFilters.randElemMasteryValue' },

  { id: 1052, label: 'constants.meleeMastery' },
  { id: 1053, label: 'constants.distanceMastery' },
  { id: 149, label: 'constants.criticalMastery' },
  { id: 180, label: 'constants.rearMastery' },
  { id: 1055, label: 'constants.berserkMastery' },
  { id: 26, label: 'constants.healingMastery' },

  { id: 150, label: 'characterSheet.equipmentContent.itemFilters.criticalHitChance' },
  { id: 875, label: 'characterSheet.equipmentContent.itemFilters.blockChance' },
  { id: 173, label: 'constants.lock' },
  { id: 175, label: 'constants.dodge' },
  { id: 177, label: 'constants.forceOfWill' },
  { id: 171, label: 'constants.initiative' },

  { id: 80, label: 'constants.elementalResistance' },
  { id: 83, label: 'constants.waterResistance' },
  { id: 84, label: 'constants.earthResistance' },
  { id: 85, label: 'constants.airResistance' },
  { id: 82, label: 'constants.fireResistance' },
  { id: 1069, label: 'characterSheet.equipmentContent.itemFilters.randElemResistanceValue' },

  { id: 988, label: 'constants.criticalResistance' },
  { id: 71, label: 'constants.rearResistance' },
];

const itemFilters = reactive({
  sortingParams: [{ sortBy: sortByOptions[0], sortOrder: sortOrderOptions[0] }], // ascending means 'smallest to largest', descending means 'largest to smallest'
  searchTerm: '',
  startLevel: 0,
  endLevel: 230,
  effectFilters: [],
  rarityFilters: ITEM_RARITY_DATA.map((rarityEntry) => {
    return {
      ...rarityEntry,
      checked: true,
    };
  }),
  itemTypeFilters: ITEM_TYPE_FILTERS.map((entry) => {
    return { ...entry, checked: true };
  }),
  resetFilters() {
    this.sortingParams = [{ sortBy: sortByOptions[0], sortOrder: sortOrderOptions[0] }];
    this.searchTerm = '';
    this.startLevel = 0;
    this.endLevel = 230;
    this.effectFilters = [];
    this.rarityFilters = ITEM_RARITY_DATA.map((rarityEntry) => {
      return {
        ...rarityEntry,
        checked: true,
      };
    });
    this.itemTypeFilters = ITEM_TYPE_FILTERS.map((entry) => {
      return { ...entry, checked: true };
    });
  },
});

export const useItems = (character = ref(null)) => {
  const currentCharacter = character;
  const itemListLoading = ref(false);

  const { t } = useI18n();

  const setup = () => {
    const currentItemList = ref([]);

    worker.onmessage = (message) => {
      let itemListResults = message.data.items;

      let filteredBySearch = itemListResults.filter((item) => {
        return t(`items.${item.id}`).toLowerCase().includes(itemFilters.searchTerm.toLowerCase());
      });

      currentItemList.value = filteredBySearch;

      itemListLoading.value = false;
    };

    watch(
      itemFilters,
      () => {
        itemListLoading.value = true;
        performSortAndFilter();
      },
      { immediate: true }
    );

    return {
      currentItemList,
      itemListLoading,
    };
  };

  const performSortAndFilter = () => {
    let params = prepareInputParams();
    let unreffedParams = deepUnref(params);
    worker.postMessage({ params: unreffedParams, itemData, EFFECT_TYPE_DATA });
  };

  const prepareInputParams = () => {
    let params = {};

    params.sortingParams = itemFilters.sortingParams;
    params.startLevel = itemFilters.startLevel;
    params.endLevel = itemFilters.endLevel;
    params.effectFilters = itemFilters.effectFilters;
    params.rarityFilters = itemFilters.rarityFilters;
    params.itemTypeFilters = itemFilters.itemTypeFilters;

    return params;
  };

  const equipItem = (item, event, confirm) => {
    let isRing = item.type.validSlots.includes(ITEM_SLOT_DATA.LEFT_HAND.id) || item.type.validSlots.includes(ITEM_SLOT_DATA.RIGHT_HAND.id);
    // this one handles equipping a 2H weaon while a second weapon is equipped
    let twoHandedWeaponConflict =
      item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) && currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id].item !== null;
    // this one handles equipping a second weapon while a 2H one is equipped
    let secondWeaponConflict =
      item.type.validSlots[0] === ITEM_SLOT_DATA.SECOND_WEAPON.id &&
      currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id].item !== null &&
      currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id].item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id);

    let hasRelicConflict = false;
    let existingRelicSlotId = null;
    let hasEpicConflict = false;
    let existingEpicSlotId = null;

    Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
      if (item.rarity === 5 && currentCharacter.value.equipment[slotKey].item !== null && currentCharacter.value.equipment[slotKey].item.rarity === 5) {
        hasRelicConflict = true;
        existingRelicSlotId = slotKey;
      }

      if (item.rarity === 7 && currentCharacter.value.equipment[slotKey].item !== null && currentCharacter.value.equipment[slotKey].item.rarity === 7) {
        hasEpicConflict = true;
        existingEpicSlotId = slotKey;
      }
    });

    let confirmMessage = null;
    if (hasRelicConflict) {
      confirmMessage = t('characterSheet.equipmentContent.hasRelicWarning');
    }

    if (hasEpicConflict) {
      confirmMessage = t('characterSheet.equipmentContent.hasEpicWarning');
    }

    if (twoHandedWeaponConflict) {
      confirmMessage = t('characterSheet.equipmentContent.twoHandedWeaponWarning');
    }

    if (secondWeaponConflict) {
      confirmMessage = t('characterSheet.equipmentContent.secondWeaponWarning');
    }

    if (hasRelicConflict && twoHandedWeaponConflict) {
      confirmMessage = t('characterSheet.equipmentContent.relicAndTwoHandedWarning');
    }

    if (hasRelicConflict && secondWeaponConflict) {
      confirmMessage = t('characterSheet.equipmentContent.relicAndSecondWeaponWarning');
    }

    if (hasRelicConflict && twoHandedWeaponConflict) {
      confirmMessage = t('characterSheet.equipmentContent.epicAndTwoHandedWarning');
    }

    if (hasRelicConflict && secondWeaponConflict) {
      confirmMessage = t('characterSheet.equipmentContent.epicAndSecondWeaponWarning');
    }

    let hasConflict = twoHandedWeaponConflict || secondWeaponConflict || hasRelicConflict || hasEpicConflict;

    if (hasConflict) {
      if (confirm && event) {
        confirm.require({
          group: 'popup',
          target: event.currentTarget,
          message: confirmMessage,
          accept: () => {
            if (isRing) {
              if (currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id].item === null) {
                currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id].item = item;
              } else {
                currentCharacter.value.equipment[ITEM_SLOT_DATA.RIGHT_HAND.id].item = item;
              }
            }

            if (twoHandedWeaponConflict) {
              currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id].item = item;
              currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id].item = null;
            }

            if (secondWeaponConflict) {
              currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id].item = null;
              currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id].item = item;
            }

            if (hasRelicConflict) {
              // there is a relic conflict and they have opted to remove it
              currentCharacter.value.equipment[existingRelicSlotId].item = null;
              currentCharacter.value.equipment[item.type.validSlots[0]] = item;
            }

            if (hasEpicConflict) {
              // there is a relic conflict and they have opted to remove it
              currentCharacter.value.equipment[existingEpicSlotId].item = null;
              currentCharacter.value.equipment[item.type.validSlots[0]] = item;
            }
          },
        });
      } else {
        if (isRing) {
          if (currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id].item === null) {
            currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id].item = item;
          } else {
            currentCharacter.value.equipment[ITEM_SLOT_DATA.RIGHT_HAND.id].item = item;
          }
        }

        if (twoHandedWeaponConflict) {
          currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id].item = item;
          currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id].item = null;
        }

        if (secondWeaponConflict) {
          currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id].item = null;
          currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id].item = item;
        }

        if (hasRelicConflict) {
          // there is a relic conflict and they have opted to remove it
          currentCharacter.value.equipment[existingRelicSlotId].item = null;
          currentCharacter.value.equipment[item.type.validSlots[0]] = item;
        }

        if (hasEpicConflict) {
          // there is a relic conflict and they have opted to remove it
          currentCharacter.value.equipment[existingEpicSlotId].item = null;
          currentCharacter.value.equipment[item.type.validSlots[0]] = item;
        }
      }
    } else {
      // no conflicts, just equip it normally
      if (isRing) {
        if (currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id].item === null) {
          currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id].item = item;
        } else {
          currentCharacter.value.equipment[ITEM_SLOT_DATA.RIGHT_HAND.id].item = item;
        }
      } else if (item.type.validSlots.length > 1) {
        console.log('There is an item type with 2 valid slots that we are not handling', item.type);
      } else {
        currentCharacter.value.equipment[item.type.validSlots[0]] = item;
      }
    }
  };

  const getNumTotalItems = () => {
    return itemData.length;
  };

  const getRunes = () => {
    return itemData.filter((item) => {
      return item.type.id === 811 && item.id !== 27095 && item.id !== 27096;
    });
  };

  const getSublimations = () => {
    return itemData.filter((item) => {
      return item.type.id === 812 && item.id !== 27282; // we filter out an unused "Healing" sub scroll here
    });
  };

  const getItemById = (itemId) => {
    let potentialitem = itemData.find((item) => {
      return item.id === itemId;
    });
    return potentialitem || null;
  };

  const canSublimationFit = (itemEntry, sublimation) => {
    if (!itemEntry) {
      return false;
    }

    let runeSlotColors = [];
    runeSlotColors.push(itemEntry.runes.runeSlot1?.color);
    runeSlotColors.push(itemEntry.runes.runeSlot2?.color);
    runeSlotColors.push(itemEntry.runes.runeSlot3?.color);
    runeSlotColors.push(itemEntry.runes.runeSlot4?.color);

    let sublimationColorRequirements = sublimation?.sublimationParameters?.slotColorPattern || [];

    // there are two 'sub arrays' we need to check
    let firstRuneSubArray = runeSlotColors.filter((_, i) => i !== 3); // just the first three elements
    let secondRuneSubArray = runeSlotColors.filter((_, i) => i !== 0); // just the last three elements

    // we assume it is valid from the start
    let isValid = true;

    // check the first sub array
    sublimationColorRequirements.forEach((colorId, index) => {
      if (firstRuneSubArray[index] !== colorId && firstRuneSubArray[index] !== 0) {
        // if it does not match or it is not a white
        isValid = false;
      }
    });

    if (isValid) {
      // if we are still valid after the first check, we're good to return
      return isValid;
    }

    // next we check the second sub array, reseting our isValid beforehand
    isValid = true;
    sublimationColorRequirements.forEach((colorId, index) => {
      if (secondRuneSubArray[index] !== colorId && secondRuneSubArray[index] !== 0) {
        // if it does not match or it is not a white
        isValid = false;
      }
    });

    return isValid;
  };

  return {
    setup,
    itemFilters,
    getNumTotalItems,
    equipItem,
    getItemById,
    getRunes,
    getSublimations,
    canSublimationFit,
  };
};
