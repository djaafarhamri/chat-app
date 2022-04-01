const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

// filter file type
const fileFilter = (req, file, cb) => {
  cb(null, true);
};
let upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
// export
module.exports = upload.single("image");
