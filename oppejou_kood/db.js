const mysql = require('mysql2');
const util = require('util');
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

connection.query(`CREATE SCHEMA IF NOT EXISTS ${db.database}`, () => {
  connection.query(`USE ${db.database}`, () => { });
});


connection.query = util.promisify(connection.query);

module.exports = connection;
