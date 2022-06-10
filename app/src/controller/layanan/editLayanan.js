/** mengatur request untuk mengedit layanan */

let { editLayanan } = require("../../repository/layanan");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;
  let { nama_layanan } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //check if uid params exist
  if (uid) {
    console.log(`[${formatted_date}] : start editLayanan query...`);
    editLayanan(uid, nama_layanan)
      .then((newData) => {
        console.log(`[${formatted_date}] : finish editLayanan query!`);
        res.json({
          message: "berhasil mengubah data layanan",
          code: res.statusCode,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : editLayanan query failed!`);
        res.json({
          message: "gagal mengubah data layanan",
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
