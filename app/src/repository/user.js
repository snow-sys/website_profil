/** berisikan function - function berhubungan dengan modul user */
const moment = require("moment");
let { connection } = require("../module/connection");

//function tambah user
exports.tambahUser = (username, nama_user, pwd) => {
  return connection
    .query(
      `
      insert into users(username,
        nama_user,
        pwd)
      values($1, $2, $3) returning *
      `,
      [username, nama_user, pwd]
    )
    .then(({ rows }) => rows);
};

//function me-list user
exports.listUser = (uid, limit, from, cari) => {
  // console.log(uid, limit, from, cari)
  let param = [limit ? limit : 99, from ? from : 0];

  return connection
    .query(
      `select * from users ${
        uid ? "where uid = $3" : cari ? "where nama_user like $3" : ""
      }
    limit $1 offset $2
    `,
      uid ? param.concat(uid) : cari ? param.concat(`%${cari}%`) : param
    )
    .then(({ rows }) => rows);
};

//function login
exports.login = (username, pwd) => {
  return connection
    .query(`select * from users where username = $1 and pwd = $2`, [
      username,
      pwd,
    ])
    .then(({ rows }) => rows);
};

//function hapus user
exports.hapusUser = (uid) => {
  return connection
    .query(`delete from users where uid = $1 returning * `, [uid])
    .then(({ rows }) => rows);
};

//function untuk edit user
exports.editUser = (uid, username, nama_user, pwd) => {
  let data = {
    username,
    nama_user,
    pwd,
  };
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss.ssssss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);

  return connection
    .query(`update users set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => rows);
};
