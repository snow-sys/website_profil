/** mengatur request untuk men-list fasilitas */

let { listFasilitas } = require("../../repository/fasilitas");
let { getCurrentTime } = require("../../module/getCurrentTime");
require("dotenv").config({ path: `${__dirname}/../../../../.env` });

module.exports = (req, res) => {
  let { uid } = req.params;

  let { limit, from, cari } = req.query;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  //jalan function listArtikel
  console.log(`[${formatted_date}] : Start listFasilitas query...`);
  listFasilitas({ uid, limit, from, cari })
    .then((data) => {
      console.log(
        `[${formatted_date}] : finish listFasilitas query! Start mapping data...`
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
        message: "berhasil menampilkan list fasilitas",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : listFasilitas query failed!`);
      console.log(err);
      res.json({
        message: "gagal menampilkan list fasilitas",
        code: res.statusCode,
        response: err,
      });
    });
};
