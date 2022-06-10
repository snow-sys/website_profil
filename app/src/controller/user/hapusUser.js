/** mengatur request untuk menghapus user */

let { hapusUser } = require("../../repository/user");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : start hapusUser query...`);
  hapusUser(uid)
    .then((data) => {
      console.log(`[${formatted_date}] : finish hapusUser query!`);
      res.json({
        message: "berhasil menghapus data user",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : hapusUser query failed!`);
      console.log(err);
      res.json({
        message: "gagal menghapus data user",
        code: res.statusCode,
        response: err,
      });
    });
};
