/** mengatur request untuk hapus artikel dan gambar yang ada di artikel
 */

let { hapusArtikel } = require("../../repository/artikel");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //jika uid tidak exist / not undefined
  if (uid) {
    console.log(`[${formatted_date}] : start hapusArtikel query...`);
    hapusArtikel(uid)
      .then((data) => {
        console.log(`[${formatted_date}] : finish hapusArtikel query!`);
        res.json({
          message: "berhasil hapus data artikel",
          code: res.statusCode,
          response: data,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] :  hapusArtikel query failed!`);
        res.json({
          message: "gagal menghapus data artikel",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    console.log(`[${formatted_date}] : uid artikel not found!`);
    res.json({
      message: "uid artikel tidak ditemukan",
      code: res.statusCode,
    });
  }
};
