import * as program from 'commander';
import { start, stop, list } from './interval';
import { project } from './project';

export const cli = (version: string):void => {
  program.version(version);
  program
    .command('start [label]')
    .option('-m, --message <message>', 'Add a message to your time interval.')
    .action((label: string, cmd: { message: string; }) => start(label, cmd.message));

  program
    .command('stop <id>')
    .action((id: string) => stop(id));

  program
    .command('list [id]')
    .action((id) => list(id));

  program
    .command('project <name>')
    .action((name) => project(name));

  program.parse(process.argv);
};
