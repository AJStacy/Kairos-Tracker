"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
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
exports.default = db;
