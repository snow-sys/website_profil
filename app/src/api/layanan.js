/** mengatur request yang datang ke bagian layanan */

const express = require("express");
const router = express.Router();
let { verifyToken } = require("../module/token");

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/layanan/listLayanan"));
router.post("/", verifyToken, require("../controller/layanan/tambahLayanan"));
router.put("/:uid", verifyToken, require("../controller/layanan/editLayanan"));
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/layanan/hapusLayanan")
);

module.exports = router;
