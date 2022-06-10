/** berisikan function - function tentang layanan */
const moment = require("moment");
let { connection } = require("../module/connection");
let { hapusGambar } = require("./gambar");

//function tambah layanan
exports.tambahLayanan = (nama_layanan) => {
  return connection
    .query(
      `
      insert into layanan(nama_layanan)
      values($1) returning *
      `,
      [nama_layanan]
    )
    .then(({ rows }) => rows);
};

//function me-list layanan
exports.listLayanan = async (uid, limit, from, cari) => {
  let param = [limit ? limit : 99, from ? from : 0];
  let hasil = await connection
    .query(
      `select * from layanan ${
        uid ? "where uid = $3" : cari ? "where nama_layanan like $3 " : ""
      }
    limit $1 offset $2
    `,
      uid ? param.concat(uid) : cari ? param.concat(`%${cari}%`) : param
    )
    .then(({ rows }) => rows);
  for (i = 0; i < hasil.length; i++) {
    let hasil_gambar = await connection
      .query(
        `
    select uid from gambar where uid_gambar = $1
    `,
        [hasil[i].uid]
      )
      .then(({ rows }) => rows);
    hasil[i].gambar = hasil_gambar;
  }
  return hasil;
};

//function hapus layanan
exports.hapusLayanan = async (uid) => {
  let dataLayanan = await connection
    .query(`delete from layanan where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);

  await hapusGambar(undefined, uid);
  return dataLayanan;
};

//function edit layanan
exports.editLayanan = (uid, nama_layanan) => {
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss.ssssss");

  return connection
    .query(
      `update layanan set update_at = $2, nama_layanan = $3 where uid = $1 returning *`,
      [uid, timestamp, nama_layanan]
    )
    .then(({ rows }) => rows);
};
