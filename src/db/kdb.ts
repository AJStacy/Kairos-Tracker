import { DB } from '.';
import { DBSchema } from '../_contracts';
import { defaults } from './defaults';

export type KDB = DB<DBSchema>;
export const kdb = new DB<DBSchema>(defaults);