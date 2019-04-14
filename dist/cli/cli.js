"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const index_1 = require("../index");
exports.cli = (version) => {
    program.version(version);
    program
        .command('start [label]')
        .option('-m, --message', 'Add a message to your time interval.')
        .action((label, cmd) => index_1.default.start(label, cmd.message));
    program
        .command('stop <id>')
        .action((id) => index_1.default.stop(id));
    program
        .command('list [period]')
        .action((period) => index_1.default.list(period));
    program.parse(process.argv);
};
