let { tambahFooter } = require("../../repository/footer");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { alamat, email, no_telpon, sosmed } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : start tambahFooter query...`);
  tambahFooter({ alamat, email, no_telpon, sosmed })
    .then((newData) => {
      console.log(`[${formatted_date}] : finish tambahFooter query!`);
      res.json({
        message: "berhasil menambahkan data footer",
        code: res.statusCode,
        response: newData,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : tambahFooter query failed!`);
      res.json({
        message: "gagal menambahkan data footer",
        code: res.statusCode,
        response: err,
      });
    });
};
