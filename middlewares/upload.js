const multer = require('multer');
const path = require('path');

const destination = path.resolve('tmp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePreffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      req.user.email.split('@')[0];
    const { originalname } = file;
    const filename = `${uniquePreffix}_${originalname}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
