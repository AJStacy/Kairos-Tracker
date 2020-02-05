import { Interval, Intervals } from '../_contracts';
import db from '../db';

const writeInterval = (id: string, interval: Interval):Interval => {
  return db.set(`intervals.${id}`, interval).write();
}

const getIntervals = ():Intervals => db.get('intervals').value();

const getInterval = (id: string):Interval => getIntervals()[id];

const updateInterval = (id: string, changes: object):void => (
  db.get(`intervals.${id}`).assign({ ...changes }).write()
);

const deleteInterval = (id: string):boolean => db.unset(`intervals.${id}`).write();

export {
  writeInterval,
  getIntervals,
  getInterval,
  updateInterval,
  deleteInterval,
};