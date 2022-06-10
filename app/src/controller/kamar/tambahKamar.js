/** mengatur request untuk menambah fasilitas */

let { tambahKamar } = require("../../repository/kamar");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { nama_kamar, username, keterangan } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : start tambahKamar query...`);
  tambahKamar(nama_kamar, username, keterangan)
    .then((newData) => {
      console.log(`[${formatted_date}] : finish tambahKamar query!`);
      res.json({
        message: "berhasil menambahkan data kamar",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] :  tambahKamar query failed!`);
      console.log(err);
      res.json({
        message: "gagal menambahkan data kamar",
        code: res.statusCode,
        response: err,
      });
    });
};
