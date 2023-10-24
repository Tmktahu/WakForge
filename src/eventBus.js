import mitt from 'mitt';
export const EventBus = mitt();

export const Events = {
  SAVE_DATA: 'saveData',
  UPDATE_STATS: 'updateStats',
  OPEN_OLD_DATA_DIALOG: 'openOldDataDialog',
};
