/** mengatur request untuk menghapus layanan dan gambarnya*/

let { hapusLayanan } = require("../../repository/layanan");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  if (uid) {
    console.log(`[${formatted_date}] : start hapusLayanan query...`);
    hapusLayanan(uid)
      .then((data) => {
        console.log(`[${formatted_date}] : finish hapusLayanan query!`);
        res.json({
          message: "berhasil menghapus data layanan",
          code: res.statusCode,
          response: data,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : hapusLayanan query failed!`);
        console.log(err);
        res.json({
          message: "gagal menghapus data layanan",
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
