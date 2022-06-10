/** mengatur request untuk login user */

let { login } = require("../../repository/user");
let { genToken } = require("../../module/token");
let { getCurrentTime } = require("../../module/getCurrentTime");

module.exports = (req, res) => {
  let { username, pwd } = req.body;
  // console.log(req.body)

  // formatted time to YYYY-MM-DD hh:mm:ss for logging
  let formatted_date = getCurrentTime();

  console.log(`[${formatted_date}] : Start Login query...`);
  login(username, pwd)
    .then(async (newData) => {
      if (newData.length > 0) {
        console.log(
          `[${formatted_date}] : Login query success! Start building token...`
        );
        let data = { username, pwd, timestamp: +new Date() };
        let token = await genToken(data);
        let hasil = newData.map((newData) => {
          return {
            username,
            nama: newData.nama_user,
            token: token,
          };
        });
        console.log(`[${formatted_date}] : Building token success!`);
        return res.status(200).json({
          succes: "true",
          data: hasil,
        });
      } else {
        console.log(
          `[${formatted_date}] : Username and Password did not match!`
        );
        return res.status(200).json({
          succes: "false",
          data: "username and password did not match",
        });
      }
    })
    .catch((err) => {
      console.log(`[${formatted_date}] : Login query failed!`);
      console.log(err);
      res.status(400).json({
        succes: "false",
        data: err,
      });
    });
};
