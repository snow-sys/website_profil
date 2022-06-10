/** mengatur request untuk tambah user */

let { tambahUser } = require("../../repository/user");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { id_user, nama_user, pwd } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : Start tambahUser query...`);
  tambahUser(id_user, nama_user, pwd)
    .then((newData) => {
      console.log(`[${formatted_date}] : finish tambahUser query!`);
      res.json({
        message: "berhasil menambahkan data user",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] :  tambahUser query failed!`);
      console.log(err);
      res.json({
        message: "gagal menambahkan data user",
        code: res.statusCode,
        response: err,
      });
    });
};
