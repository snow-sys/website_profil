/** mengatur request untuk meng-edit fasilitas */

let { editKamar } = require("../../repository/kamar");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;
  let { nama_kamar, username, keterangan } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //check if uid params exist
  if (uid) {
    console.log(`[${formatted_date}] : start editKamar query...`);
    editKamar(uid, nama_kamar, username, keterangan)
      .then((newData) => {
        console.log(`[${formatted_date}] : finish editKamar query!`);
        res.json({
          message: "berhasil mengubah data kamar",
          code: res.statusCode,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : editKamar query failed!`);
        res.json({
          message: "gagal mengubah data kamar",
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
