/** mengatur request untuk men-list banner */

let { listBanner } = require("../../repository/infoBanner");
let { getCurrentTime } = require("../../module/getCurrentTime");
require("dotenv").config({ path: `${__dirname}/../../../../.env` });

module.exports = (req, res) => {
  let { uid } = req.params;
  let { limit, from, cari } = req.query;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : Start listBanner query...`);
  listBanner(uid, limit, from, cari)
    .then((data) => {
      console.log(
        `[${formatted_date}] : finish listBanner query! Start mapping data...`
      );

      //map every data.gambar to build link for image
      for (i = 0; i < data.length; i++) {
        let dataGambar = [];
        data[i].gambar.map((el) => {
          dataGambar.push(
            `${process.env.LOCAL_DOMAIN}/api/v1/gambar/lihat_gambar/${el.uid}`
          );
        });
        data[i].gambar = dataGambar;
      }

      console.log(`[${formatted_date}] : finish mapping data!`);
      res.json({
        message: "berhasil menampilkan infoBanner.",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : finish mapping data!`);
      res.json({
        message: "gagal menampilkan infoBanner.",
        code: res.statusCode,
        response: err,
      });
    });
};
