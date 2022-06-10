//berisikan function - function berhubungan dengan gambar

let { connection } = require("../module/connection");
let fs = require("fs");
let { getCurrentTime } = require("../module/getCurrentTime");

// formatted time to YYYY-MM-DD hh:mm:ss for logging
let formatted_date = getCurrentTime();

//function tambah gambar
exports.tambahGambar = (nama_gambar, uid_gambar) => {
  return connection
    .query(
      `
      insert into gambar(nama_gambar, uid_gambar)
      values($1, $2) returning *
      `,
      [nama_gambar, uid_gambar]
    )
    .then(({ rows }) => console.log(rows));
};

//function me-list gambar
exports.listGambar = (limit, from, uid, uid_gambar) => {
  let param = [limit ? limit : 200, from ? from : 0];
  // console.log(param)
  return connection
    .query(
      `select * from gambar
      ${uid ? "where uid = $3" : uid_gambar ? "where uid_gambar = $3" : ""}
      limit $1 offset $2
      `,
      uid ? param.concat(uid) : uid_gambar ? param.concat(uid_gambar) : param
    )
    .then(({ rows }) => rows);
};

//function untuk membuka / melihat gambar
exports.lihatGambar = (uid) => {
  return connection
    .query(
      `
      select nama_gambar from gambar where uid = $1
      `,
      [uid]
    )
    .then(({ rows }) => rows);
};

//function untuk menghapus gambar
exports.hapusGambar = async (uid, uid_gambar) => {
  let dataGambar = await connection
    .query(
      `
      delete from gambar ${
        uid_gambar ? "where uid_gambar = $1" : "where uid = $1"
      }
      returning *
      `,
      uid_gambar ? [uid_gambar] : [uid]
    )
    .then(({ rows }) => rows);

  console.log(`[${formatted_date}] : remove image from folder assets...`);
  dataGambar.map((el) => {
    // fs.unlinkSync(process.cwd() + "/src/assets/" + el.nama_gambar)
    fs.unlinkSync(
      process.cwd() + "/assets/" + el.nama_gambar,
      (err, result) => {
        if (err) {
          console.log(
            `[${formatted_date}] : remove image from folder assets failed!`
          );
          throw err;
        }
      }
    );
  });
  console.log(`[${formatted_date}] : remove image from folder assets success!`);
  return dataGambar;
};
