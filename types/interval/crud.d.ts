import { Interval, Intervals } from '../_contracts';
declare const writeInterval: (id: string, interval: Interval) => Interval;
declare const getIntervals: () => Intervals;
declare const getInterval: (id: string) => Interval;
declare const updateInterval: (id: string, changes: object) => void;
declare const deleteInterval: (id: string) => boolean;
export { writeInterval, getIntervals, getInterval, updateInterval, deleteInterval, };
