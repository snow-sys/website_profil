/** mengatur request untuk menghapus banner dan gambarya */

let { hapusBanner } = require("../../repository/infoBanner");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //jalankan hapusBanner Query jika uid tidak undefined
  if (uid) {
    console.log(`[${formatted_date}] : start hapusBanner query...`);
    hapusBanner(uid)
      .then((data) => {
        console.log(`[${formatted_date}] : finish hapusBanner query!`);
        if (data.length > 0) {
          res.json({
            message: "berhasil hapus data info banner",
            code: res.statusCode,
            response: data,
          });
        } else {
          res.json({
            message: "uid tidak ditemukan pada database info banner",
            code: res.statusCode,
          });
        }
      })
      .catch((err) => {
        console.log(`[${formatted_date}] :  hapusBanner query failed!`);
        res.json({
          message: "gagal menghapus data info banner",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    console.log(`[${formatted_date}] : uid info_banner is undefined!`);
    res.json({
      message: "uid info banner tidak ditemukan",
      code: res.statusCode,
    });
  }
};
