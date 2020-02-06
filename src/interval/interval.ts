import chalk from 'chalk';
import { parseISO, formatDistanceStrict } from 'date-fns';
import * as shortid from 'shortid';
import { prompt } from 'enquirer';
import { Interval, Intervals } from '../_contracts';
import { timestamp } from '../util';
import db from '../db';
import logs from '../logs';
import {
  writeInterval,
  updateInterval,
} from './crud';

export const start = async (label?: string, message?: string):Promise<void> => {
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

export const stop = (id: string):void => {
  try {
    updateInterval(id, { end: timestamp() });
  } catch (e) {
    logs.error(e);
  }
};

export const list = (id?: string):void => {
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

const newInterval = (message: string = ''):Interval => ({
  start: timestamp(),
  end: '',
  message,
});

const listIntervals = (intervals: Intervals):Array<any[]> => {
  const table = Object.keys(intervals).map(label => [
    label,
    timeEllapsed(intervals[label].start, intervals[label].end),
    `${intervals[label].start}${intervals[label].end ? '\n': ''}${intervals[label].end}`,
    intervals[label].message,
  ]);
  table.unshift([
    chalk.inverse(' ID / Label '),
    chalk.inverse(' Ellapsed '),
    chalk.inverse(' Start Time & End time '),
    chalk.inverse(' Message '),
  ]);
  return table;
};

const timeEllapsed = (start: string, end: string):string => {
  if (start && end) {
    return formatDistanceStrict(parseISO(end), parseISO(start)); 
  }
  return '';
}

const writeUnlabeledInterval = (interval: Interval):string => {
  const id = shortid.generate();
  writeInterval(id, interval);
  return id;
};

const confirmLabel = async (interval: Interval):Promise<boolean> => {
  if (interval) {
    const response: { confirmation: boolean } = await prompt({
      type: 'confirm',
      name: 'confirmation',
      message: 'Label already exists. Would you like to overwrite it?',
    });
    return response.confirmation;
  }
  return true;
};
