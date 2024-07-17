const mongoose = require('mongoose');

const PASSWORD = "saQXm4NsrcMqU9vY";
const USER = "maoh_";
//const URL_DB = `mongodb+srv://$(USER):$(PASSWORD)@cluster0.x5n4n7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const URL_DB = 'mongodb+srv://maoh_:saQXm4NsrcMqU9vY@cluster0.x5n4n7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect( URL_DB,
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));




    const userSchema = mongoose.Schema({
        email : String , //adresse e-mail de l’utilisateur [unique]
        password : String //mot de passe haché de l’utilisateur
    });
    
    
    
    const User = mongoose.model("User", userSchema);
    
    module.exports = {User}