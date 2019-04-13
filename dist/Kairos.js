"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const db = lowdb(FileSync);
console.log(db);
const start = (label) => {
};
const stop = (label) => {
};
