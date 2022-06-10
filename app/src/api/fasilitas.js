/** mengatur request yang datang ke bagian fasilitas */

const express = require("express");
const router = express.Router();
let { verifyToken } = require("../module/token");

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/fasilitas/listFasilitas"));
router.post(
  "/",
  verifyToken,
  require("../controller/fasilitas/tambahFasilitas")
);
router.put(
  "/:uid",
  verifyToken,
  require("../controller/fasilitas/editFasilitas")
);
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/fasilitas/hapusFasilitas")
);

module.exports = router;
