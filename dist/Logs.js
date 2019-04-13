"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const report = (method, msg, args) => {
    console[method](msg, ...args);
};
const log = (msg, ...args) => {
    report('log', msg, args);
};
exports.log = log;
const info = (msg, ...args) => {
    report('info', msg, args);
};
exports.info = info;
