import * as os from 'os';
import * as fs from 'fs';
import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';

// Setup the database
const base = `${os.homedir()}/.kairos`;
if (!fs.existsSync(base)) { fs.mkdirSync(base); }
const adapter = new FileSync(`${base}/db.json`);
const db = lowdb(adapter);

// Sets the db defaults
db.defaults({
  user: {
    name: null,
    password: null,
    sync: false,
  },
  cache: {
    recent: null,
  },
  intervals: {},
}).write();

export default db;
