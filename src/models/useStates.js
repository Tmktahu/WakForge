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
      let item = currentCharacter.value.equipment[slotKey].item;

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
      if (item && item.sub && item.sub.equipEffects) {
        for (let effectIndex in item.sub.equipEffects) {
          if (item.sub.equipEffects[effectIndex].id === 304) {
            let stateId = item.sub.equipEffects[effectIndex].values[0];
            let state = getStateById(stateId);
            let numLevels = item.sub.equipEffects[effectIndex].values[2];

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
