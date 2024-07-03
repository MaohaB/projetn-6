const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : String , //adresse e-mail de l’utilisateur [unique]
    password : String //mot de passe haché de l’utilisateur
});



const {User} = mongoose.model('User', userSchema);

const leila = new User({
    email : "leila",
    password : "test"
})
leila.save().then(() => console.log("saved"));
module.exports = {User}






module.exports = mongoose.model('User', userSchema);