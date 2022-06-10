/** mengatur request yang datang ke bagian profil dokter */

const express = require("express");
const router = express.Router();
let { verifyToken } = require("../module/token");

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", require("../controller/kamar/listKamar"));
router.post("/", verifyToken, require("../controller/kamar/tambahKamar"));
router.put("/:uid", verifyToken, require("../controller/kamar/editKamar"));
router.delete("/:uid", verifyToken, require("../controller/kamar/hapusKamar"));

module.exports = router;
