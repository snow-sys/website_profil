/** mengatur request untuk meng-edit fasilitas */

let { editTentangKami } = require("../../repository/tentang_kami");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;
  let { judul, isi, username } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //check if uid is exist
  if (uid) {
    console.log(`[${formatted_date}] : start editTentangKami query...`);
    editTentangKami(uid, judul, isi, username)
      .then((newData) => {
        console.log(`[${formatted_date}] : finish editTentangKami query!`);
        res.json({
          message: "berhasil mengubah data tentang kami",
          code: res.statusCode,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : editTentangKami query failed!`);
        res.json({
          message: "gagal mengubah data tentang kami",
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
