require('dotenv').config();
const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const { signupUser, signinUser, signoutUser } = require("../controllers/userController");
const validate = require("../utils/validatorRoute");

router.post("/signup", validate([
    check("firstName").notEmpty().escape().trim(),
    check("lastName").notEmpty().escape().trim(),
    check("email").notEmpty().escape().trim().isEmail(),
    check("password").notEmpty().escape().trim()
]), signupUser);

router.post("/signin", validate([
    check("email").notEmpty().escape().trim().isEmail(),
    check("password").notEmpty().escape().trim()
]), signinUser);

router.get("/signout", signoutUser);


module.exports = router;