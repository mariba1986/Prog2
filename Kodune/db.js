//impordime mysql teegi
const mysql = require('mysql2');
//Impordime Node util teegi selleks, et saaksime hiljem mysql andmebaasi ühendust kasutada sünkroonselt async/await-iga
const util = require('util');
// Impordime vajalikud konstandid config failist andmebaasiga ühendumise jaoks
const { db } = require('./config');


const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//kui andmebaasi ei eksisteeri, siis loome selle: 
pool.query(`CREATE SCHEMA IF NOT EXISTS ${db.database}`, () => {
  pool.query(`USE ${db.database}`, () => { });
});

//muudame callback funktsiooni Promise'ks - see on selleks et saaks kasutada async awaite.
pool.query = util.promisify(pool.query);
//ekspordime ühenduse
module.exports = pool;
