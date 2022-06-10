/** berisikan function - function yang berhubungan dengan fasilitas */
const moment = require("moment");
let { connection } = require("../module/connection");
let { hapusGambar } = require("./gambar");

//function untuk menambahkan data tentang kami
exports.tambahTentangKami = (judul, isi, id_user) => {
  return connection
    .query(
      `
      insert into tentang_kami(judul, isi, id_user)
      values($1, $2, $3) returning *
      `,
      [judul, isi, id_user]
    )
    .then(({ rows }) => rows);
};

//function list "tentang kami"
exports.listTentangKami = async (uid, limit, from, cari) => {
  let param = [limit ? limit : 99, from ? from : 0];
  let hasil = await connection
    .query(
      `select * from tentang_kami ${
        uid
          ? "where uid = $3"
          : cari
          ? "where judul like $3 or isi like $3"
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
  }
  return hasil;
};

//function untuk edit data tentang kami
exports.editTentangKami = (uid, judul, isi, id_user) => {
  let data = {
    judul,
    isi,
    id_user,
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
    .query(`update tentang_kami set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows[0]);
};

//function hapus fasilitas
exports.hapusTentangKami = async (uid) => {
  let dataTentangKami = await connection
    .query(`delete from tentang_kami where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);

  await hapusGambar(undefined, uid);
  return dataTentangKami;
};
