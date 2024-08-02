const express = require('express');
const mongoose = require('mongoose');
const { Book } = require('../models/book');
const {testbooks} = require('../models/testbooks.js')

 const app = express();
 const cors = require("cors");
 
 
 app.use(cors());
 app.use(express.json());
 app.use("/uploads", express.static("uploads"));
 

// fonction afficher les livres
async function getBooks(req,res) { 
    const databasebooks = await Book.find();
    res.send(databasebooks);
}


// fonction Ajouter un livre

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

async function getBestRating(req,res) {
  try {
const bestrated = await Book.find().sort({ averageRating: -1}).limit(3);
bestrated.forEach(book => {
  book.imageUrl = book.imageUrl
});
res.send(bestrated);
} catch (e) {
  console.error(e);
  res.status(500).send("Something went wrong"+ e.message);
}
}

async function deleteBook(req, res) {
const id = req.params.id;
try {
const book = await Book.findByIdAndDelete(id);
if (book == null) {
  res.status(404).send("Book not found");
  return;
}
// vérifier que le client est la personne qui a créé le livre
const bookuserId = book.userId;
const clientuserId = req.auth.userId;
if ( bookuserId != clientuserId) {
  res.status(403).send("Ce livre n'est pas le votre!");
  return;
}
// sinon
res.send("Le livre associé à l'ID "+ id +" a été supprimé avec succès")
} catch (e) {
  console.error(e);
  res.status(500).send("Something went wrong"+ e.message);
}
}

async function updateBook(req,res) {
  const id = req.params.id;
  const book = req.body; 
  const file = req.file;
  try {
  if (file != null ){
    book.imageUrl = "http://localhost:4000/uploads/" + file.filename;
  }

  await Book.findByIdAndUpdate(id,book);
  res.send("Le livre "+ book.title +" a été modifié avec succès")
  } catch (e) {
    console.error(e);
    res.status(500).send("Something went wrong "+ e.message);
  }
}

async function rateBookbyID(req, res) {
  const bookId = req.params.id;
  const userId = req.body.userId; // Assurez-vous que l'ID de l'utilisateur est envoyé dans le corps de la requête
  const newGrade = req.body.rating;

  console.log('Book ID:', bookId);
  console.log('User ID:', userId);
 // Vérifier que la note est comprise entre 0 et 5
 if (newGrade < 0 || newGrade > 5) {
  return res.status(400).json({ message: "La note doit être comprise entre 0 et 5" });
}

  try {
    if (!bookId) {
      return res.status(400).send("Book ID not provided");
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send("Book not found");
    }

    // Vérifier que le client n'a pas déjà noté le livre
    const existingRating = book.ratings.find(rating => rating.userId === userId);
    if (existingRating) {
      return res.status(403).json({
        message: "Vous avez déjà noté ce livre",
        book: {
          id: book._id,
          title: book.title,
          author: book.author,
          averageRating: book.averageRating,
          ratings: book.ratings
        }
      });
    }

    // Ajouter la nouvelle note
    const newRating = { userId: userId, grade: newGrade };
    book.ratings.push(newRating);

    // Calculer la nouvelle moyenne
    book.averageRating = calculateAverageGrade(book.ratings);
    console.log('Nouvelle note moyenne:', book.averageRating);

    await book.save();

    res.status(200).json({
      message: `Le livre "${book.title}" a maintenant une note moyenne de ${book.averageRating}`,
      book: book
    });

  } catch (error) {
    console.error('Error in rateBookbyID:', error);
    res.status(500).send("Something went wrong: " + error.message);
  }
}

function calculateAverageGrade(ratings) {
  if (ratings.length === 0) {
    return 0;
  }
  const sum = ratings.reduce((acc, rating) => acc + rating.grade, 0);
  return parseFloat((sum / ratings.length).toFixed(1));
}




  

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
module.exports = { getBooks, postBook, getBookbyID, getBestRating, deleteBook, updateBook, rateBookbyID};