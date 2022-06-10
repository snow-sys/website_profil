/** mengatur request untuk menampilkan gambar */

let { lihatGambar } = require("../../repository/gambar");
let fs = require("fs");

let directory = process.cwd() + "/assets";
// let directory = process.cwd() + "/src/assets";

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

module.exports = (req, res) => {
  let { uid } = req.params;

  lihatGambar(uid)
    .then((data) => {
      // console.log(data);
      if (data.length > 0) {
        res
          .status(200)
          // .sendFile(process.cwd() + "/src/assets/" + data[0].nama_gambar);
          .sendFile(process.cwd() + "/assets/" + data[0].nama_gambar);
      } else {
        res.status(200).json("gambar tidak ada sama sekali di database");
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
