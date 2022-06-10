/** function untuk membuat tabel tentang_kami */

let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table profil_dokter(
      uid uuid primary key default uuid_generate_v4(), 
      nama_dokter text, 
      poli text, 
      pendidikan text,
      riset text,
      prestasi text,
      id_user varchar(30), 
      created_at timestamp default now(), 
      update_at timestamp default now());

  `);
})();
