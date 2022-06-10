let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists jadwal_dokter(
      uid uuid primary key default uuid_generate_v4(), 
      nama_dokter varchar(90) not null, 
      poli varchar(90) not null, 
      spesialis varchar(90) not null, 
      gambar varchar(50) not null, 
      jadwal_praktek varchar(90) default '-',
      created_at timestamp default now());
      
  `);
})();
