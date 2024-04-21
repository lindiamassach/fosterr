const router = require('express').Router();

router.get('/', (req, res) => {
    res.cookie('ucbi_token', '', { httpOnly: true, maxAge: 10 })
    // res.json('logged out');

    res.redirect('/');
})

module.exports = router;