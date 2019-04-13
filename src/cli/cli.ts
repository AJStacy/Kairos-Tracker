import * as program from 'commander';

import kairos from '../index';
import * as config from '../../package.json';

const cli = () => {
  program.version(config.version);
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
