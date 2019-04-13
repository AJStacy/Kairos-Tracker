"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const report = (method, msg, args) => {
    console[method](msg, ...args);
};
const debug = (msg, ...args) => {
    report('debug', msg, args);
};
exports.debug = debug;
const log = (msg, ...args) => {
    report('log', msg, args);
};
exports.log = log;
const info = (msg, ...args) => {
    report('info', msg, args);
};
exports.info = info;
const warn = (msg, ...args) => {
    report('warn', msg, args);
};
exports.warn = warn;
const error = (msg, ...args) => {
    report('error', msg, args);
};
exports.error = error;
