const mongoose = require('mongoose');
const mongo = require('../mongodb/mongo');


    const userSchema = mongoose.Schema({
        email : String , //adresse e-mail de l’utilisateur [unique]
        password : String //mot de passe haché de l’utilisateur
    });
    
    
    
    const User = mongoose.model("User", userSchema);
    
    module.exports = {User}