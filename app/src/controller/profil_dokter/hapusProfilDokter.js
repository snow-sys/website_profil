/** mengatur request untuk menghapus fasilitas dan gambar yang ada di fasilitas */

let { hapusProfilDokter } = require("../../repository/profil_dokter");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //check if uid Profil Dokter is exist
  if (uid) {
    console.log(`[${formatted_date}] : start hapusProfilDokter query...`);
    hapusProfilDokter(uid)
      .then((data) => {
        console.log(`[${formatted_date}] : finish hapusProfilDokter query!`);
        res.json({
          message: "berhasil menghapus data profil dokter",
          code: res.statusCode,
          response: data,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : hapusProfilDokter query failed!`);
        console.log(err);
        res.json({
          message: "gagal menghapus data profil dokter",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    console.log(`[${formatted_date}] : uid profil dokter not found!`);
    res.json({
      message: "uid profil dokter tidak ditemukan",
      code: res.statusCode,
    });
  }
};
