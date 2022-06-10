/** berisikan function - function yang berhubungan dengan fasilitas */
const moment = require("moment");
let { connection } = require("../module/connection");
let { hapusGambar } = require("./gambar");

//function untuk menambahkan data tentang kami
exports.tambahProfilDokter = (
  nama_dokter,
  poli,
  pendidikan,
  riset,
  prestasi,
  id_user
) => {
  return connection
    .query(
      `
      insert into profil_dokter(
        nama_dokter,
        poli,
        pendidikan,
        riset,
        prestasi,
        id_user)
      values($1, $2, $3, $4, $5, $6) returning *
      `,
      [nama_dokter, poli, pendidikan, riset, prestasi, id_user]
    )
    .then(({ rows }) => rows);
};

//function untuk menampilkan list profil dokter
exports.listProfilDokter = async (uid, limit, from, cari) => {
  let param = [limit ? limit : 99, from ? from : 0];
  let hasil = await connection
    .query(
      `select * from profil_dokter ${
        uid
          ? "where uid = $3"
          : cari
          ? "where nama_dokter like $3 or poli like $3"
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
    console.log(hasil_gambar);
  }
  return hasil;
};

//function untuk edit data profil dokter
exports.editProfilDokter = (
  uid,
  nama_dokter,
  poli,
  pendidikan,
  riset,
  prestasi,
  id_user
) => {
  let data = {
    nama_dokter,
    poli,
    pendidikan,
    riset,
    prestasi,
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
    .query(`update profil_dokter set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows[0]);
};

//function hapus data profil dokter by uid
exports.hapusProfilDokter = async (uid) => {
  let dataProfilDokter = await connection
    .query(`delete from profil_dokter where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);

  await hapusGambar(undefined, uid);
  return dataProfilDokter;
};
