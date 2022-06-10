/** mengatur request yang datang ke bagian profil dokter */

const express = require("express");
const router = express.Router();
let { verifyToken } = require("../module/token");

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/profil_dokter/listProfilDokter"));
router.post(
  "/",
  verifyToken,
  require("../controller/profil_dokter/tambahProfilDokter")
);
router.put(
  "/:uid",
  verifyToken,
  require("../controller/profil_dokter/editProfilDokter")
);
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/profil_dokter/hapusProfilDokter")
);

module.exports = router;
