"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const getTime = require("date-fns/get_time");
const formatTime = require("date-fns/format");
const Logs_1 = require("./Logs");
// Setup the database
const adapter = new FileSync(`${os.homedir()}/.kairos/db.json`);
const db = lowdb(adapter);
// Sets the db defaults
db.defaults({
    user: {
        name: null,
        password: null,
        sync: false,
    },
    intervals: {
        labeled: {},
        unlabeled: [],
    },
}).write();
const timestamp = () => {
    const time = new Date(getTime(new Date()));
    return formatTime(time, 'YYYY-MM-DD HH:MM:ss.SSSZZ');
};
const newInterval = (message) => (Object.assign({ start: timestamp() }, message && { message }));
const writeLabeledInterval = (lbl, interval) => {
    db.set(`intervals.labeled.${lbl}`, interval);
};
const writeUnlabeledInterval = (interval) => (db.get('intervals.unlabeled').push(interval).write().id);
const start = (label, message) => {
    const interval = newInterval(message);
    if (label) {
        writeLabeledInterval(label, interval);
    }
    else {
        Logs_1.info('The new time interval ID: ', writeUnlabeledInterval(interval));
    }
};
exports.start = start;
const stop = (label) => {
};
exports.stop = stop;
