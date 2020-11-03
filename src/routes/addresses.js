require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/password.js")


router.get('/:id', (req, res) => {
    //get address
    res.send("get address")
})

router.post('/', (req, res) => {
    //create address
    res.send("create address")
})

router.put('/', (req, res) => {
    //edit address
    res.send("edit address");
})

router.delete('/:id', (req, res) => {
    //delete compant
    res.send("delete address");
})


module.exports = router;