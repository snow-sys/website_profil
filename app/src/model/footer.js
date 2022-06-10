let { connection } = require("../module/connection");

module.exports = (() => {
  connection.query(`
    create extension if not exists "uuid-ossp";

    create table if not exists footer(
      uid uuid primary key default uuid_generate_v4(), 
      alamat varchar(99),
      email varchar(99),
      no_telpon varchar(99),
      sosmed text, 
      created_at timestamp default now(),
      update_at timestamp);

  `);
})();
