const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./models/user.js');
const { Book } = require('./models/book');


// importer les depuis les routes
const { booksRouter } = require("./routes/book.js")
const { usersRouter } = require("./routes/user.js")


const app = express();
const cors = require("cors");

app.get('/', function (req, res) { res.send("Hello World!");});

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


const PORT = 4000;
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port: ", PORT);
})


app.use("/api/books", booksRouter);
app.use("/api/auth", usersRouter);



// FONCTIONS POUR SUPPRIMER TOUTES LES DONNEES DANS LA BASE
//User.deleteMany({}).then(() => {console.log("All users deleted");})
//Book.deleteMany({}).then(() => {console.log("All books deleted");})
