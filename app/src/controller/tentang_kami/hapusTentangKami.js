/** mengatur request untuk menghapus fasilitas dan gambar yang ada di fasilitas */

let { hapusTentangKami } = require("../../repository/tentang_kami");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //check if uid Profil Dokter is exist
  if (uid) {
    console.log(`[${formatted_date}] : start hapusTentangKami query...`);
    hapusTentangKami(uid)
      .then((data) => {
        console.log(`[${formatted_date}] : finish hapusTentangKami query!`);
        res.json({
          message: "berhasil menghapus data tentang kami",
          code: res.statusCode,
          response: data,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : hapusTentangKami query failed!`);
        console.log(err);
        res.json({
          message: "gagal menghapus data tentang kami",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    console.log(`[${formatted_date}] : uid tentang kami not found!`);
    res.json({
      message: "uid tentang kami tidak ditemukan",
      code: res.statusCode,
    });
  }
};
