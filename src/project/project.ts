import { ProjectArgs } from '../_contracts';
import logs from '../logs';
import { projects } from './table';
import * as UI from './ui';
import { timestamp } from '../util';

export const project = async (name: string, cmd: ProjectArgs):Promise<void> => {
  try {
    if (projects.exists(name)) {
      const shouldOverwrite = await UI.confirmOverwrite(name);
      if (shouldOverwrite) {
        projects.create('doobadoo', {})
        projects.overwrite(name, {
          created: timestamp(),
          message: '',
        });
      }
    }
  } catch (e) {
    logs.error(e);
  }
};
