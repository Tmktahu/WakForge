import { watch } from 'vue';
import { debounce } from 'lodash';
import { CLASS_CONSTANTS } from '@/models/useConstants';

import stateDate from '@/models/state_data.json';

export const useStates = () => {
  const setup = () => {};

  const getStateById = (stateId) => {
    return stateDate.find((state) => parseInt(state.id) === stateId);
  };

  const getStatesFromCharacter = (currentCharacter) => {
    // so we need to pull all the states from the various locations along with their levels
    let states = {};

    // items
    Object.keys(currentCharacter.value.equipment).forEach((slotKey) => {
      let item = currentCharacter.value.equipment[slotKey];

      // item effects
      if (item && item.equipEffects) {
        for (let effectIndex in item.equipEffects) {
          if (item.equipEffects[effectIndex].id === 304) {
            let stateId = item.equipEffects[effectIndex].values[0];
            let state = getStateById(stateId);
            let numLevels = item.equipEffects[effectIndex].values[2];

            if (states[stateId] === undefined) {
              states[stateId] = {
                level: 0,
                state: state,
              };
            }

            states[stateId].level += numLevels;
          }
        }
      }

      // sublimations
      if (item && item.subSlot && item.subSlot.equipEffects) {
        for (let effectIndex in item.subSlot.equipEffects) {
          if (item.subSlot.equipEffects[effectIndex].id === 304) {
            let stateId = item.subSlot.equipEffects[effectIndex].values[0];
            let state = getStateById(stateId);
            let numLevels = item.subSlot.equipEffects[effectIndex].values[2];

            if (states[stateId] === undefined) {
              states[stateId] = {
                level: 0,
                state: state,
              };
            }

            states[stateId].level += numLevels;
          }
        }
      }
    });

    // TODO spells

    return states;
  };

  return {
    setup,
    getStatesFromCharacter,
  };
};
