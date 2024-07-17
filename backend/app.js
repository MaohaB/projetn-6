const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./models/user.js');
const { Book } = require('./models/book');
const {testbooks} = require('./models/testbooks.js')


//const { UserLogin, UserLogin } = require("./controllers/user.js")
//const { postBook, getBooks } = require("./controllers/book.js")
//const { booksRouter } = require("./controllers/book.js")
//const { usersRouter } = require("./controllers/user.js")

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer')

const upload = multer({
    dest: "uploads/"
});


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

app.post('/api/auth/signup', UserSignup) ;
app.post('/api/auth/login', UserLogin) ;
app.get('/api/books', getBooks);
app.post('/api/books',upload.single("image"), postBook);

// app.use("/api/books", booksRouter);
// app.use("/api/auth", usersRouter);

//User.deleteMany({}).then(() => {console.log("users deleted");})
//Book.deleteMany({}).then(() => {console.log("books deleted");})

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
app.post('/api/auth/login', UserLogin) ;
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





// fonction afficher les livres
app.get('/api/books', getBooks);
function getBooks(req,res) { 
    res.send(testbooks);
}


// fonction Ajouter un livre
app.post('/api/books',upload.single("image"), postBook);
async function postBook(req,res) {
    const file = req.file;
    console.log("file.", file);
    const body = req.body;
    console.log("body", body);
    const Stringbook = body.book;
    const book = JSON.parse(Stringbook);
    book.imageUrl = file.path;
    try {
    const result = await Book.create(book);
    console.log('result',result);
    res.send("new book: "+ book.title+ " posted");
} catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong:" + e.message);
    return;
}
};

function importexistingBooks(testbooks){

}