/** berisikan function - function yang berhubungan dengan kamar */
const moment = require("moment");
let { connection } = require("../module/connection");
let { hapusGambar } = require("../repository/gambar");

//function untuk menambahkan data kamar
exports.tambahKamar = (nama_kamar, username, keterangan) => {
  return connection
    .query(
      `
      insert into kamar(nama_kamar, id_user, keterangan)
      values($1, $2, $3) returning *
      `,
      [nama_kamar, username, keterangan]
    )
    .then(({ rows }) => rows);
};

//function untuk menampilkan list kamar
exports.listKamar = async (uid, limit, from, cari) => {
  let param = [limit ? limit : 99, from ? from : 0];
  let hasil = await connection
    .query(
      `select * from kamar ${
        uid
          ? "where uid = $3"
          : cari
          ? "where nama_kamar = $3 or id_user = $3"
          : ""
      }
    limit $1 offset $2
    `,
      uid ? param.concat(uid) : cari ? param.concat(`%${cari}%`) : param
    )
    .then(({ rows }) => rows);
  // console.log(hasil)
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
    // console.log(hasil_gambar)
  }
  return hasil;
};

//function untuk edit data kamar
exports.editKamar = (uid, nama_kamar, id_user, keterangan) => {
  let data = {
    uid,
    nama_kamar,
    id_user,
    keterangan,
  };
  // console.log(data)
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss.ssssss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);

  return connection
    .query(`update kamar set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows[0]);
};

//function hapus data kamar by uid
exports.hapusKamar = async (uid) => {
  let dataKamar = await connection
    .query(`delete from kamar where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);

  await hapusGambar(undefined, uid);
  return dataKamar;
};
