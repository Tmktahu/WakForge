import { computed, reactive } from 'vue';
import itemData from './item_data.json';

const itemFilters = reactive({
  searchTerm: '',
  startLevel: 0,
  endLevel: 230,
  resetFilters: () => {
    this.searchTerm = '';
    this.startLevel = 0;
    this.endLevel = 230;
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
      return hasSearchTerm(item) && isWithinLevelRange(item);
    });

    return filteredItems;
  };

  const hasSearchTerm = (item) => {
    return item.name.toLowerCase().includes(itemFilters.searchTerm.toLowerCase());
  };

  const isWithinLevelRange = (item) => {
    return itemFilters.startLevel <= item.level && item.level <= itemFilters.endLevel;
  };

  return {
    setup,
    itemFilters,
    getFilteredItems,
  };
};
