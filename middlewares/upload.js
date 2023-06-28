const multer = require('multer');
const path = require('path');

const destination = path.resolve('tmp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const [uniquePreffix, uniquePreffixAfterAt] = req.user.email
      .replace('.', '_')
      .split('@');
    const type = file.mimetype.split('/')[1];

    const filename = `${uniquePreffix}_${uniquePreffixAfterAt}_avatar.${type}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
