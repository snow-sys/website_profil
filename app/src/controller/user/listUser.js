/** mengatur request untuk men-list user */

let { listUser } = require("../../repository/user");
let { getCurrentTime } = require("../../module/getCurrentTime");
let { pagination } = require("../../module/pagination");

module.exports = (req, res) => {
  let { uid } = req.params;
  let { page, cari } = req.query;

  let { limit, from } = pagination(page);

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : Start listUser query...`);
  listUser(uid, limit, from, cari)
    .then((newData) =>
      res.status(200).json({
        succes: "true",
        data: newData,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        succes: "false",
        data: err,
      });
    });
};
