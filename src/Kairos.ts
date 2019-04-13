import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

const db = lowdb(FileSync);
console.log(db);

const start = (label?: string) => {

};

const stop = (label?: string) => {

};
