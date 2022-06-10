/** mengatur request untuk meng-edit fasilitas */

let { editFasilitas } = require("../../repository/fasilitas");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;

  let { nama_fasilitas, keterangan } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  if (uid) {
    console.log(`[${formatted_date}] : start editFasilitas query...`);
    editFasilitas({ uid, nama_fasilitas, keterangan })
      .then((newData) => {
        console.log(`[${formatted_date}] : finish editFasilitas query!`);
        res.json({
          message: "berhasil mengubah data fasilitas",
          code: res.statusCode,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : editFasilitas query failed!`);
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
