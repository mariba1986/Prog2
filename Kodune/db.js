//impordime mysql teegi
const mysql = require('mysql2');
//Impordime Node util teegi selleks, et saaksime hiljem mysql andmebaasi ühendust kasutada sünkroonselt async/await-iga
const util = require('util');
// Impordime vajalikud konstandid config failist andmebaasiga ühendumise jaoks
const { db } = require('./config');


const connection = mysql.createConnection({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//kui andmebaasi ei eksisteeri, siis loome selle: 
connection.query(`CREATE SCHEMA IF NOT EXISTS ${db.database}`, () => {
  connection.query(`USE ${db.database}`, () => { });
});

//muudame callback funktsiooni Promise'ks - see on selleks et saaks kasutada async awaite.
connection.query = util.promisify(connection.query);
//ekspordime ühenduse
module.exports = connection;
