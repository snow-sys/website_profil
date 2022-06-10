/** mengatur request untuk menambah fasilitas */

let { tambahTentangKami } = require("../../repository/tentang_kami");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { judul, isi, username } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : start tambahTentangKami query...`);
  tambahTentangKami(judul, isi, username)
    .then((newData) => {
      console.log(`[${formatted_date}] : finish tambahTentangKami query!`);
      res.json({
        message: "berhasil menambahkan data tentang kami",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] :  tambahTentangKami query failed!`);
      console.log(err);
      res.json({
        message: "gagal menambahkan data tentang kami",
        code: res.statusCode,
        response: err,
      });
    });
};
