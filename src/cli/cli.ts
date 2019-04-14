import * as program from 'commander';

import kairos from '../index';

const cli = (version: string):void => {
  program.version(version);
  program
    .command('start [label]')
    .option('-m, --message', 'Add a message to your time interval.')
    .action((label: string, cmd: any) => kairos.start(label, cmd.message));

  program
    .command('stop <id>')
    .action((id: string) => kairos.stop(id));

  program.parse(process.argv);
};

export default cli;
