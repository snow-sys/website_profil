/** mengatur request untuk menambah fasilitas */

let { tambahFasilitas } = require("../../repository/fasilitas");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { nama_fasilitas, keterangan } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : start tambahFasilitas query...`);
  tambahFasilitas({ nama_fasilitas, keterangan })
    .then((newData) => {
      console.log(`[${formatted_date}] : finish tambahFasilitas query!`);
      res.json({
        message: "berhasil menambahkan data fasilitas",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] :  tambahFasilitas query failed!`);
      console.log(err);
      res.json({
        message: "gagal menambahkan data fasilitas",
        code: res.statusCode,
        response: err,
      });
    });
};
