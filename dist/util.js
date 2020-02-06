"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
exports.timestamp = () => {
    const time = new Date();
    return date_fns_1.formatISO(time, { format: 'basic' });
};
