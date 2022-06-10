const sharp = require("sharp");
const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "web_rs",
  password: "sddaa23",
  port: 5432,
});
let imageDimension = {
  kamar: [{ name: "kamar", width: 342, height: 192 }],
  layanan: [{ name: "kamar", width: 342, height: 192 }],
  info_banner: [{ name: "banner", width: 670, height: 376 }],
  artikel: [
    { name: "artikel", width: 342, height: 192 },
    { name: "detailArtikel", width: 800, height: 400 },
  ],
  fasilitas: [{ name: "fasilitas", width: 342, height: 192 }],
  profil_dokter: [
    { name: "dokter", width: 128, height: 128 },
    { name: "profilDokter", width: 216, height: 216 },
  ],
};
//list function yang digunakan
exports.compressExistGambar = async ({
  nama_gambar,
  uid_gambar,
  kategori,
  nama_gambar_tanpa_ekstensi,
}) => {
  // console.log(nama_gambar, uid_gambar, kategori, nama_gambar_tanpa_ekstensi);
  let imageProperties = imageDimension[kategori] || [];
  pool
    .query(`delete from gambar where nama_gambar = $1 returning * `, [
      nama_gambar,
    ])
    .then(({ rows }) => rows);
  let promises = imageProperties
    // map nama file
    .map(({ name, height, width }) => ({
      name: `${nama_gambar_tanpa_ekstensi}_${name}`,
      height,
      width,
    }))
    .map(({ name, height, width }) => {
      (async () => {
        sharp(__dirname + `/../assets/${nama_gambar}`)
          .resize({ width, height, fit: "contain" })
          .toFile(__dirname + "/../assets/" + name + ".webp");
      })();
      pool
        .query(
          `insert into gambar(nama_gambar, uid_gambar) values($1, $2) returning * `,
          [`${name}.webp`, uid_gambar]
        )
        .then(({ rows }) => rows);
    });
  return Promise.all(promises);
};
