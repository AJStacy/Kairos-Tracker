import { DBSchema } from '../_contracts';

export const defaults: DBSchema = {
  user: {
    name: null,
    password: null,
    sync: false,
  },
  cache: {
    recent: null,
  },
  intervals: {},
  projects: {},
};