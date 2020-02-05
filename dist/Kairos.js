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
const logs_1 = require("./logs");
const interval_1 = require("./interval");
const db_1 = require("./db");
const start = (label, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const interval = interval_1.newInterval(message);
        if (label && interval_1.confirmLabel(db_1.default.get(`intervals.${label}`).value())) {
            interval_1.writeInterval(label, interval);
        }
        if (label === undefined) {
            logs_1.default.info('Your new timer ID: ', interval_1.writeUnlabeledInterval(interval));
        }
    }
    catch (e) {
        logs_1.default.error(e);
    }
});
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
const list = (id) => {
    try {
        const query = db_1.default.get(id ? `intervals.${id}` : 'intervals').value();
        logs_1.default.table(Object.keys(query).length > 1
            ? interval_1.listIntervals(query)
            : interval_1.listIntervals({ [(id !== null && id !== void 0 ? id : 'missing')]: query }));
    }
    catch (e) {
        logs_1.default.error(e);
    }
};
exports.list = list;
const project = (name) => {
    try {
        console.log("THE NAME FOR YOUR PROJECT", name);
    }
    catch (e) {
        logs_1.default.error(e);
    }
};
exports.project = project;
