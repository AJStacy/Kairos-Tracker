"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const util_1 = require("../util");
exports.getProjects = db_1.default.get('projects').value();
exports.getProject = (name) => db_1.default.get(`projects.${name}`).value();
exports.projectExists = (name) => db_1.default.has(`projects.${name}`).value();
exports.createProject = (name, message) => (db_1.default.get('projects').push({ created: util_1.timestamp(), message }).write());
exports.updateProject = (name, message) => {
    db_1.default.set(`projects.${name}`, Object.assign(Object.assign({}, db_1.default.get(`projects.${name}`).value()), { message })).write();
};
exports.deleteProject = (name) => {
    db_1.default.unset(`projects.${name}`).write();
};
