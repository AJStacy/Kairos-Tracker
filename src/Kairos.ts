import logs from './logs';
import {
  timestamp,
  newInterval,
  listIntervals,
  updateInterval,
  writeUnlabeledInterval,
  writeInterval,
  confirmLabel,
} from './interval';
import db from './db';

const start = async (label?: string, message?: string):Promise<void> => {
  try {
    const interval = newInterval(message);
    if (label && confirmLabel(db.get(`intervals.${label}`).value())) {
      writeInterval(label, interval);
    }
    if (label === undefined) {
      logs.info('Your new timer ID: ', writeUnlabeledInterval(interval));
    }
  } catch (e) {
    logs.error(e);
  }
};

const stop = (id: string):void => {
  try {
    updateInterval(id, { end: timestamp() });
  } catch (e) {
    logs.error(e);
  }
};

const list = (id?: string):void => {
  try {
    const query = db.get(id ? `intervals.${id}` : 'intervals').value();
    logs.table(
      Object.keys(query).length > 1 
      ? listIntervals(query) 
      : listIntervals({ [id ?? 'missing']: query })
    );
  } catch (e) {
    logs.error(e);
  }
};

const project = (name: string):void => {
  try {
    console.log("THE NAME FOR YOUR PROJECT", name);
  } catch (e) {
    logs.error(e);
  }
};

export {
  start,
  stop,
  list,
  project,
};
