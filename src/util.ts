import { formatISO } from 'date-fns';

export const timestamp = ():string => {
  const time = new Date();
  return formatISO(time, { format: 'basic' });
};