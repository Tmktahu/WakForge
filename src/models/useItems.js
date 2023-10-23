import { computed, reactive } from 'vue';
import itemData from './item_data.json';
import { EFFECT_TYPE_DATA, ITEM_RARITY_DATA, ITEM_TYPE_DATA } from '@/models/useConstants';

const ITEM_TYPE_FILTERS_ID_LIST = [
  'wand',
  'sword',
  'dagger',
  'staff',
  'hammer',
  'clockHand',
  'cards',
  'bow',
  'shovel',
  'twoHandedSword',
  'twoHandedAxe',
  'twoHandedStaff',
  'shield',
  'helmet',
  'amulet',
  'breastplate',
  'epaulettes',
  'belt',
  'ring',
  'boots',
  'cloak',
  'tool',
  'emblem',
  'pets',
  'mounts',
  'torches',
  'costumes',
  'sublimationScroll',
  'enchantement',
];

const itemFilters = reactive({
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
  itemTypeFilters: ITEM_TYPE_DATA.filter((entry) => {
    return ITEM_TYPE_FILTERS_ID_LIST.includes(entry.id);
  }).map((itemTypeEntry) => {
    return {
      ...itemTypeEntry,
      checked: true,
    };
  }),
  resetFilters() {
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
    this.itemTypeFilters = ITEM_TYPE_DATA.filter((entry) => {
      return ITEM_TYPE_FILTERS_ID_LIST.includes(entry.id);
    }).map((itemTypeEntry) => {
      return {
        ...itemTypeEntry,
        checked: true,
      };
    });
  },
});

export const useItems = () => {
  const setup = () => {
    const currentItemList = computed(() => {
      return getFilteredItems();
    });

    return {
      currentItemList,
    };
  };

  const getFilteredItems = () => {
    // Filter Logic
    // (itemType OR itemType OR ...) AND (level range check) AND (itemMod AND itemMod AND ...) AND (rarity OR rarity OR ...)

    let filteredItems = itemData.filter((item) => {
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

  const getNumTotalItems = () => {
    return itemData.length;
  };

  return {
    setup,
    itemFilters,
    getFilteredItems,
    getNumTotalItems,
  };
};
