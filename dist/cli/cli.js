"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const index_1 = require("../index");
const cli = (version) => {
    program.version(version);
    program
        .command('start [label]')
        .option('-m, --message', 'Add a message to your time interval.')
        .action((label, cmd) => index_1.default.start(label, cmd.message));
    program
        .command('stop <id>')
        .action((id) => index_1.default.stop(id));
    program.parse(process.argv);
};
exports.default = cli;
