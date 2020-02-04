"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logs_1 = require("./logs");
const interval_1 = require("./interval/interval");
const start = (label, message) => {
    const interval = interval_1.newInterval(message);
    console.log("INTERVAL", interval);
    if (label) {
        interval_1.writeLabeledInterval(label, interval);
    }
    else {
        logs_1.default.info('The new time interval ID: ', interval_1.writeUnlabeledInterval(interval));
    }
};
exports.start = start;
const stop = (id) => {
    try {
        interval_1.updateInterval(id, { end: interval_1.timestamp() });
    }
    catch (e) {
        logs_1.default.error(e);
    }
};
exports.stop = stop;
const list = (period) => {
    try {
        logs_1.default.table(interval_1.listIntervals());
    }
    catch (e) {
        logs_1.default.error(e);
    }
};
exports.list = list;
