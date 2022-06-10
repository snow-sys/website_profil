/** function untuk membuat tabel fasilitas */

let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists fasilitas(
      uid uuid primary key default uuid_generate_v4(), 
      nama_fasilitas varchar(100) not null, 
      keterangan text not null, 
      created_at timestamp default now(),
      update_at timestamp);

  `);
})();
