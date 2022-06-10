/** function untuk membuat tabel info_banner */

let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists info_banner(
      uid uuid primary key default uuid_generate_v4(), 
      nama_banner varchar(90) not null, 
      update_at timestamp,
      created_at timestamp default now());
      
  `);
})();
