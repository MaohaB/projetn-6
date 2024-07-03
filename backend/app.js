const express = require('express');
const mongoose = require('mongoose');
require('./mongodb/mongo.js');

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

function UserSignup(req,res) {
const body = req.body;
console.log("body", body)
const email = req.body.email
const password = req.body.password

const user = {
    email: email,
    password: password
};
// message string
res.send("sign up");
};



app.post('/api/auth/login', UserLogin) ;
function UserLogin(req,res) {
const body = req.body;
console.log("body", body)
console.log("existing user:", users);
// userID + token
res.send({
    userId: "string",
    token: "string"});
};