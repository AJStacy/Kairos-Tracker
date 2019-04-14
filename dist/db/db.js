"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const fs = require("fs");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
// Setup the database
const base = `${os.homedir()}/.kairos`;
if (!fs.existsSync(base)) {
    fs.mkdirSync(base);
}
const adapter = new FileSync(`${base}/db.json`);
const db = lowdb(adapter);
// Sets the db defaults
db.defaults({
    user: {
        name: null,
        password: null,
        sync: false,
    },
    cache: {
        recent: null,
    },
    intervals: {},
}).write();
exports.default = db;
