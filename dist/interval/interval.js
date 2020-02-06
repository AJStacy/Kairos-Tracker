"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const date_fns_1 = require("date-fns");
const shortid = require("shortid");
const enquirer_1 = require("enquirer");
const util_1 = require("../util");
const db_1 = require("../db");
const logs_1 = require("../logs");
const crud_1 = require("./crud");
exports.start = (label, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interval = newInterval(message);
        if (label && confirmLabel(db_1.default.get(`intervals.${label}`).value())) {
            crud_1.writeInterval(label, interval);
        }
        if (label === undefined) {
            logs_1.default.info('Your new timer ID: ', writeUnlabeledInterval(interval));
        }
    }
    catch (e) {
        logs_1.default.error(e);
    }
});
exports.stop = (id) => {
    try {
        crud_1.updateInterval(id, { end: util_1.timestamp() });
    }
    catch (e) {
        logs_1.default.error(e);
    }
};
exports.list = (id) => {
    try {
        const query = db_1.default.get(id ? `intervals.${id}` : 'intervals').value();
        logs_1.default.table(Object.keys(query).length > 1
            ? listIntervals(query)
            : listIntervals({ [(id !== null && id !== void 0 ? id : 'missing')]: query }));
    }
    catch (e) {
        logs_1.default.error(e);
    }
};
const newInterval = (message = '') => ({
    start: util_1.timestamp(),
    end: '',
    message,
});
const listIntervals = (intervals) => {
    const table = Object.keys(intervals).map(label => [
        label,
        timeEllapsed(intervals[label].start, intervals[label].end),
        `${intervals[label].start}${intervals[label].end ? '\n' : ''}${intervals[label].end}`,
        intervals[label].message,
    ]);
    table.unshift([
        chalk_1.default.inverse(' ID / Label '),
        chalk_1.default.inverse(' Ellapsed '),
        chalk_1.default.inverse(' Start Time & End time '),
        chalk_1.default.inverse(' Message '),
    ]);
    return table;
};
const timeEllapsed = (start, end) => {
    if (start && end) {
        return date_fns_1.formatDistanceStrict(date_fns_1.parseISO(end), date_fns_1.parseISO(start));
    }
    return '';
};
const writeUnlabeledInterval = (interval) => {
    const id = shortid.generate();
    crud_1.writeInterval(id, interval);
    return id;
};
const confirmLabel = (interval) => __awaiter(void 0, void 0, void 0, function* () {
    if (interval) {
        const response = yield enquirer_1.prompt({
            type: 'confirm',
            name: 'confirmation',
            message: 'Label already exists. Would you like to overwrite it?',
        });
        return response.confirmation;
    }
    return true;
});
