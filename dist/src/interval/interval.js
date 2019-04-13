"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTime = require("date-fns/get_time");
const formatTime = require("date-fns/format");
const lodash_1 = require("lodash");
const db_1 = require("../db");
const timestamp = () => {
    const time = new Date(getTime(new Date()));
    return formatTime(time, 'YYYY-MM-DD HH:MM:ss.SSSZZ');
};
exports.timestamp = timestamp;
const newInterval = (message) => (Object.assign({ start: timestamp() }, message && { message }));
exports.newInterval = newInterval;
const writeLabeledInterval = (lbl, interval) => {
    db_1.default.set(`intervals.labeled.${lbl}`, interval);
};
exports.writeLabeledInterval = writeLabeledInterval;
const getLabeledInterval = (lbl) => db_1.default.get(`intervals.labeled.${lbl}`).value();
exports.getLabeledInterval = getLabeledInterval;
const writeUnlabeledInterval = (interval) => (db_1.default.get('intervals.unlabeled').push(interval).write().id);
exports.writeUnlabeledInterval = writeUnlabeledInterval;
const getUnlabeledInterval = (i) => db_1.default.get(`intervals.unlabeled[${i}]`).value();
exports.getUnlabeledInterval = getUnlabeledInterval;
const getIntervalById = (id) => {
    if (!id) {
        throw Error('The provided ID is invalid.');
    }
    return lodash_1.isString(id) ? getLabeledInterval(id) : getUnlabeledInterval(id);
};
exports.getIntervalById = getIntervalById;
