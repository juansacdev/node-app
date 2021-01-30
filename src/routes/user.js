const { Router } = require('express');
const router = Router();

const passport = require('passport');
const User = require('../models/User');



//Ingreso
router.get('/user/signin', (req, res) => {
    res.render('user/signin');
});

router.post('/user/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/user/signin',
    failureFlash: true
}));




//Registro
router.get('/user/signup', (req, res) => {
    res.render('user/signup');
});



router.post('/user/signup', async (req, res) => {
    const {name, email, password, confirm_password} = req.body;
    const errors = [];
    if (name.length === 0 || email.length === 0 || password.length === 0 || confirm_password.length === 0) {
        errors.push({text: 'Por favor inserte información en los campos'})
    }
    if ( password !== confirm_password) {
        errors.push({text: 'Password no coinciden'})
    }
    if (password.length < 4 ) {
        errors.push({text: 'Password deberia ser mayor a 4 caracteres '})
    }
    if (errors.length > 0 ){
        res.render('user/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else {
        const emailUser = await User.findOne({email: email});
        if (emailUser) {
            req.flash('errors','El email ya esta en uso');
            res.redirect('/user/signup/');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.getEncryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Estas registrado!');
        res.redirect('/user/signin/');
    }
});


router.get('/user/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})







module.exports = router;