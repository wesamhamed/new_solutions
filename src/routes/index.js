require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/password.js");
const { select, insert } = require("../database")

router.post("/signup", async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const hash = await hashPassword(password);

    let results = await select(["email", "password"], "users", `WHERE email='${email}'`);
    const user = results.rows[0];

    if (!user) {
        const data = {...req.body, password: hash };
        let result = await insert("users", data, "RETURNING id");
        const id = result.rows[0].id;
        const payload = { id, email };
        const token = jwt.sign(payload, process.env.SECRET_TOKEN);
        req.isAuthenticated = true;
        req.user = payload;
        return res.status(201).json({ token });

    }
    return res.status(400).json({ message: "User already exist" })

});

router.post("/signin", async(req, res) => {
    const { email, password } = req.body;
    //sure that user exist 
    let results = await select(["email", "password"], "users", `WHERE email='${email}'`);
    const user = results.rows[0];
    const id = user.id;
    const passwordValid = await comparePassword(password, user.password);
    if (user && passwordValid) {
        const token = jwt.sign({ id, email }, process.env.SECRET_TOKEN);
        req.isAuthenticated = true;
        return res.status(200).json({ token });
    }
    return res.status(401).json({ message: "Your unauthorized" })

});

router.get("/signout", async(req, res) => {
    req.isAuthenticated = false;
    res.redirect("/api/v1/signin")
})
module.exports = router;