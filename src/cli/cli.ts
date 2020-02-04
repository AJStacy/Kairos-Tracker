import * as program from 'commander';

import kairos from '../index';

export const cli = (version: string):void => {
  program.version(version);
  program
    .command('start <label>')
    .option('-m, --message', 'Add a message to your time interval.')
    .action((label: string, cmd: any) => kairos.start(label, cmd.message));

  program
    .command('stop <label>')
    .action((label: string) => kairos.stop(label));

  program
    .command('list [period]')
    .action((period) => kairos.list(period));

  program.parse(process.argv);
};
