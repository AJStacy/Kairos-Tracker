import logs from './logs';
import {
  timestamp,
  newInterval,
  listIntervals,
  updateInterval,
  writeLabeledInterval,
  writeUnlabeledInterval,
} from './interval/interval';

const start = (label: string, message?: string):void => {
  const interval = newInterval(message);
  console.log("INTERVAL", interval);
  if (label) {
    writeLabeledInterval(label, interval);
  } else {
    logs.info('The new time interval ID: ', writeUnlabeledInterval(interval));
  }
};

const stop = (id: string):void => {
  try {
    updateInterval(id, { end: timestamp() });
  } catch (e) {
    logs.error(e);
  }
};

const list = (period?: string):void => {
  try {
    logs.table(
      listIntervals()
    );
  } catch (e) {
    logs.error(e);
  }
};

export {
  start,
  stop,
  list,
};
