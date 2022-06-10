/** berisikan middleware yang digunakan server */
let cors = require("cors");
let fileupload = require("express-fileupload");
let logging = require("./logs");
let express = require("express");

//function for using middleware
module.exports = (app) => {
  app.use(fileupload());
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use((req, res, next) => {
    logging(req, res);
    res.setHeader("X-Powered-By", "Z-Tech-Team");
    next();
  });
  return app;
};
