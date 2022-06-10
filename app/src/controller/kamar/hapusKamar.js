/** mengatur request untuk menghapus layanan dan gambarnya*/

let { hapusKamar } = require("../../repository/kamar");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //check if uid exist
  if (uid) {
    console.log(`[${formatted_date}] : start hapusKamar query...`);
    hapusKamar(uid)
      .then((data) => {
        console.log(`[${formatted_date}] : finish hapusKamar query!`);
        res.json({
          message: "berhasil menghapus data kamar",
          code: res.statusCode,
          response: data,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : hapusKamar query failed!`);
        console.log(err);
        res.json({
          message: "gagal menghapus data kamar",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    console.log(`[${formatted_date}] : uid kamar not found!`);
    res.json({
      message: "uid kamar tidak ditemukan",
      code: res.statusCode,
    });
  }
};
