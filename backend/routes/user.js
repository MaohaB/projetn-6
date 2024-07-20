const express = require('express');
const { UserSignup, UserLogin } = require("../controllers/user.js")
const usersRouter = express.Router();


usersRouter.post("/signup", UserSignup);
usersRouter.post("/login", UserLogin);
module.exports = { usersRouter};
