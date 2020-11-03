require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/password.js")


router.get('/:id', (req, res) => {
    //get company
    res.send("get company")
})

router.post('/', (req, res) => {
    //create company
    res.send("create company")
})

router.put('/', (req, res) => {
    //edit company
    res.send("edit company");
})

router.delete('/:id', (req, res) => {
    //delete compant
    res.send("delete company");
})


module.exports = router;