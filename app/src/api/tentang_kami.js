/** mengatur request yang datang ke bagian tentang_kami */

const express = require("express");
const router = express.Router();
let { verifyToken } = require("../module/token");

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/tentang_kami/listTentangKami"));
router.post(
  "/",
  verifyToken,
  require("../controller/tentang_kami/tambahTentangKami")
);
router.put(
  "/:uid",
  verifyToken,
  require("../controller/tentang_kami/editTentangKami")
);
router.delete(
  "/:uid",
  verifyToken,
  require("../controller/tentang_kami/hapusTentangKami")
);

module.exports = router;
