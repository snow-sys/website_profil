let { editFooter } = require("../../repository/footer");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { uid } = req.params;
  let data = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //check uid if exist
  console.log(`[${formatted_date}] : checking uid footer...`);
  if (uid) {
    console.log(`[${formatted_date}] : uid found. start editFooter Query...`);
    editFooter(uid, data)
      .then((newData) => {
        console.log(`[${formatted_date}] : finish editFooter query!`);
        res.json({
          message: "berhasil merubah data footer",
          code: res.statusCode,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] : editFooter query failed!`);
        res.json({
          message: "gagal merubah data footer",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    console.log(`[${formatted_date}] : uid footer not found@!`);
    res.json({
      message: "uid footer tidak ditemukan",
      code: res.statusCode,
    });
  }
};
