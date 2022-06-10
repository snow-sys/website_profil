/** mengatur request untuk men-list gambar */

let { listGambar } = require("../../repository/gambar");
let fs = require("fs");
let { getCurrentTime } = require("../../module/getCurrentTime");
let { pagination } = require("../../module/pagination");
require("dotenv").config({ path: `${__dirname}/../../../../.env` });

// let directory = process.cwd() + "/src/assets";
let directory = process.cwd() + "/assets";
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

module.exports = (req, res) => {
  let { uid } = req.params;
  let { uid_gambar, page } = req.query;

  //get limit and offset from page params
  let { limit, from } = pagination(page);

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : Start listGambar query...`);
  listGambar(limit, from, uid, uid_gambar)
    .then((data) => {
      console.log(
        `[${formatted_date}] : finish listGambar query! Start mapping data...`
      );

      //map every data.gambar to build link for image
      // console.log("hostname", req.get("host"));
      // console.log("ini data", data);
      data.map((el) => {
        el.urlGambar = `${process.env.LOCAL_DOMAIN}/api/v1/gambar/lihat_gambar/${el.uid}`;
      });
      console.log(`[${formatted_date}] : Finish mapping data!`);
      res.json({
        message: "berhasil menampilkan list gambar",
        code: res.statusCode,
        response: data,
      });
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : listGambar query failed!`);
      res.json({
        message: "gagal menampilkan list gambar",
        code: res.statusCode,
      });
    });
};
