/** mengatur request yang datang ke bagian jadwal dokter */

const express = require("express");
const router = express.Router();

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/", require("../controller/jadwalDokter/lihatJadwal"));
// router.post("/", require("../controller/jadwalDokter/tambahJadwal"));
// router.put("/:uid", require("../controller/jadwalDokter/editJadwal"));
// router.delete("/:uid", require("../controller/jadwalDokter/hapusJadwal"));

module.exports = router;
