const multer = require('multer')
const express = require('express');
const mongoose = require('mongoose');
const { Book } = require('./models/book');
const {testbooks} = require('./models/testbooks.js')
const upload = multer({
    dest: "uploads/"
});
app.use(express.json());
 app.use("/uploads", express.static("uploads"));



 

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



// const booksRouter = express.Router();
// booksRouter.get("/", getBooks);
// booksRouter.post("/",upload.single("image"), postBook);

// module.exports = { booksRouter};
module.exports = { getBooks, postBook };