const moment = require("moment");
let { connection } = require("../module/connection");

exports.tambahFooter = ({ alamat, email, no_telpon, sosmed }) => {
  return connection
    .query(
      `
      insert into footer(
        alamat,
        email,
        no_telpon,
        sosmed)
      values($1, $2, $3, $4) returning *
      `,
      [alamat, email, no_telpon, sosmed]
    )
    .then(({ rows }) => rows);
};

exports.listFooter = ({ uid, limit, from, keyword }) => {
  // console.log(uid, limit, from, cari)
  let param = [limit ? limit : 99, from ? from : 0];
  return connection
    .query(
      `select * from footer ${
        uid
          ? "where uid = $3"
          : keyword
          ? "where alamat like $3 or email like $3 or no_telpon like $3 or sosmed like $3"
          : ""
      }
    limit $1 offset $2
    `,
      uid ? param.concat(uid) : keyword ? param.concat(`%${keyword}%`) : param
    )
    .then(({ rows }) => rows);
};

exports.editFooter = (uid, data) => {
  delete data.username;
  var unix_timestamp = new Date().getTime();
  var timestamp = moment(unix_timestamp).format("YYYY-MM-DD HH:mm:ss");
  data.update_at = timestamp;

  let newData = Object.keys(data).filter((field) => data[field] !== undefined);
  let varSql = newData
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  let varData = newData.map((field) => data[field]);

  return connection
    .query(`update footer set ${varSql} where uid = $1 returning *`, [
      uid,
      ...varData,
    ])
    .then(({ rows }) => {
      rows[0];
    });
};
