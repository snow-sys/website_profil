/** mengatur request untuk menghapus fasilitas dan gambar yang ada di fasilitas */

let { hapusFasilitas } = require("../../repository/fasilitas");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  // check if uid params exist
  if (uid) {
    console.log(`[${formatted_date}] : start hapusFasilitas query...`);
    hapusFasilitas(uid)
      .then(async (data) => {
        console.log(`[${formatted_date}] : finish hapusFasilitas query!`);
        res.json({
          message: "berhasil mengubah data fasilitas",
          code: res.statusCode,
          response: data,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : hapusFasilitas query failed!`);
        res.json({
          message: "gagal mengubah data fasilitas",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    console.log(`[${formatted_date}] : uid fasilitas not found!`);
    res.json({
      message: "uid fasilitas tidak ditemukan",
      code: res.statusCode,
    });
  }
};
