// let {
//   connection
// } = require("../module/connection");

// exports.listJadwal = ({
//   uid,
//   cari,
//   limit,
//   from
// }) => {
//   let param = [from ? from : 0, limit ? limit : 10000];
//   // console.log("miaw", param)
//   return connection
//     .query(
//       `select * from jadwal_dokter
//       ${uid ? 'where uid like $3' :
//         cari ? 'where (nama_dokter like $3 or poli like $3 or spesialis like $3 or jadwal_praktek like $3)':''}
//       offset $1
//       limit $2
//       `,
//       uid ?
//       param.concat(`%${uid}%`) :
//       cari ? param.concat(`%${cari}%`) :
//       param
//     )
//     .then(({
//       rows
//     }) => rows);
// };

// exports.tambahJadwal = (data = {
//   nama_dokter,
//   poli,
//   spesialis,
//   gambar,
//   jadwalPraktek

// }) => {
//   let field = Object.keys(data).join(", ");
//   let param = Object.keys(data)
//     .map((_, i) => `$${i + 1}`)
//     .join(", ");
//   return connection
//     .query(
//       `
//       insert into obat(${field})
//       values(${param}) returning *
//       `,
//       [...Object.keys(data).map(el => data[el])]
//     )
//     .then(({
//       rows
//     }) => rows);
// };
