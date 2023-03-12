const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp");
  },
  filename: function (req, file, cb) {
    // const uniq = Date.now() + Math.round(Math.random() * 1E9);
    // cb(null, uniq + ".png");
    cb(null, `${new Date().toISOString().replace(/:/g, "-")}${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image.jfif" || file.mimetype === "") {
    cb(null, true);
    req.isFileValid = true;
  } else {
    req.isFileValid = false;
    req.isFileValidMessage = "Only .jpeg or .png files are accepted";
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * Math.pow(1024, 4) },
  fileFilter: fileFilter,
});

// jika ingin menggunakan batch pada multer
// const uploadArray = upload.array('photo', 10);

module.exports = upload;
