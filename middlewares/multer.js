const multer = require("multer");

const maxSize = 0.255 * 1024 * 1024;
var upload = multer({
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb({
        name: "Error File Type Multer",
      });
    }
  },
  limits: { fileSize: maxSize },
}).single("file");

const execute = async (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      err.name = "Error File Size Multer";
      next(err);
    } else if (err) {
      next(err);
    }
    next();
  });
};

module.exports = execute;
