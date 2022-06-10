// let {
//   tambahJadwal
// } = require("../../repository/jadwalDokter");
// var multer = require("multer")

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'src/assets')
//   },
//   filename: function (req, file, cb) {
//     // console.log(req.body)
//     cb(null, file.fieldname + '-' + Date.now() + 'jpg')
//   }
// })
// var upload = multer({
//   storage: storage
// }).single('profileImage')

// module.exports = (req, res) => {

//   // console.log("ini body", req.body)
//   upload(req, res, function (err) {
//     let data = req.body
//     console.log(data.nama)
//     console.log(req.file)
//     // console.log("ini req", req)
//     // console.log("ini file", req.file)
//     // console.log("ini body", req.body)
//     // if (err) {
//     //   console.log('err')
//     // } else {
//     //   console.log('upload succes')
//     // }

//   })

//   // let data = req.body

//   // // console.log("testing")
//   // console.log(data)

//   // tambahJadwal(data)
//   //   .then(jadwalDokter =>
//   //     res.status(200).json(jadwalDokter)
//   //   )
//   //   .catch(err => {
//   //     console.error(err);
//   //     res.status(400).json("error");
//   //   });
// };