const { Pool, Client } = require("pg");
const sharp = require("sharp");
var fs = require("fs");
let { compressExistGambar } = require("./compressExistImages");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "web_rs",
  password: "sddaa23",
  port: 5432,
});
// let pool = new Client({
//   user: "itzainab",
//   host: "localhost",
//   database: "web_rs_tabrani",
//   password: "itzainab2020",
//   port: 5432,
// });

// let pool = new Client({
//   user: "itzainab",
//   host: "localhost",
//   database: "web_rs_zainab",
//   password: "itzainab2020",
//   port: 5432
// })
(async () => {
  //tentukan bagian2 yang mau dicompress
  let kategori = [
    "kamar",
    "layanan",
    "info_banner",
    "artikel",
    "fasilitas",
    "profil_dokter",
  ];

  //ambil data gambar dari DB per kategori
  kategori.map(async (currElement, index) => {
    let dataGambar = await pool
      .query(
        `
    select gambar.* from gambar inner join ${currElement} on gambar.uid_gambar = ${currElement}.uid`
      )
      .then(({ rows }) => rows);
    console.log("datagambar length : ", dataGambar.length);
    console.log(`compress gambar kategori ${currElement}...`);
    dataGambar.map((el) => {
      setTimeout(() => {
        console.log(`compress gambar uid ${el.uid}...`);
        compressExistGambar({
          nama_gambar: el.nama_gambar,
          uid_gambar: el.uid_gambar,
          kategori: currElement,
          nama_gambar_tanpa_ekstensi: el.nama_gambar.replace(/\.[^.]*$/, ""),
        });
      }, 1000);
      setTimeout(() => {
        console.log(`compress gambar uid ${el.uid}...`);
        (async () => {
          fs.unlinkSync(__dirname + `/../assets/${el.nama_gambar}`);
        })();
      }, 10000);
    });
  });

  setTimeout(() => {
    console.log("hapus gambar yang extensi .jpeg ...");
    var imageFile = fs.readdirSync(__dirname + "/../assets/");

    //filter data imageFile yang hanya berupa gambar
    let imageData = imageFile.filter((el) => {
      if (
        el.includes(".png") == true ||
        el.includes(".jpg") == true ||
        el.includes(".jpeg") == true
      ) {
        return el;
      }
    });
    // console.log(imageData);
    imageData.map(async (el) => {
      console.log(`mulai hapus gambar ${el}...`);
      pool.query(`delete from gambar where nama_gambar = $1`, [el]);
      setTimeout(() => {
        fs.unlinkSync(__dirname + `/../assets/${el}`);
        console.log(`berhasil hapus gambar ${el}...`);
      }, 3000);
    });
  }, 15000);
})();
