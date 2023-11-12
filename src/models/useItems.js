import { ref, computed, reactive, watch } from 'vue';
import itemData from './item_data.json';
import { EFFECT_TYPE_DATA, ITEM_RARITY_DATA, ITEM_TYPE_FILTERS, ITEM_SLOT_DATA } from '@/models/useConstants';

let sortedItemData = ref([]);
let currentSortBy = { id: 'none' };
let currentSortOrder = 'ascending';

export const sortOrderOptions = [
  { id: 'ascending', label: 'Small to Big' },
  { id: 'descending', label: 'Big to Small' },
];

export const sortByOptions = [
  { id: 'none', label: 'None' },
  { id: 'level', label: 'Level' },
  { id: 'name', label: 'Name' },

  { id: 20, label: 'Health Points (HP)' },
  { id: 120, label: 'Elemental Mastery' },
  { id: 124, label: 'Water Mastery' },
  { id: 123, label: 'Earth Mastery' },
  { id: 125, label: 'Air Mastery' },
  { id: 122, label: 'Fire Mastery' },

  { id: 1068, label: 'Rand Elem Mastery Value' },

  { id: 1052, label: 'Melee Mastery' },
  { id: 1053, label: 'Distance Mastery' },
  { id: 149, label: 'Critical Mastery' },
  { id: 180, label: 'Rear Mastery' },
  { id: 1055, label: 'Berserk Mastery' },

  { id: 150, label: 'Critical Hit Chance' },
  { id: 875, label: 'Block Chance' },
  { id: 173, label: 'Lock' },
  { id: 175, label: 'Dodge' },
  { id: 177, label: 'Force of Will' },
  { id: 171, label: 'Initiative' },

  { id: 80, label: 'Elemental Resistance' },
  { id: 83, label: 'Water Resistance' },
  { id: 84, label: 'Earth Resistance' },
  { id: 85, label: 'Air Resistance' },
  { id: 82, label: 'Fire Resistance' },
  { id: 1069, label: 'Rand Elem Resistance Value' },

  { id: 988, label: 'Critical Resistance' },
  { id: 71, label: 'Rear Resistance' },
];

