const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./mongodb/mongo.js');

//const User = require('./models/user.js');

const app = express();
const PORT = 4000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

//app.get('/', function (req, res) { res.send("Hello World!");});
  
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port: ", PORT);
})


const users = [];
app.post('/api/auth/signup', UserSignup) ;

async function UserSignup(req,res) {
const body = req.body;
//console.log("body", body)
const email = req.body.email
const password = req.body.password

const user = {
    email: email,
    password: password
};

const Userdatabase = await User.findOne({ 
    email: body.email
});
console.log("Userdatabase", Userdatabase)
if (Userdatabase != null) {
    res.status(400).send("Email déjà utiisé");
    return;
}

try {
   await User.create(user);
} catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong");
    return;
}

// message string
res.send("sign up user: "+ email);
};



app.post('/api/auth/login', UserLogin) ;
async function UserLogin(req,res) {
const body = req.body;
console.log("body", body)

const Userdatabase = await User.findOne({ 
    email: body.email
});
console.log(Userdatabase)
if (Userdatabase == null) {
    res.status(401).send("Cet utilisateur n'existe pas");
    return;
}
const passwordfromDatabase = Userdatabase.password;
if (passwordfromDatabase != body.password) {
    res.status(401).send("Mauvais couple d'identifiants");
    return;
}
// userID + token
res.send({
    userId: Userdatabase._id,
    token: "string"});
};