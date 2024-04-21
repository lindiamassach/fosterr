const multer = require('multer');
const path = require('path')

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '/public/assets/images/uploaded_avatar'))
  },
  filename: function (req, file, cb) {
    cb(null, `${req.userId}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

module.exports = upload