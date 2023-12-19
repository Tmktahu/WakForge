let EFFECT_TYPE_DATA = null;

const filterItems = (items, params) => {
  // Filter Logic
  // (itemType OR itemType OR ...) AND (level range check) AND (itemMod AND itemMod AND ...) AND (rarity OR rarity OR ...)

  let sortedItemData = handleSortingLogic(items, params);

  let filteredItems = sortedItemData.filter((item) => {
    return (
      // hasSearchTerm(item, params) &&
      isWithinLevelRange(item, params) && matchesEffectFilters(item, params) && matchesRarityFilters(item, params) && matchesItemTypeFilters(item, params)
    );
  });

  returnResults(filteredItems);
};

const handleSortingLogic = (items, params) => {
  // first copy the original data incase the sort is 'none'
  let initialData = structuredClone(items);

  for (let sortSettingIndex in params.sortingParams) {
    let targetSortBy = params.sortingParams[sortSettingIndex].sortBy;
    let targetSortOrder = params.sortingParams[sortSettingIndex].sortOrder;

    // if the sortBy is none, don't sort
    if (targetSortBy.id === 'none') {
      continue;
    }

    initialData = initialData.sort((itemA, itemB) => {
      return sortComparisonFunction(itemA, itemB, targetSortBy, targetSortOrder);
    });
  }

  // otherwise we want to do a sort
  return initialData;
};

const sortComparisonFunction = (itemA, itemB, targetSortBy, targetSortOrder) => {
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

const hasSearchTerm = (item, params) => {
  return params.translatedItemName.toLowerCase().includes(params.searchTerm.toLowerCase());
  // return t(`items.${item.id}`).toLowerCase().includes(params.searchTerm.toLowerCase());
};

const isWithinLevelRange = (item, params) => {
  return params.startLevel <= item.level && item.level <= params.endLevel;
};

const matchesEffectFilters = (item, params) => {
  if (params.effectFilters.length === 0) {
    return true;
  }

  if (item.equipEffects?.length === undefined || item.equipEffects.length === 0) {
    return false;
  }

  // we assume the item is valid. innocent until proven guilty. now onto the gauntlet
  let validItem = true;

  // First we need to iterate over each filter
  params.effectFilters.some((filter) => {
    // we get the target filter's data from our constants so we can translate to the raw ID
    let targetFilterEffectData = EFFECT_TYPE_DATA[filter.type.value];

    // Then we iterate over each of the item's effects
    let hadEffect = false;
    item.equipEffects.some((itemEffect) => {
      // if the item has the effect, then we need to check it against our filters
      if (targetFilterEffectData.rawIds.includes(itemEffect.id)) {
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

const matchesRarityFilters = (item, params) => {
  let itemRarity = item.rarity;
  let validItem = false; // we assume false because if one rarity matches, we want it

  params.rarityFilters.some((rarityEntry) => {
    if (rarityEntry.checked && rarityEntry.id === itemRarity) {
      validItem = true;
      return true;
    }

    return false;
  });

  return validItem;
};

const matchesItemTypeFilters = (item, params) => {
  if (params.itemTypeFilters.length === 0) {
    return true;
  }

  let itemTypeRawId = item.type.id;
  let validItem = false; // we assume false because if one type matches, we want it

  params.itemTypeFilters.some((itemTypeEntry) => {
    if (itemTypeEntry.checked && itemTypeEntry.rawId === itemTypeRawId) {
      validItem = true;
      return true;
    }

    return false;
  });

  return validItem;
};

const returnResults = (items) => {
  postMessage({ items, error: null });
};

onmessage = async (event) => {
  let params = event.data.params;
  let items = event.data.itemData;
  EFFECT_TYPE_DATA = event.data.EFFECT_TYPE_DATA;
  filterItems(items, params);
};
