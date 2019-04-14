import * as chalk from 'chalk';
import { table as Table } from 'table';

const report = (method: string, msg: string, args: any[]):void => {
  console[<'debug'|'log'|'info'|'warn'|'error'>method](msg, ...args);
};

const debug = (msg: any, ...args: any[]):void => {
  report('debug', msg, args);
};

const log = (msg: any, ...args: any[]):void => {
  report('log', msg, args);
};

const info = (msg: any, ...args: any[]):void => {
  report('info', msg, args);
};

const warn = (msg: any, ...args: any[]):void => {
  report('warn', msg, args);
};

const error = (msg: any, ...args: any[]):void => {
  report('error', msg, args);
};

const table = (data: any[], cfg?: any):void => {
  console.log(Table(data, cfg));
};

export {
  debug,
  log,
  info,
  warn,
  error,
  table,
};
