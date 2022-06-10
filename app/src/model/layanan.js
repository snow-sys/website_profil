/** function untuk membuat tabel layanan */

let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists layanan(
      uid uuid primary key default uuid_generate_v4(), 
      nama_layanan varchar(90) not null, 
      created_at timestamp default now(),
      update_at timestamp);
      
  `);
})();
