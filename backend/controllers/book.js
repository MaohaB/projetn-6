const express = require('express');
const mongoose = require('mongoose');
const { Book } = require('../models/book');
const {testbooks} = require('../models/testbooks.js')
const {upload} = require('../middleware/multer.js')

 const app = express();
 const cors = require("cors");
 
 
 app.use(cors());
 app.use(express.json());
 app.use("/uploads", express.static("uploads"));
 

// fonction afficher les livres
app.get('/api/books', getBooks);
async function getBooks(req,res) { 
    const databasebooks = await Book.find();
    res.send(databasebooks);
}


// fonction Ajouter un livre
app.post('/api/books',upload.single("image"), postBook);
async function postBook(req,res) {
    const file = req.file;
    const filename = file.filename;
    console.log("file.", filename);
    const body = req.body;
    console.log("body", body);
    const Stringbook = body.book;
    const book = JSON.parse(Stringbook);
    book.imageUrl = "http://localhost:4000/uploads/" +filename;
    try {
    const result = await Book.create(book);
    console.log('result',result);
    res.send("Le livre "+ book.title+ " a bien été ajouté !");
} catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong:" + e.message);
    return;
}
};

async function getBookbyID(req,res) {
  const id = req.params.id;
  try {
  const singlebook = await Book.findById(id)
  if ( singlebook == null) {
    res.status(404).send("Book not found");
  return;
  }
  singlebook.imageUrl = singlebook.imageUrl
  res.send(singlebook);
} catch (e) {
  console.error(e);
  res.status(500).send("Something went wrong"+ e.message);
}
};

// fonction pour ajouté des livres "test" à la base de donnée mongo
async function pushExistingBooks(books) {
    for (const book of books) {
        try {
          const result = await Book.create(book);
          console.log(`Le livre ${result.title} de ${result.author} a été inséré à la base de données`);
        } catch (error) {
          console.error(`Erreur lors de l'insertion du livre: ${error.message}`);
        }
      }
    console.log('Tous les livres ont été traités');
    };
 //pushExistingBooks(testbooks)



 // Exporter les fonctions
module.exports = { getBooks, postBook, getBookbyID};