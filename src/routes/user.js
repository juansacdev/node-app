const { Router } = require('express');
const router = Router();


router.get('/user/signin', (req, res) => {
    res.send('Ingresando a la app');
});

router.get('/user/signup', (req, res) => {
    res.send('formulario de auntenticación');
});









module.exports = router;