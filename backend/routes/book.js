const express = require('express');
const { postBook, getBooks, getBookbyID, getBestRating} = require("../controllers/book.js")
const {upload} = require('../middleware/multer.js')
const auth = require('../middleware/auth');

const booksRouter = express.Router();
booksRouter.get("/", getBooks);
booksRouter.get("/bestrating", getBestRating);
booksRouter.get("/:id", getBookbyID);
booksRouter.post("/", auth, upload.single("image"), postBook);
//booksRouter.delete("/:id",auth, deleteBook);
//booksRouter.put("/:id", auth,updateBook);
//booksRouter.post("/:id/rating",auth, rateBookbyID);

module.exports = { booksRouter};
