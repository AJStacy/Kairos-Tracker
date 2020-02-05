"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const writeInterval = (id, interval) => {
    return db_1.default.set(`intervals.${id}`, interval).write();
};
exports.writeInterval = writeInterval;
const getIntervals = () => db_1.default.get('intervals').value();
exports.getIntervals = getIntervals;
const getInterval = (id) => getIntervals()[id];
exports.getInterval = getInterval;
const updateInterval = (id, changes) => (db_1.default.get(`intervals.${id}`).assign(Object.assign({}, changes)).write());
exports.updateInterval = updateInterval;
const deleteInterval = (id) => db_1.default.unset(`intervals.${id}`).write();
exports.deleteInterval = deleteInterval;
