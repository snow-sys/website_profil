/** mengatur request yang datang ke bagian info banner */

const express = require("express");
const router = express.Router();
let { verifyToken } = require("../module/token");

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/infoBanner/listBanner"));
router.post("/", verifyToken, require("../controller/infoBanner/tambahBanner"));
// router.put("/:uid", require("../controller/jadwalDokter/editJadwal"));
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/infoBanner/hapusBanner")
);

module.exports = router;
