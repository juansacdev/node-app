const { Router } = require('express');
const router = Router();



//Ingreso
router.get('/user/signin', (req, res) => {
    res.render('user/signin');
});


//Registro
router.get('/user/signup', (req, res) => {
    res.render('user/signup');
});

router.post('/user/signup', (req, res) => {
    console.log(req.body);
    res.send('ok');
});










module.exports = router;