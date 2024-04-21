const router = require('express').Router();

const validator = require('../middlewares/validator');
const { register } = require('../controllers');


router.get('/', (req, res) => {
    res.render('signup', { title: 'Sign up' });
    // console.log('get signup');
})


router.post('/', validator.register, register);


router.use('/', (error, req, res, next) => {
    if (error) console.log('error');
})


module.exports = router;