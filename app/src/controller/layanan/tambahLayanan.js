/** mengatur request untuk menambah layanan */

let { tambahLayanan } = require("../../repository/layanan");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { nama_layanan } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : start tambahLayanan query...`);
  tambahLayanan(nama_layanan)
    .then((newData) => {
      console.log(`[${formatted_date}] : finish tambahLayanan query!`);
      res.json({
        message: "berhasil menambahkan data layanan",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] :  tambahLayanan query failed!`);
      console.log(err);
      res.json({
        message: "gagal menambahkan data layanan",
        code: res.statusCode,
        response: err,
      });
    });
};
