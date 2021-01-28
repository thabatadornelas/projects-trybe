const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'images'),
  filename: (req, _file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const uploadImage = multer({ storage }).single('image');

module.exports = uploadImage;
