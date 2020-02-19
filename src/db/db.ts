import * as os from 'os';
import * as fs from 'fs';
import * as lowdb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileSync';
import { DBSchema, Tables } from '../_contracts';

export class DB {

  private db: lowdb.LowdbSync<DBSchema>;

  private home: string;

  constructor(defaults: DBSchema, home: string = `${os.homedir()}/.kairos`) {
    this.home = home;
    this.db = this.setup(defaults, this.home);
  }

  private setup(defaults: DBSchema, home: string):lowdb.LowdbSync<DBSchema> {
    // Setup the database
    if (!fs.existsSync(home)) { fs.mkdirSync(home); }
    const adapter = new FileAsync<DBSchema>(`${home}/db.json`);
    const db = lowdb(adapter);
    
    // Sets the db defaults
    db.defaults(defaults).write();

    return db;
  }

  public table<Name extends keyof Tables>(name: Name):Tables[Name] {
    return this.db.get(name).value();
  }

  public exists<Name extends keyof Tables>(table_name: Name, id: keyof Tables[Name]):boolean {
    return this.db.has(`${table_name}.${id}`).value();
  }

  public create<Name extends keyof Tables>(table_name: Name, id: keyof Tables[Name], cols: Tables[Name][keyof Tables[Name]]):void {
    this.db.set(`${table_name}.${id}`, cols).write();
  }

  public read<Name extends keyof Tables>(table_name: Name, id: keyof Tables[Name]):Tables[Name][keyof Tables[Name]] {
    return this.db.get(`${table_name}.${id}`).value();
  }

  public update<Name extends keyof Tables>(table_name: Name, id: keyof Tables[Name], cols: Partial<Tables[Name][keyof Tables[Name]]>):void {
    this.db.set(`${table_name}.${id}`, { ...this.read(table_name, id), ...cols}).write();
  }

  public delete<Name extends keyof Tables>(table_name: Name, id: keyof Tables[Name]):void {
    this.db.unset(`${table_name}.${id}`).write();
  }

}
