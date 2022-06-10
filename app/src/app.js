/**
 * menjalankan server dengan cek koneksi terlebih dahulu.
 * setelah terkoneksi, cek model database, baru jalankan server.
 */
let server = require("./module/server");
let db = require("./module/connection");

//fungsi untuk membuat database.
let initModel = () => {
  try {
    require("./model/artikel");
    require("./model/fasilitas");
    require("./model/gambar");
    require("./model/info_banner");
    require("./model/layanan");
    require("./model/user");
  } catch (err) {
    return Promise.reject(err);
  }
  return Promise.resolve();
};

//jalankan server
db.connect()
  .then(() => {
    console.log("Terkoneksi ke database");
    initModel();
    server.start();
  })
  .catch(() => console.log("Koneksi ke database gagal"));
