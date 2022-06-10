/** mengatur request untuk meng-edit fasilitas */

let { editProfilDokter } = require("../../repository/profil_dokter");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;

  let { nama_dokter, poli, pendidikan, riset, prestasi, id_user } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //check if uid params exist
  if (uid) {
    console.log(`[${formatted_date}] : start editProfilDokter query...`);
    editProfilDokter(
      uid,
      nama_dokter,
      poli,
      pendidikan,
      riset,
      prestasi,
      id_user
    )
      .then((newData) => {
        console.log(`[${formatted_date}] : finish editProfilDokter query!`);
        res.json({
          message: "berhasil mengubah data profil dokter",
          code: res.statusCode,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : editProfilDokter query failed!`);
        res.json({
          message: "gagal mengubah data profil dokter",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    console.log(`[${formatted_date}] : uid layanan not found!`);
    res.json({
      message: "uid layanan tidak ditemukan",
      code: res.statusCode,
    });
  }
};
