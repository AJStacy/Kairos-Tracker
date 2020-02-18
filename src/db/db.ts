import * as os from 'os';
import * as fs from 'fs';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import {
  Table,
  TableName,
  RowID,
  Row,
} from '../_contracts';

export class DB<DBSchema> {

  private db: lowdb.LowdbSync<DBSchema>;

  private home: string;

  constructor(defaults: DBSchema, home: string = `${os.homedir()}/.kairos`) {
    this.home = home;
    this.db = this.setup(defaults, this.home);
  }

  private setup(defaults: DBSchema, home: string):lowdb.LowdbSync<DBSchema> {
    // Setup the database
    if (!fs.existsSync(home)) { fs.mkdirSync(home); }
    const adapter = new FileSync<DBSchema>(`${home}/db.json`);
    const db = lowdb(adapter);
    
    // Sets the db defaults
    db.defaults(defaults).write();

    return db;
  }

  public table(name: TableName):Table {
    return this.db.get(name).value();
  }

  public exists(table_name: TableName, id: RowID):boolean {
    return this.db.has(`${table_name}.${id}`).value();
  }

  public create(table_name: TableName, id: RowID, cols: Row):void {
    this.db.set(`${table_name}.${id}`, cols).write();
  }

  public read(table_name: TableName, id: RowID):Row {
    return this.db.get(`${table_name}.${id}`).value();
  }

  public update(table_name: TableName, id: RowID, cols: Partial<Row>):void {
    this.db.set(`${table_name}.${id}`, { ...this.read(table_name, id), ...cols}).write();
  }

  public delete(table_name: TableName, id: RowID):void {
    this.db.unset(`${table_name}.${id}`).write();
  }

}
