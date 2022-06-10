/** module untuk membuat token, verifikasi token */

let jwt = require("jsonwebtoken");
let key = "sddaassddasad23";
let { connection } = require("../module/connection");

exports.genToken = (data) =>
  jwt.sign(data, key, {
    expiresIn: 60 * 60,
  });

exports.verifyToken = (req, res, next) => {
  //mendapatkan nilai authorization di header
  const bearerHeader = req.headers["authorization"];
  //check apakah bearerHeader undefined
  if (typeof bearerHeader !== "undefined") {
    //pisahkan bearer di spasi dan ambil token
    const bearerToken = bearerHeader.split(" ")[1];
    //verifiy token
    jwt.verify(bearerToken, key, async (err, authData) => {
      if (err) {
        res.status(403).json({
          success: "false",
          message: "token failed",
        });
      } else {
        let username = authData.username;
        let pwd = authData.pwd;
        let dataUser = await connection.query(
          `
        select uid, username, pwd from users where username=$1 and pwd = $2`,
          [authData.username, authData.pwd]
        );
        // console.log(dataUser)
        if (
          username == dataUser.rows[0].username &&
          pwd == dataUser.rows[0].pwd
        ) {
          // console.log("lanjut ke controller")
          req.body.username = username;
          next();
        } else {
          res.status(403).json({
            success: "false",
            message: "username atau password salah",
          });
        }
      }
    });
  } else {
    res.status(403).json({
      success: "false",
      message: "authorization failed",
    });
  }
};
