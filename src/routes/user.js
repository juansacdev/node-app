const { Router } = require('express');
const router = Router();


router.get('/user/signin', (req, res) => {
    res.render('user/signin');
});

router.get('/user/signup', (req, res) => {
    res.render('user/signup');
});











module.exports = router;