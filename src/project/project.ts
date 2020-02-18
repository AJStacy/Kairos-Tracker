import logs from '../logs';
import { projects } from './table';
import * as UI from './ui';
import { timestamp } from '../util';

export const project = async (name: string):Promise<void> => {
  try {
    if (projects.exists(name)) {
      const shouldOverwrite = await UI.confirmProject(name);
      if (shouldOverwrite) {
        
      }
    }
  } catch (e) {
    logs.error(e);
  }
};

// projects.overwrite(name, {
//   created: timestamp(),
//   message: '',
// });