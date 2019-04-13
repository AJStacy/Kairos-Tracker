export declare type Interval = {
    start: string;
    end?: string;
    message?: string;
};
declare const timestamp: () => string;
declare const newInterval: (message?: string | undefined) => {
    start: string;
} | {
    start: string;
} | {
    message: string;
    start: string;
};
declare const writeLabeledInterval: (lbl: string, interval: Interval) => void;
declare const getLabeledInterval: (lbl: string) => Interval;
declare const writeUnlabeledInterval: (interval: Interval) => number;
declare const getUnlabeledInterval: (i: number) => Interval;
declare const getIntervalById: (id: string | number) => Interval;
export { timestamp, newInterval, writeLabeledInterval, getLabeledInterval, writeUnlabeledInterval, getUnlabeledInterval, getIntervalById, };
