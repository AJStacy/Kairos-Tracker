import * as os from 'os';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

// Setup the database
const adapter = new FileSync(`${os.homedir()}/.kairos/db.json`);
const db = lowdb(adapter);

// Sets the db defaults
db.defaults({
  user: {
    name: null,
    password: null,
    sync: false,
  },
  intervals: {
    labeled: {},
    unlabeled: [],
  },
}).write();

export default db;
