/** mengatur request yang datang ke bagian user */

const express = require("express");
const router = express.Router();
let {
  verifyToken
} = require("../module/token")

//mengatur request yang datang dan mengirimnya ke controller sesuai bagian2nya
router.get("/:uid?", verifyToken, require("../controller/user/listUser"));
router.post("/login", require("../controller/user/login"));
router.post("/", verifyToken, require("../controller/user/tambahUser"));
router.put("/:uid", verifyToken, require("../controller/user/editUser"));
router.delete("/:uid", verifyToken, require("../controller/user/hapusUser"));

module.exports = router;