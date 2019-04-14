export declare type Interval = {
    start: string;
    end?: string;
    message?: string;
};
declare const timestamp: () => string;
declare const newInterval: (message?: string | undefined) => Interval;
declare const getInterval: (id: string) => Interval;
declare const updateInterval: (id: string, changes: object) => void;
declare const deleteInterval: (id: string) => boolean;
declare const listIntervals: () => any[][];
declare const writeLabeledInterval: (label: string, interval: Interval) => void;
declare const writeUnlabeledInterval: (interval: Interval) => string;
export { timestamp, listIntervals, newInterval, getInterval, updateInterval, deleteInterval, writeLabeledInterval, writeUnlabeledInterval, };
