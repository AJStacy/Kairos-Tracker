"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const config = require("../package.json");
const cli = () => {
    program
        .version(config.version)
        .command('start [label]')
        .action((label, cmd) => {
    });
};
exports.default = cli;
