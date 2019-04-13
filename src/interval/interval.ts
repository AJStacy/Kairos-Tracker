import * as getTime from 'date-fns/get_time';
import * as formatTime from 'date-fns/format';
import { isString } from 'lodash';

import db from '../db';

export type Interval = {
  start: string;
  end?: string;
  message?: string;
};

const timestamp = ():string => {
  const time = new Date(getTime(new Date()));
  return formatTime(time, 'YYYY-MM-DD HH:MM:ss.SSSZZ');
};

const newInterval = (message?: string) => ({
  start: timestamp(),
  ...message && { message },
});

const writeLabeledInterval = (lbl: string, interval: Interval):void => {
  db.set(`intervals.labeled.${lbl}`, interval);
};

const getLabeledInterval = (lbl: string):Interval => db.get(`intervals.labeled.${lbl}`).value();

const writeUnlabeledInterval = (interval: Interval):number => (
  db.get('intervals.unlabeled').push(interval).write().id
);

const getUnlabeledInterval = (i: number):Interval => db.get(`intervals.unlabeled[${i}]`).value();

const getIntervalById = (id: string|number):Interval => {
  if (!id) { throw Error('The provided ID is invalid.'); }
  return isString(id) ? getLabeledInterval(id) : getUnlabeledInterval(id);
};

export {
  timestamp,
  newInterval,
  writeLabeledInterval,
  getLabeledInterval,
  writeUnlabeledInterval,
  getUnlabeledInterval,
  getIntervalById,
};
