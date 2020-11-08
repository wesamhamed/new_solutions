require('dotenv').config();
const express = require("express");
const router = express.Router();
const { signupUser, signinUser, signoutUser } = require("../controllers/userController");

router.post("/signup", signupUser);

router.post("/signin", signinUser);

router.get("/signout", signoutUser);


module.exports = router;