import chalk from 'chalk';
import * as getTime from 'date-fns/get_time';
import * as formatTime from 'date-fns/format';
import * as shortid from 'shortid';

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

const newInterval = (message?: string):Interval => ({
  start: timestamp(),
  ...message && { message },
});

const writeInterval = (id: string, interval: Interval):Interval => (
  db.set(`intervals.${id}`, interval).write()
);

const getInterval = (id: string):Interval => db.get(`intervals.${id}`).value();

const updateInterval = (id: string, changes: object):void => (
  db.get(`intervals.${id}`).assign({ ...changes }).write()
);

const deleteInterval = (id: string):boolean => db.unset(`intervals.${id}`).write();

const listIntervals = ():any[][] => {
  const intervals = db.get('intervals').value();
  const table = Object.keys(intervals).map(id => [id, ...Object.values(intervals[id])]);
  table.unshift([
    chalk.inverse(' ID '),
    chalk.inverse(' Start Time '),
    chalk.inverse(' End Time '),
  ]);
  return table;
};

const writeLabeledInterval = (label: string, interval: Interval):void => {
  writeInterval(label, interval);
};

const writeUnlabeledInterval = (interval: Interval):string => {
  const id = shortid.generate();
  writeInterval(id, interval);
  return id;
};

export {
  timestamp,
  listIntervals,
  newInterval,
  getInterval,
  updateInterval,
  deleteInterval,
  writeLabeledInterval,
  writeUnlabeledInterval,
};
