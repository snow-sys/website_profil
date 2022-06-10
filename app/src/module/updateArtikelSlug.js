const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "web_rs",
  password: "sddaa23",
  port: 5432,
});
// let pool = new Client({
//   user: "itzainab",
//   host: "localhost",
//   database: "web_rs_tabrani",
//   password: "itzainab2020",
//   port: 5432,
// });

// let pool = new Client({
//   user: "itzainab",
//   host: "localhost",
//   database: "web_rs_zainab",
//   password: "itzainab2020",
//   port: 5432
// })
(async () => {
  try {
    // check table artikel if already have slug_artikel column
    await pool.query(
      "alter table artikel add column if not exists slug_artikel text default ''"
    );
    //get data artikel
    console.log("get data artikel...");
    let dataArtikel = await pool
      .query("select judul_artikel, slug_artikel from artikel")
      .then(({ rows }) => rows);
    //filter data artikel
    console.log("filter data artikel...");
    let newData = dataArtikel.filter((el) => {
      if (el.slug_artikel === "") {
        return el;
      }
    });
    //checking filtered data artikel
    console.log("check filtered data artikel...");
    if (newData.length > 0) {
      //build slug_artikel
      console.log("build slug_artikel...");
      newData.map((el) => {
        el.slug_artikel = el.judul_artikel
          .replace(/[^a-zA-Z0-9 -]/g, "")
          .replace(/\s\s+/g, " ")
          .replace(/ /g, "-")
          .toLowerCase();
      });
      //update data artikel
      console.log("update artikel...");
      newData.map((el) => {
        pool
          .query(
            "update artikel set slug_artikel = $1 where judul_artikel = $2 returning *",
            [el.slug_artikel, el.judul_artikel]
          )
          .then(({ rows }) => rows);
      });
      // //   console.log(`--->`, updatedArtikel);
      // newData = await pool
      //   .query("select judul_artikel, slug_artikel from artikel")
      //   .then(({ rows }) => rows);
      console.log("update artikel done!!!!");
    } else console.log("tidak data artikel yang perlu diupdate!!!!");
  } catch (err) {
    console.log(err);
  }
})();
