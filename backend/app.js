const express = require('express');
const app = express();
const PORT = 4000;
const cors = require("cors");
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jimbob:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(cors());
app.use(express.json());

//app.get('/', function (req, res) { res.send("Hello World!");});
  
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

app.post('/api/auth/signup', UserSignup) ; 
function UserSignup(req,res) {
const body = req.body;
console.log("body", body)
// message string
res.send("sign up");
};
app.post('/api/auth/login', UserLogin) ;
function UserLogin(req,res) {
const body = req.body;
console.log("body", body)
// userID + token
res.send({
    userId: "string",
    token: "string"});
};