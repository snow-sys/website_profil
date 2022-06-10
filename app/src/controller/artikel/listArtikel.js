/** mengatur request untuk menampilkan artikel */
let { listArtikel } = require("../../repository/artikel");
let { totalArtikel } = require("../../repository/artikel");
let { pagination } = require("../../module/pagination");
let { getCurrentTime } = require("../../module/getCurrentTime");
require("dotenv").config({ path: `${__dirname}/../../../../.env` });

module.exports = (req, res) => {
  //baca parameter & query yg diterima
  let { page, cari, uid } = req.query;
  let { slug_artikel } = req.params;

  //atur from dan limit sesuai dengan page yang dikirim
  let { limit, from } = pagination(page);
  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();
  //jalan function listArtikel
  console.log(`[${formatted_date}] : start listArtikel query...`);
  listArtikel({ limit, from, slug_artikel, cari, uid })
    .then(async (data) => {
      console.log(
        `[${formatted_date}] : finish listArtikel query! Start mapping data...`
      );
      let total_artikel = await totalArtikel();
      for (i = 0; i < data.length; i++) {
        //map every data.gambar to build link for image
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
        message: "berhasil menampilkan list artikel",
        code: res.statusCode,
        total_artikel,
        response: data,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : failed listArtikel query!`);
      res.json({
        message: "gagal menampilkan list artikel",
        code: res.statusCode,
        response: err,
      });
    });
};
