const express = require('express');
const { postBook, getBooks, getBookbyID, getBestRating} = require("../controllers/book.js")
const {upload} = require('../middleware/multer.js')

const booksRouter = express.Router();
booksRouter.get("/", getBooks);
booksRouter.get("/bestrating", getBestRating);
booksRouter.get("/:id", getBookbyID);
booksRouter.post("/",upload.single("image"), postBook);

module.exports = { booksRouter};
