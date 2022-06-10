/** mengatur request yang datang ke bagian footer */

const express = require("express");
const router = express.Router();
let { verifyToken } = require("../module/token");

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/footer/listFooter"));
router.post("/", verifyToken, require("../controller/footer/tambahFooter"));
router.put("/:uid", verifyToken, require("../controller/footer/editFooter"));
// router.delete("/:uid", verifyToken, require("../controller/layanan/hapusLayanan"));

module.exports = router;
