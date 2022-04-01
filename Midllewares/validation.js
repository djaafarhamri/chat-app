const fs = require("fs");

module.exports = (req, res, next) => {
  if (typeof req.file === undefined || typeof req.body === undefined) {
    // if error
    return res.status(400).json({
      message: "Please upload a file and fill the form",
    });
  }
  // get image and name
  const name = req.body.name;
  const image = req.file.path;
  // check type of image we will accept only png and jpeg and jpg
  const type = req.file.mimetype;
  if (type !== "image/png" && type !== "image/jpeg" && type !== "image/jpg") {
    // if error
    fs.unlinkSync(image);
    return res.status(400).json({
      message: "Please upload a valid image",
    });
  }
  // check if name is empty
  if (name === "") {
    // if error
    return res.status(400).json({
      message: "Please enter a name",
    });
  }
  // check file size max =2 mb
  const size = req.file.size;
  if (size > 2000000) {
    // if error
    fs.unlinkSync(image);
    return res.status(400).json({
      message: "Please upload a valid image",
    });
  }
  next();
};
