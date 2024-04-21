const path = require('path');

const router = require('express').Router();

const { verifyToken } = require('../helpers/verifyToken');
const { getProfileData } = require('../controllers/getProfileData');
const upload = require('../middlewares/imageUpload');
const Resize = require('../helpers/resize');
const User = require('../models/user.model');


router.get('/', verifyToken, async (req, res) => {
    const profileData = await getProfileData(req.userId);
    res.render('profile', { title: 'Account Profile', firstName: profileData.firstName, profileData });
});

router.put('/avatar-upload', verifyToken, upload.single('avatar'), async (req, res) => {
    const userId = req.userId;

    const imagePath = path.join(__dirname, '..', '/public/assets/images/uploaded_avatar');
    const fileUpload = new Resize(imagePath, userId);

    if (!req.file) {
        return res.status(400).json({ message: 'Please provide an image' });
    }

    // const filename = await fileUpload.save(req.file.buffer);
    const filename = await fileUpload.saveFromFile(req.file.path);
    const user = await User.findById(userId).exec();

    user.image = filename;
    await user.save();

    res.status(200).json({ message: 'Image uploaded successfully', image: filename });
})

module.exports = router;