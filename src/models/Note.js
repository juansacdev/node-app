const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
    date:           {type: Date, default: Date.now},
    title:          {type: String, required: true},
    description:    {type: String, required: true},
});


module.exports = mongoose.model('Note', NoteSchema);