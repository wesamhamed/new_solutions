require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/password.js")
const { select, insert, update } = require("../database");

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const results = await select("id", "profiles", `WHERE id=${id}`);
    const profile = results.rows[0];
    if (!profile) {
        return res.status(400).json({ message: "Profile not found" });
    }
    return res.json(profile);

})

router.post('/', (req, res) => {
    //create profile
    res.send("create profile")
})

router.put('/', (req, res) => {
    //edit profile
    res.send("edit profile");
})

router.delete('/:id', (req, res) => {
    //delete profile
    res.send("delete profile");
})


module.exports = router;