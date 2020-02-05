import chalk from 'chalk';
import { formatISO, parseISO, formatDistanceStrict } from 'date-fns';
import * as shortid from 'shortid';
import { prompt } from 'enquirer';
import { Interval, Intervals } from '../_contracts';
import { writeInterval } from './crud';

const timestamp = ():string => {
  const time = new Date();
  return formatISO(time, { format: 'basic' });
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
}

export {
  timestamp,
  listIntervals,
  newInterval,
  writeUnlabeledInterval,
  confirmLabel,
};
