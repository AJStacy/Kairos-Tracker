import { Intervals } from './interval';
import { Projects } from './project';
import { User } from './user';
import { Cache } from './cache';

export interface DBSchema {
  user: User;
  cache: Cache;
  tables: Tables;
}

export interface Tables {
  intervals: Intervals;
  projects: Projects;
}

export type TableName = keyof Tables;
export type Table = DBSchema['tables'][TableName];
export type RowID = keyof DBSchema['tables'][TableName];
export type Row = DBSchema['tables'][TableName][RowID];

export type TableRowID<MyTable extends TableName> = keyof DBSchema['tables'][MyTable];
export type TableRow<MyTable extends TableName> = DBSchema['tables'][MyTable][TableRowID<MyTable>];