const itemFilters = reactive({
  sortBy: sortByOptions[0],
  sortOrder: sortOrderOptions[0], // ascending means 'smallest to largest', descending means 'largest to smallest'
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
    this.sortBy = sortByOptions[0];
    this.sortOrder = sortOrderOptions[0];
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

  const setup = () => {
    const currentItemList = computed(() => {
      handleSortingLogic();
      return getFilteredItems();
    });

    return {
      currentItemList,
    };
  };

  const handleSortingLogic = () => {
    let targetSortBy = itemFilters.sortBy;
    let targetSortOrder = itemFilters.sortOrder;

    if (targetSortBy === currentSortBy && targetSortOrder === currentSortOrder) {
      // there was no sorting change, so don't sort
      return;
    }

    // we want to perform a sort
    // first copy the original data incase the sort is 'none'
    sortedItemData.value = structuredClone(itemData);

    // save the current sort settings for next time
    currentSortBy = targetSortBy;
    currentSortOrder = targetSortOrder;

    // if the sortBy is none, don't sort
    if (targetSortBy.id === 'none') {
      return;
    }

    // otherwise we want to do a sort
    sortedItemData.value.sort((itemA, itemB) => {
      if (targetSortBy.id === 'level') {
        // we handle level sorting manually
        return targetSortOrder.id === 'ascending' ? itemA.level - itemB.level : itemB.level - itemA.level;
      } else if (targetSortBy.id === 'name') {
        // we handle name sorting manually
        let nameA = itemA.name.toLowerCase(),
          nameB = itemB.name.toLowerCase();

        if (targetSortOrder.id === 'ascending') {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        } else {
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        }
      } else {
        // we use this function to sort by an equip effect
        return sortByEquipEffect(itemA, itemB, targetSortBy, targetSortOrder);
      }
    });
  };

  const sortByEquipEffect = (itemA, itemB, targetSortBy, targetSortOrder) => {
    // these are the vars that will contain the sorting data.
    // we set them to very negative initially to handle items that don't have the target equip effect
    let itemAStatValue = -10000;
    let itemBStatValue = -10000;

    // this finds the target effect and gets its value if it exists for item A
    if (itemA.equipEffects?.length) {
      let itemAStat = itemA.equipEffects.find((equipEffect) => {
        return equipEffect.id === targetSortBy.id;
      });

      if (itemAStat !== undefined) {
        itemAStatValue = itemAStat.values[0];
      }
    }

    // this finds the target effect and gets its value if it exists for item B
    if (itemB.equipEffects?.length) {
      let itemBStat = itemB.equipEffects.find((equipEffect) => {
        return equipEffect.id === targetSortBy.id;
      });

      if (itemBStat !== undefined) {
        itemBStatValue = itemBStat.values[0];
      }
    }

    // we do math here based on the sort order in order to sort them based on their values
    return targetSortOrder.id === 'ascending' ? itemAStatValue - itemBStatValue : itemBStatValue - itemAStatValue;
  };

  const getFilteredItems = () => {
    // Filter Logic
    // (itemType OR itemType OR ...) AND (level range check) AND (itemMod AND itemMod AND ...) AND (rarity OR rarity OR ...)

    let filteredItems = sortedItemData.value.filter((item) => {
      // TODO missing some from the item type filters
      return hasSearchTerm(item) && isWithinLevelRange(item) && matchesEffectFilters(item) && matchesRarityFilters(item) && matchesItemTypeFilters(item);
    });

    return filteredItems;
  };

  const hasSearchTerm = (item) => {
    return item.name.toLowerCase().includes(itemFilters.searchTerm.toLowerCase());
  };

  const isWithinLevelRange = (item) => {
    return itemFilters.startLevel <= item.level && item.level <= itemFilters.endLevel;
  };

  const matchesEffectFilters = (item) => {
    if (itemFilters.effectFilters.length === 0) {
      return true;
    }

    if (item.equipEffects?.length === undefined || item.equipEffects.length === 0) {
      return false;
    }

    // we assume the item is valid. innocent until proven guilty. now onto the gauntlet
    let validItem = true;

    // First we need to iterate over each filter
    itemFilters.effectFilters.some((filter) => {
      // we get the target filter's data from our constants so we can translate to the raw ID
      let targetFilterEffectData = EFFECT_TYPE_DATA[filter.type.value];

      // Then we iterate over each of the item's effects
      let hadEffect = false;
      item.equipEffects.some((itemEffect) => {
        // if the item has the effect, then we need to check it against our filters
        if (itemEffect.id === targetFilterEffectData.rawId) {
          hadEffect = true;

          if (filter.comparator.id === 'equalTo') {
            validItem = itemEffect.values[0] === filter.value;
          } else if (filter.comparator.id === 'greaterThanOrEqualTo') {
            validItem = itemEffect.values[0] >= filter.value;
          } else if (filter.comparator.id === 'lessThanOrEqualTo') {
            validItem = itemEffect.values[0] <= filter.value;
          } else {
            console.error('Unknown comparator when trying to evaluate effect filters.');
          }

          // we want to break out of this loop
          return true;
        }

        // if we hit here, we want to continue the loop
        return false;
      });

      if (hadEffect === false) {
        validItem = false;
      }

      if (validItem === false) {
        return true;
      }

      return false;
    });

    return validItem;
  };

  const matchesRarityFilters = (item) => {
    let itemRarity = item.rarity;
    let validItem = false; // we assume false because if one rarity matches, we want it

    itemFilters.rarityFilters.some((rarityEntry) => {
      if (rarityEntry.checked && rarityEntry.id === itemRarity) {
        validItem = true;
        return true;
      }

      return false;
    });

    return validItem;
  };

  const matchesItemTypeFilters = (item) => {
    if (itemFilters.itemTypeFilters.length === 0) {
      return true;
    }

    let itemTypeRawId = item.type.id;
    let validItem = false; // we assume false because if one type matches, we want it

    itemFilters.itemTypeFilters.some((itemTypeEntry) => {
      if (itemTypeEntry.checked && itemTypeEntry.rawId === itemTypeRawId) {
        validItem = true;
        return true;
      }

      return false;
    });

    return validItem;
  };

  const equipItem = (item, event, confirm) => {
    let isRing = item.type.validSlots.includes(ITEM_SLOT_DATA.LEFT_HAND.id) || item.type.validSlots.includes(ITEM_SLOT_DATA.RIGHT_HAND.id);
    // this one handles equipping a 2H weaon while a second weapon is equipped
    let twoHandedWeaponConflict =
      item.type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id) && currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] !== null;
    // this one handles equipping a second weapon while a 2H one is equipped
    let secondWeaponConflict =
      item.type.validSlots[0] === ITEM_SLOT_DATA.SECOND_WEAPON.id &&
      currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] !== null &&
      currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id].type.disabledSlots.includes(ITEM_SLOT_DATA.SECOND_WEAPON.id);

    let hasRelicConflict = false;
    let existingRelicSlotId = null;
    let hasEpicConflict = false;
    let existingEpicSlotId = null;

    Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
      if (item.rarity === 5 && currentCharacter.value.equipment[slotKey] !== null && currentCharacter.value.equipment[slotKey].rarity === 5) {
        hasRelicConflict = true;
        existingRelicSlotId = slotKey;
      }

      if (item.rarity === 7 && currentCharacter.value.equipment[slotKey] !== null && currentCharacter.value.equipment[slotKey].rarity === 7) {
        hasEpicConflict = true;
        existingEpicSlotId = slotKey;
      }
    });

    let confirmMessage = null;
    if (hasRelicConflict) {
      confirmMessage = 'You already have a Relic item equipped. Doing this will remove it. Are you sure?';
    }

    if (hasEpicConflict) {
      confirmMessage = 'You already have an Epic item equipped. Doing this will remove it. Are you sure?';
    }

    if (twoHandedWeaponConflict) {
      confirmMessage = 'That is a two-handed weapon, and you have an item in your second weapon slot. Are you sure?';
    }

    if (secondWeaponConflict) {
      confirmMessage = 'You have a two-handed weapon equipped. Doing this will remove it. Are you sure?';
    }

    if (hasRelicConflict && twoHandedWeaponConflict) {
      confirmMessage = 'You have an item in your second weapon slot and a Relic item already equipped. Both will be removed if you do this. Are you sure?';
    }

    if (hasRelicConflict && secondWeaponConflict) {
      confirmMessage = 'You have two handed weapon and a Relic item already equipped. Both will be removed if you do this. Are you sure?';
    }

    if (hasRelicConflict && twoHandedWeaponConflict) {
      confirmMessage = 'You have an item in your second weapon slot and an Epic item already equipped. Both will be removed if you do this. Are you sure?';
    }

    if (hasRelicConflict && secondWeaponConflict) {
      confirmMessage = 'You have two handed weapon and an Epic item already equipped. Both will be removed if you do this. Are you sure?';
    }

    let hasConflict = twoHandedWeaponConflict || secondWeaponConflict || hasRelicConflict || hasEpicConflict;

    if (hasConflict) {
      if (confirm && event) {
        confirm.require({
          target: event.currentTarget,
          message: confirmMessage,
          accept: () => {
            if (isRing) {
              if (currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] === null) {
                currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] = item;
              } else {
                currentCharacter.value.equipment[ITEM_SLOT_DATA.RIGHT_HAND.id] = item;
              }
            }

            if (twoHandedWeaponConflict) {
              currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] = item;
              currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] = null;
            }

            if (secondWeaponConflict) {
              currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] = null;
              currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] = item;
            }

            if (hasRelicConflict) {
              // there is a relic conflict and they have opted to remove it
              currentCharacter.value.equipment[existingRelicSlotId] = null;
              currentCharacter.value.equipment[item.type.validSlots[0]] = item;
            }

            if (hasEpicConflict) {
              // there is a relic conflict and they have opted to remove it
              currentCharacter.value.equipment[existingEpicSlotId] = null;
              currentCharacter.value.equipment[item.type.validSlots[0]] = item;
            }
          },
        });
      } else {
        if (isRing) {
          if (currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] === null) {
            currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] = item;
          } else {
            currentCharacter.value.equipment[ITEM_SLOT_DATA.RIGHT_HAND.id] = item;
          }
        }

        if (twoHandedWeaponConflict) {
          currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] = item;
          currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] = null;
        }

        if (secondWeaponConflict) {
          currentCharacter.value.equipment[ITEM_SLOT_DATA.FIRST_WEAPON.id] = null;
          currentCharacter.value.equipment[ITEM_SLOT_DATA.SECOND_WEAPON.id] = item;
        }

        if (hasRelicConflict) {
          // there is a relic conflict and they have opted to remove it
          currentCharacter.value.equipment[existingRelicSlotId] = null;
          currentCharacter.value.equipment[item.type.validSlots[0]] = item;
        }

        if (hasEpicConflict) {
          // there is a relic conflict and they have opted to remove it
          currentCharacter.value.equipment[existingEpicSlotId] = null;
          currentCharacter.value.equipment[item.type.validSlots[0]] = item;
        }
      }
    } else {
      // no conflicts, just equip it normally
      if (isRing) {
        if (currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] === null) {
          currentCharacter.value.equipment[ITEM_SLOT_DATA.LEFT_HAND.id] = item;
        } else {
          currentCharacter.value.equipment[ITEM_SLOT_DATA.RIGHT_HAND.id] = item;
        }
      } else if (item.type.validSlots.length > 1) {
        console.log('there is an item type with 2 valid slots that we are not handling');
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
      return item.type.id === 811;
    });
  };

  const getSublimations = () => {
    return itemData.filter((item) => {
      return item.type.id === 812;
    });
  };

  const getItemById = (itemId) => {
    let potentialitem = itemData.find((item) => {
      return item.id === itemId;
    });
    return potentialitem || null;
  };

  return {
    setup,
    itemFilters,
    getFilteredItems,
    getNumTotalItems,
    equipItem,
    getItemById,
    getRunes,
    getSublimations,
  };
};
