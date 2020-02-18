"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const interval_1 = require("../interval");
const project_1 = require("../project");
exports.cli = (version) => {
    program.version(version);
    program
        .command('start [label]')
        .option('-m, --message <message>', 'Add a message to your time interval.')
        .action((label, cmd) => interval_1.start(label, cmd.message));
    program
        .command('stop <id>')
        .action((id) => interval_1.stop(id));
    program
        .command('list [id]')
        .action((id) => interval_1.list(id));
    program
        .command('project <name>')
        .action((name) => project_1.project(name));
    program.parse(process.argv);
};
