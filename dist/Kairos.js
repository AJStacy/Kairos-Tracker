"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logs_1 = require("./logs");
const interval_1 = require("./interval/interval");
const start = (label, message) => {
    const interval = interval_1.newInterval(message);
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
        const interval = interval_1.getIntervalById(id);
        interval.end = interval_1.timestamp();
    }
    catch (e) {
        logs_1.default.error(e);
    }
};
exports.stop = stop;
