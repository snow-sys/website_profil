/** berisikan function - function yang berhubungan dengan fasilitas */
const moment = require("moment");
let { connection } = require("../module/connection");
let { hapusGambar } = require("../repository/gambar");

//function tambah fasilitas
exports.tambahFasilitas = ({ nama_fasilitas, keterangan }) => {
  return connection
    .query(
      `
      insert into fasilitas(nama_fasilitas, keterangan)
      values($1, $2) returning *
      `,
      [nama_fasilitas, keterangan]
    )
    .then(({ rows }) => rows);
};

//function list fasilitas
exports.listFasilitas = async ({ uid, limit, from, cari }) => {
  let param = [limit ? limit : 99, from ? from : 0];
  let hasil = await connection
    .query(
      `select * from fasilitas ${
        uid
          ? "where uid = $3"
          : cari
          ? "where nama_fasilitas like $3 or keterangan like $3"
          : ""
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

//function hapus fasilitas
exports.hapusFasilitas = async (uid) => {
  let dataFasilitas = await connection
    .query(`delete from fasilitas where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);
  await hapusGambar(undefined, uid);
  return dataFasilitas;
};

//function edit fasilitas
exports.editFasilitas = ({ uid, nama_fasilitas, keterangan }) => {
  let data = {
    nama_fasilitas,
    keterangan,
  };
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);

  return connection
    .query(`update fasilitas set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows[0]);
};
