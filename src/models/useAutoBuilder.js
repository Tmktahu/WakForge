import itemData from './item_data.json';

export const useAutoBuilder = () => {
  // so how the fuck is this going to work

  // we are given
  //   class (no impact)
  //   level
  //   1 prefered stat

  let selectedEquipment = {};
  let targetlevel = 1; // TODO need to also filter by level
  let targetEffect = {};

  // for each item
  itemData.forEach((currentItem) => {
    // check if the item has the target stat by looping over the item's effects
    let hasStat = false;
    let currentItemEffect = null;
    currentItem.equipEffects.some((effect) => {
      if (effect.id === targetEffect.rawId) {
        currentItemEffect = effect;
        hasStat = true;
        return true;
      }
    });

    // if the item has the target stat
    if (hasStat) {
      // check the slots the item could go in
      let validSlots = currentItem.type.validSlots;
      for (const index in validSlots) {
        let slottedItem = selectedEquipment[validSlots[index]];
        if (slottedItem === null) {
          // the slot is open, assign the item
          selectedEquipment[validSlots[index]] = currentItem;
        } else {
          // something is already in that slot
          // we need to compare the slotted item to the current item
          let slottedEffect = slottedItem.equipEffects.find((effect) => {
            return effect.id === targetEffect.rawId;
          });

          // now we do the actual comparing.
          if (slottedEffect.valus[0] < currentItemEffect.value) {
            // the slotted item is worse, swap it out
            selectedEquipment[validSlots[index]] = currentItem;
          }
        }
      }
    }
  });

  return {};
};
