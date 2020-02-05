import { Interval, Intervals } from '../_contracts';
declare const timestamp: () => string;
declare const newInterval: (message?: string) => Interval;
declare const listIntervals: (intervals: Intervals) => any[][];
declare const writeUnlabeledInterval: (interval: Interval) => string;
declare const confirmLabel: (interval: Interval) => Promise<boolean>;
export { timestamp, listIntervals, newInterval, writeUnlabeledInterval, confirmLabel, };
