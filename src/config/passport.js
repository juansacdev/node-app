const passport = require('passport');
const { Strategy }= require('passport-local');
const User = require('../models/User');

//Autenticacion
passport.use(new Strategy({
    usernameField: 'email',
}, async (email, password, cb) => {
    const user = await User.findOne({email: email});
    if (!user) {
        return cb(null, false, {message: 'Not user found.'});
    } else {
        const match = await User.getMatchPassword(password)
        if (match) {
            return cb(null, user)
        } else {
            return cb(null, false, {message: 'Incorrect Password'})
        }
    }
}));


passport.serializeUser((user, cb) => {
    
})