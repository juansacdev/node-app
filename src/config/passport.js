const passport = require('passport');
const { Strategy }= require('passport-local');
const User = require('../models/User');


//Autenticacion
passport.use(new Strategy({
    usernameField: 'email',
}, async (email, password, cb) => {
    const user = await User.findOne({email: email});
    if (!user) {
        return cb(null, false, {message: 'Not user found.'}); //Error - passport
    } else {
        const match = await user.getMatchPassword(password)
        if (match) {
            return cb(null, user)
        } else {
            return cb(null, false, {message: 'Incorrect Password'})
        }
    }
}));



//Sesión
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id,(error, user) =>{
        cb(error, user);
    });
});