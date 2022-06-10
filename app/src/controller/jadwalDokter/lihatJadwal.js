let axios = require("axios").default;

module.exports = async (req, res) => {
  let username = "senang";
  let password = "senang1903";

  console.log("build token...");
  let token = await axios
    .post("http://128.199.180.145:8001/api/v1?fn=signIn", {
      username,
      password,
    })
    .then((newData) => {
      console.log("build token success!");
      return newData.data.data.token;
    });

  let config = {
    headers: {
      token: token,
    },
  };

  console.log("start get jadwal dokter...");
  let jadwal_dokter = await axios
    .post(
      "http://128.199.180.145:8003/api/v1?fn=getAllJadwalDokter",
      {},
      config
    )
    .then((data) => data.data);
  // console.log(jadwal_dokter)
  if (jadwal_dokter.success == true) {
    console.log("get jadwal dokter success!");
    let jadwal_dokter_baru = jadwal_dokter.data.map((data) => {
      return {
        uid: data.uid,
        nama_dokter: data.nama_dokter,
        nama_poli: data.nama_poli,
        hari: data.hari,
        jam_mulai: data.jam_mulai,
        jam_selesai: data.jam_selesai,
      };
    });
    return res.status(200).json({
      success: jadwal_dokter.success,
      data: jadwal_dokter_baru,
    });
  } else {
    console.log("get jadwal dokter failed!");
    return res.status(200).json({
      success: jadwal_dokter.success,
    });
  }
};
