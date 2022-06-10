/** mengatur request untuk mengedit user */

let { editUser } = require("../../repository/user");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;
  let { id_user, nama_user, pwd } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : start editUser query...`);
  editUser(uid, id_user, nama_user, pwd)
    .then((newData) => {
      console.log(`[${formatted_date}] : finish editUser query!`);
      if (newData.length > 0) {
        res.json({
          message: "berhasil mengubah data user",
          code: res.statusCode,
          response: newData,
        });
      } else {
        res.json({
          message: "uid user tidak ditemukan",
          code: res.statusCode,
        });
      }
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : editUser query failed!`);
      res.json({
        message: "gagal mengubah data user",
        code: res.statusCode,
        response: err,
      });
    });
};
