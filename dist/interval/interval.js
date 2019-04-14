"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const getTime = require("date-fns/get_time");
const formatTime = require("date-fns/format");
const shortid = require("shortid");
const db_1 = require("../db");
const timestamp = () => {
    const time = new Date(getTime(new Date()));
    return formatTime(time, 'YYYY-MM-DD HH:MM:ss.SSSZZ');
};
exports.timestamp = timestamp;
const newInterval = (message) => (Object.assign({ start: timestamp() }, message && { message }));
exports.newInterval = newInterval;
const writeInterval = (id, interval) => (db_1.default.set(`intervals.${id}`, interval).write());
const getInterval = (id) => db_1.default.get(`intervals.${id}`).value();
exports.getInterval = getInterval;
const updateInterval = (id, changes) => (db_1.default.get(`intervals.${id}`).assign(Object.assign({}, changes)).write());
exports.updateInterval = updateInterval;
const deleteInterval = (id) => db_1.default.unset(`intervals.${id}`).write();
exports.deleteInterval = deleteInterval;
const listIntervals = () => {
    const intervals = db_1.default.get('intervals').value();
    const table = Object.keys(intervals).map(id => [id, ...Object.values(intervals[id])]);
    table.unshift([
        chalk_1.default.inverse(' ID '),
        chalk_1.default.inverse(' Start Time '),
        chalk_1.default.inverse(' End Time '),
    ]);
    return table;
};
exports.listIntervals = listIntervals;
const writeLabeledInterval = (label, interval) => {
    writeInterval(label, interval);
};
exports.writeLabeledInterval = writeLabeledInterval;
const writeUnlabeledInterval = (interval) => {
    const id = shortid.generate();
    writeInterval(id, interval);
    return id;
};
exports.writeUnlabeledInterval = writeUnlabeledInterval;
