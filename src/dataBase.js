const mongoose = require('mongoose');

mongoose.connect(process.env.URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('[DB] Conectada con exito'))
    .catch(err => console.error(`[DB] ${err}`));