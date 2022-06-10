/** mengatur request untuk menambah artikel */

let { tambahArtikel } = require("../../repository/artikel");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { judul_artikel, isi_artikel, creator, deskripsi, keyword } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //buat slug artikel
  let slug_artikel = judul_artikel
    .replace(/[^a-zA-Z0-9 -]/g, "")
    .replace(/ /g, "-")
    .toLowerCase();

  //filter data yang undefined
  deskripsi ? deskripsi : "";
  keyword ? keyword : "";

  //mulai query tambahArtikel
  console.log(`[${formatted_date}] : start tambaArtikel query...`);
  tambahArtikel({
    judul_artikel,
    isi_artikel,
    creator,
    slug_artikel,
    deskripsi,
    keyword,
  })
    .then((newData) => {
      console.log(`[${formatted_date}] : finish tambaArtikel query!`);
      res.json({
        message: "berhasil menambahkan artikel baru",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : finish tambaArtikel query!`);
      res.json({
        message: "gagal menambahkan artikel baru",
        code: res.statusCode,
        response: err,
      });
    });
};
