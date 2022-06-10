const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "web_rs",
  password: "sddaa23",
  port: 5432,
});
// let pool = new Client({
//   user: "itzainab",
//   host: "localhost",
//   database: "web_rs_tabrani",
//   password: "itzainab2020",
//   port: 5432,
// });

// let pool = new Client({
//   user: "itzainab",
//   host: "localhost",
//   database: "web_rs_zainab",
//   password: "itzainab2020",
//   port: 5432
// })
(async () => {
  try {
    // check table artikel if already have slug_artikel column
    await pool.query(
      "alter table artikel add column if not exists deskripsi text default ''"
    );
    await pool.query(
      "alter table artikel add column if not exists keyword text default ''"
    );
    return console.log("berhasil tambah deskripsi dan keyword");
    //get uid_gambar which containt uid_artikel
  } catch (err) {
    console.log("error tambah deskripsi atau keyword :", err);
  }
})();
