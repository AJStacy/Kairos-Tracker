import logs from './logs';
import {
  timestamp,
  newInterval,
  writeLabeledInterval,
  writeUnlabeledInterval,
  getIntervalById,
} from './interval/interval';

const start = (label?: string, message?: string):void => {
  const interval = newInterval(message);
  if (label) {
    writeLabeledInterval(label, interval);
  } else {
    logs.info('The new time interval ID: ', writeUnlabeledInterval(interval));
  }
};

const stop = (id: string|number):void => {
  try {
    const interval = getIntervalById(id);
    interval.end = timestamp();
  } catch (e) {
    logs.error(e);
  }
};

export {
  start,
  stop,
};
