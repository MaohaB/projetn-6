const express = require('express');
const { postBook, getBooks } = require("../controllers/book.js")
const {upload} = require('../middleware/multer.js')

const booksRouter = express.Router();
booksRouter.get("/", getBooks);
booksRouter.post("/",upload.single("image"), postBook);

module.exports = { booksRouter};
