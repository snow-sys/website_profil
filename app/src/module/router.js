/** setting route server which define where request go */

const gambarRoute = require("../api/gambar");
const infoBannerRoute = require("../api/info_banner");
const artikelRoute = require("../api/artikel");
const fasilitasRoute = require("../api/fasilitas");
const layananRoute = require("../api/layanan");
const userRoute = require("../api/user");
const footerRoute = require("../api/footer");
const jadwalDokterRoute = require("../api/jadwal_dokter");
const tentangKamiRoute = require("../api/tentang_kami");
const profilDokterROute = require("../api/profil_dokter");
const kamarRoute = require("../api/kamar");
let logging = require("./logs");

//function for using route
module.exports = (app) => {
  app.use("/api/v1/gambar", gambarRoute);
  app.use("/api/v1/info_banner", infoBannerRoute);
  app.use("/api/v1/artikel", artikelRoute);
  app.use("/api/v1/fasilitas", fasilitasRoute);
  app.use("/api/v1/layanan", layananRoute);
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/footer", footerRoute);
  app.use("/api/v1/jadwal_dokter", jadwalDokterRoute);
  app.use("/api/v1/tentang_kami", tentangKamiRoute);
  app.use("/api/v1/profil_dokter", profilDokterROute);
  app.use("/api/v1/kamar", kamarRoute);

  app.use((req, res, next) => {
    const error = new Error("Salah Routes Request. Mohon periksa kembali!");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    let error_message = {
      error: error.status,
      message: error.message,
    };
    logging(req, res, error_message);
    res.status(error.status || 500);
    res.json({
      error: error.status,
      message: error.message,
    });
  });
  return app;
};
