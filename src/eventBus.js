import mitt from 'mitt';
export const EventBus = mitt();

export const Events = {
  SAVE_DATA: 'saveData',
};
