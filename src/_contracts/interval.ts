export interface Interval {
  start: string;
  end: string;
  message: string;
}

export interface Intervals {
  [label: string]: Interval;
}