const { Router } = require('express');
const router = Router();


router.get('/', (req, res, cb) => {
    res.send('This page it\'s the Index');
    cb(console.log('Holi! Acabas de acceder'));
});

router.get('/about', (req, res) => {
    res.send('This page it\'s the About');
});









module.exports = router;