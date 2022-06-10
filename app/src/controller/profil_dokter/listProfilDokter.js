/** mengatur request untuk men-list "tentang kami" */

let { listProfilDokter } = require("../../repository/profil_dokter");
let { getCurrentTime } = require("../../module/getCurrentTime");
require("dotenv").config({ path: `${__dirname}/../../../../.env` });

module.exports = (req, res) => {
  let { uid } = req.params;

  let { limit, from, cari } = req.query;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : Start listProfilDokter query...`);
  listProfilDokter(uid, limit, from, cari)
    .then((data) => {
      console.log(
        `[${formatted_date}] : finish listProfilDokter query! Start mapping data...`
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
        message: "berhasil menampilkan list profil dokter",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : listProfilDokter query failed!`);
      console.log(err);
      res.json({
        message: "gagal menampilkan list profil dokter",
        code: res.statusCode,
        response: err,
      });
    });
};
