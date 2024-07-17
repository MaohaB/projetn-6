
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('./models/user.js');

const jwt = require('jsonwebtoken');




// S'inscrire
async function UserSignup(req,res) {
const body = req.body;
//console.log("body", body)
const email = req.body.email
const password = req.body.password

const user = {
    email: email,
    password: hashPassword(password)
};

const Userdatabase = await User.findOne({ 
    email: body.email
});
console.log("Userdatabase", Userdatabase)
if (Userdatabase != null) {
    res.status(400).send(email + " déjà utiisé");
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

// Hasher le password
function hashPassword(password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}


//fonction login

async function UserLogin(req,res) {
const body = req.body;
console.log("body", body)

const Userdatabase = await User.findOne({ 
    email: body.email
});
console.log(Userdatabase)
if (Userdatabase == null) {
    res.status(401).send("Cet utilisateur,"+ email +", n'existe pas");
    return;
}
const passwordfromDatabase = Userdatabase.password;
bcrypt.compare(body.password, passwordfromDatabase)
.then(valid => {
    if (!valid) {
        return res.status(401).send("Mauvais couple d'identifiants");
    }
// userID + token
res.send({
    userId: Userdatabase._id,
    token: jwt.sign(
        { userId: Userdatabase._id },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
    )
});
}
)

}






const usersRouter = express.Router();
usersRouter.get("/", UserSignup);
usersRouter.get("/", UserLogin);
module.exports = { usersRouter};


//module.exports = { UserSignup, UserLogin };