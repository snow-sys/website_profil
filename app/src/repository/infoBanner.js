/** berisikan function yang berhubungan dengan banner website */

let { connection } = require("../module/connection");
let { hapusGambar } = require("../repository/gambar");

//function tambah banner
exports.tambahBanner = (nama_banner) => {
  return connection
    .query(
      `
      insert into info_banner(nama_banner)
      values($1) returning *
      `,
      [nama_banner]
    )
    .then(({ rows }) => rows);
};

//function list banner
exports.listBanner = async (uid, limit, from, cari) => {
  let param = [limit ? limit : 99, from ? from : 0];
  let hasil = await connection
    .query(
      `select * from info_banner ${
        uid ? "where uid = $3" : cari ? "where nama_banner like $3" : ""
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

//function hapus banner
exports.hapusBanner = async (uid) => {
  let dataBanner = await connection
    .query(`delete from info_banner where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);
  if (dataBanner.length > 0) {
    await hapusGambar(undefined, uid);
  }
  return dataBanner;
};
