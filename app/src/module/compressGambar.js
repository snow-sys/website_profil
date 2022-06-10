let { tambahGambar } = require("../repository/gambar");
const sharp = require("sharp");
//set image dimension
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

exports.compressGambar = async ({
  bufferImage,
  kategori,
  nama_gambar,
  uid_gambar,
}) => {
  let imageProperties = imageDimension[kategori] || [];
  let promises = imageProperties
    // map nama file
    .map(({ name, height, width }) => ({
      name: `${nama_gambar}_${name}`,
      height,
      width,
    }))
    // buat file dan insert nama file ke db secara async
    .map(({ name, height, width }) => {
      // pembuatan file dibuat async karena memakan waktu
      // dan tidak memiliki dependensi ke yg lain
      (async () => {
        sharp(bufferImage)
          .resize({ width, height, fit: "contain" })
          .toFile(`../../app/src/assets/${name}.webp`);
      })();
      return tambahGambar(`${name}.webp`, uid_gambar);
    });
  return Promise.all(promises);
};
