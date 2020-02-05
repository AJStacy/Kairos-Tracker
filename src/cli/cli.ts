import * as program from 'commander';

import kairos from '../index';

export const cli = (version: string):void => {
  program.version(version);
  program
    .command('start [label]')
    .option('-m, --message <message>', 'Add a message to your time interval.')
    .action((label: string, cmd: { message: string; }) => kairos.start(label, cmd.message));

  program
    .command('stop <id>')
    .action((id: string) => kairos.stop(id));

  program
    .command('list [id]')
    .action((id) => kairos.list(id));

  program
    .command('project <name>')
    .action((name) => kairos.project(name));

  program.parse(process.argv);
};
