const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    email : String , //adresse e-mail de l’utilisateur [unique]
    password : String //mot de passe haché de l’utilisateur
});




module.exports = mongoose.model('User', userSchema);