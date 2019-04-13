import * as chalk from 'chalk';

const report = (method: string, msg: string, args: any[]):void => {
  console[<'debug'|'log'|'info'|'warn'|'error'>method](msg, ...args);
};

const debug = (msg: string, ...args: any[]) => {
  report('debug', msg, args);
};

const log = (msg: string, ...args: any[]) => {
  report('log', msg, args);
};

const info = (msg: string, ...args: any[]) => {
  report('info', msg, args);
};

const warn = (msg: string, ...args: any[]) => {
  report('warn', msg, args);
};

const error = (msg: string, ...args: any[]) => {
  report('error', msg, args);
};

export {
  debug,
  log,
  info,
  warn,
  error,
};
