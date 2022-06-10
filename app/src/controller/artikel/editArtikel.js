/** mengatur request untuk edit artikel
 */

let { editArtikel } = require("../../repository/artikel");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  //get all params and query
  let { uid } = req.params;
  let { judul_artikel, isi_artikel, deskripsi, keyword, creator } = req.body;

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  let slug_artikel;
  if (judul_artikel) {
    slug_artikel = judul_artikel
      .replace(/[^a-zA-Z0-9 -]/g, "")
      .replace(/ /g, "-")
      .toLowerCase();
  } else slug_artikel = judul_artikel;

  //run editArtikel if uid exist
  if (uid) {
    console.log(`[${formatted_date}] : start editArtikel query...`);
    editArtikel({
      uid,
      judul_artikel,
      slug_artikel,
      isi_artikel,
      deskripsi,
      keyword,
      creator,
    })
      .then((newData) => {
        console.log(`[${formatted_date}] : finish editArtikel query!`);
        res.json({
          message: "berhasil edit data artikel",
          code: res.statusCode,
          response: newData,
        });
      })
      .catch((err) => {
        console.log(`[${formatted_date}] :  editArtikel query failed!`);
        res.json({
          message: "gagal mengedit artikel",
          code: res.statusCode,
          response: err,
        });
      });
  } else {
    //return request if didn't have uid
    res.json({
      message: "uid artikel tidak ditemukan",
      code: res.statusCode,
    });
  }
};
