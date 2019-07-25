const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = Schema({
    nombre: { type: String, require: true },
    edad: { type: Number, require: true },
    password: { type: String, require: true }
});

module.exports = mongoose.model('usuario', usuarioSchema);