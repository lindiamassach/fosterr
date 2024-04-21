const router = require('express').Router();

const { verifyToken } = require('../helpers/verifyToken');
const makePayment = require('../controllers/makePayment');
const { fetchUserName } = require('../controllers/fetchDashboardData');

router.get('/', verifyToken, async (req, res) => {
    const { firstName, lastName } = await fetchUserName(req.userId);
    res.render('transfer', { title: 'Transfers & Bill Payment', firstName, lastName });
})

router.post('/', verifyToken, makePayment);

module.exports = router;