/** function untuk membuat tabel user */

let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists users(
      uid uuid primary key default uuid_generate_v4(), 
      username varchar(25) not null,
      nama_user varchar(30) not null,
      pwd varchar(30) not null,
      created_at timestamp default now(),
      update_at timestamp);
      
  `);
})();
