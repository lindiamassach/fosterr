const router = require('express').Router();

const validator = require('../middlewares/validator');
const { handleError } = require('../middlewares/validator');
const { login } = require('../controllers');

router.get('/', (req, res) => {
    res.render('login', { title: 'Login' });
    // console.log('get login');
})

router.post('/', validator.login, login);


router.use('/', (error, req, res, next) => {
    console.log(error);
})


module.exports = router;