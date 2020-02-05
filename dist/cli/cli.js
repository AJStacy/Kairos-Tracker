"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const index_1 = require("../index");
exports.cli = (version) => {
    program.version(version);
    program
        .command('start [label]')
        .option('-m, --message <message>', 'Add a message to your time interval.')
        .action((label, cmd) => index_1.default.start(label, cmd.message));
    program
        .command('stop <id>')
        .action((id) => index_1.default.stop(id));
    program
        .command('list [id]')
        .action((id) => index_1.default.list(id));
    program
        .command('project <name>')
        .action((name) => index_1.default.project(name));
    program.parse(process.argv);
};
