/** mengatur request yang datang ke bagian artikel */

const express = require("express");
const router = express.Router();
let { verifyToken } = require("../module/token");

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:slug_artikel?", require("../controller/artikel/listArtikel"));
router.post("/", verifyToken, require("../controller/artikel/tambahArtikel"));
router.put("/:uid", verifyToken, require("../controller/artikel/editArtikel"));
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/artikel/hapusArtikel")
);

module.exports = router;
