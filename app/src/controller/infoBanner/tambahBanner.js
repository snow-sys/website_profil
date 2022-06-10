/** mengatur request untuk menambah banner */

let { tambahBanner } = require("../../repository/infoBanner");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { nama_banner } = req.body;

  console.log(`[${formatted_date}] : Start tambahBanner query...`);
  tambahBanner(nama_banner)
    .then((newData) => {
      console.log(`[${formatted_date}] : Finish tambahBanner query!`);
      res.json({
        message: "berhasil menambahkan infoBanner.",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : tambahBanner query failed!`);
      console.log(err);
      res.status(400).json({
        succes: "false",
        data: err,
      });
    });
};
