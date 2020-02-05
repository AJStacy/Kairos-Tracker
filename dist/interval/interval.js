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
const crud_1 = require("./crud");
const timestamp = () => {
    const time = new Date();
    return date_fns_1.formatISO(time, { format: 'basic' });
};
exports.timestamp = timestamp;
const newInterval = (message = '') => ({
    start: timestamp(),
    end: '',
    message,
});
exports.newInterval = newInterval;
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
exports.listIntervals = listIntervals;
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
exports.writeUnlabeledInterval = writeUnlabeledInterval;
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
exports.confirmLabel = confirmLabel;
