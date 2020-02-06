import { prompt } from 'enquirer';
import logs from '../logs';
import {
  projectExists,

} from './crud';

export const project = (name: string):void => {
  try {
    
  } catch (e) {
    logs.error(e);
  }
};

const confirmProject = async (name: string):Promise<boolean> => {
  if (projectExists(name)) {
    logs.warn(`A project with the name ${name} already exists. Please delete it first if you would like to create a new one.`);
    const response: { confirmation: boolean } = await prompt({
      type: 'confirm',
      name: 'confirmation',
      message: 'Project already exists. Would you like to overwrite it?',
    });
    return response.confirmation;
  }
  return true;
}