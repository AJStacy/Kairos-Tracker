import { DB } from '.';
import { Table as DBTable, TableName, RowID, Row, Tables } from '../_contracts';

export class Table<DBSchema, MyTable extends keyof Tables> {

  private db: DB<DBSchema>;

  private name: TableName;

  constructor(db: DB<DBSchema>, name: TableName) {
    this.db = db;
    this.name = name;
  }

  public all():DBTable {
    return this.db.table(this.name);
  }

  public exists(id: RowID<MyTable>):boolean {
    return this.db.exists(this.name, id);
  }

  public create(id: RowID<MyTable>, cols: Row<MyTable>):void {
    this.db.create(this.name, id, cols);
  }

  public overwrite(id: RowID<MyTable>, cols: Row<MyTable>):void {
    this.delete(id);
    this.create(id, cols);
  }

  public read(id: RowID<MyTable>):Row<MyTable> {
    return this.db.read(this.name, id);
  }

  public update(id: RowID<MyTable>, cols: Partial<Row<MyTable>>):void {
    this.db.update(this.name, id, cols);
  }

  public delete(id: RowID<MyTable>):void {
    this.db.delete(this.name, id);
  }

}