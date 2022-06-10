/** setting koneksi ke database */

let { Client } = require("pg");

// let connection = new Client({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// });

// let connection = new Client({
//   user: "itzainab",
//   host: "localhost",
//   database: "web_rs_tabrani",
//   password: "itzainab2020",
//   port: 5432,
// });

// let connection = new Client({
//   user: "itzainab",
//   host: "localhost",
//   database: "web_rs_zainab",
//   password: "itzainab2020",
//   port: 5432
// })

let connection = new Client({
  user: "postgres",
  host: "localhost",
  database: "web_rs",
  password: "sddaa23",
  port: 5432,
});

exports.connect = () => connection.connect();

exports.connection = connection;
