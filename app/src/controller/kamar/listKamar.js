/** mengatur request untuk men-list "tentang kami" */

let { listKamar } = require("../../repository/kamar");
let { pagination } = require("../../module/pagination");
let { getCurrentTime } = require("../../module/getCurrentTime");
require("dotenv").config({ path: `${__dirname}/../../../../.env` });

module.exports = (req, res) => {
  let { uid } = req.params;
  let { page, cari } = req.query;

  let { limit, from } = pagination(page);

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : Start listKamar query...`);
  listKamar(uid, limit, from, cari)
    .then((data) => {
      console.log(
        `[${formatted_date}] : finish listKamar query! Start mapping data...`
      );

      //map every data.gambar to build link for image
      for (i = 0; i < data.length; i++) {
        let tempData = [];
        data[i].gambar.map((el) => {
          tempData.push(
            `${process.env.LOCAL_DOMAIN}/api/v1/gambar/lihat_gambar/${el.uid}`
          );
        });
        data[i].gambar = tempData;
      }
      console.log(`[${formatted_date}] : Finish mapping data!`);
      res.json({
        message: "berhasil menampilkan list kamar",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : listKamar query failed!`);
      console.log(err);
      res.json({
        message: "gagal menampilkan list kamar",
        code: res.statusCode,
        response: err,
      });
    });
};
