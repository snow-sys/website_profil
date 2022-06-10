/** mengatur request untuk menambah fasilitas */

let { tambahProfilDokter } = require("../../repository/profil_dokter");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { nama_dokter, poli, pendidikan, riset, prestasi, id_user } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : start tambahProfilDokter query...`);
  tambahProfilDokter(nama_dokter, poli, pendidikan, riset, prestasi, id_user)
    .then((newData) => {
      console.log(`[${formatted_date}] : finish tambahProfilDokter query!`);
      res.json({
        message: "berhasil menambahkan data profil dokter",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] :  tambahProfilDokter query failed!`);
      console.log(err);
      res.json({
        message: "gagal menambahkan data profil dokter",
        code: res.statusCode,
        response: err,
      });
    });
};
