const router = require('express').Router();

const { verifyToken } = require('../helpers/verifyToken');
const { fetchDashboardData, fetchImage } = require('../controllers/fetchDashboardData');

router.get('/', verifyToken, async (req, res) => {
    const dashboardData = await fetchDashboardData(req.userId);
    res.render('index', dashboardData);
});

router.get('/get-image', verifyToken, async (req, res) => {
    const image = await fetchImage(req.userId);
    res.json(image);
});

module.exports = router;