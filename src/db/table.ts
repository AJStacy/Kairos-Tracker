import { DB } from '.';
import { Tables } from '../_contracts';

export class Table<MyTable extends keyof Tables> {

  private db: DB;

  private name: MyTable;

  constructor(db: DB, name: MyTable) {
    this.db = db;
    this.name = name;
  }

  public all():Tables[MyTable] {
    return this.db.table<MyTable>(this.name);
  }

  public exists(id: keyof Tables[MyTable]):boolean {
    return this.db.exists<MyTable>(this.name, id);
  }

  public create(id: keyof Tables[MyTable], cols: Tables[MyTable][keyof Tables[MyTable]]):void {
    this.db.create<MyTable>(this.name, id, cols);
  }

  public overwrite(id: keyof Tables[MyTable], cols: Tables[MyTable][keyof Tables[MyTable]]):void {
    this.delete(id);
    this.create(id, cols);
  }

  public read(id: keyof Tables[MyTable]):Tables[MyTable][keyof Tables[MyTable]] {
    return this.db.read(this.name, id);
  }

  public update(id: keyof Tables[MyTable], cols: Partial<Tables[MyTable][keyof Tables[MyTable]]>):void {
    this.db.update(this.name, id, cols);
  }

  public delete(id: keyof Tables[MyTable]):void {
    this.db.delete(this.name, id);
  }

}