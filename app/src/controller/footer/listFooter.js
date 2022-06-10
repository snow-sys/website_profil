let { listFooter } = require("../../repository/footer");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.param;

  let { limit, from, keyword } = req.query;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : start listFooter query...`);
  listFooter({ uid, limit, from, keyword })
    .then((newData) => {
      console.log(`[${formatted_date}] : finish listFooter query!`);
      res.json({
        message: "berhasil menampilkan list footer",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : listFooter query failed!`);
      console.log(err);
      res.json({
        message: "gagal menampilkan list Footer",
        code: res.statusCode,
        response: err,
      });
    });
};
