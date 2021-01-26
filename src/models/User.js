const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name:       {type: String, required: true},
    date:       {type: Date, default: Date.now},
    email:      {type: String, required: true},
    password:   {type: String, required: true},
})

//Encripta password cuando se crea el user
UserSchema.methods.getEncryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};


//Decifra el hash cuando se logea el user
UserSchema.methods.getMatchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


module.exports = mongoose.model('User', UserSchema)