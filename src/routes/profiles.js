require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/password.js")
const { select, insert, update, remove } = require("../database");

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const results = await select("id", "profiles", `WHERE id=${id}`);
    const profile = results.rows[0];
    if (!profile) {
        return res.status(400).json({ message: "Profile not found" });
    }
    return res.json(profile);

})

router.post('/', async(req, res) => {
    const { id, userName } = req.body;

    const results = await select(["id", "userName"], "profiles", `WHERE id=${id}`)
    const profile = results.rows[0];
    if (!profile) {
        const data = {...req.body };
        let result = await insert("profiles", data, "RETURNING *");
        return res.status(201).json(result.rows[0])
    }
    return res.status(400).json({ message: "Profile found" });
})

router.put('/', async(req, res) => {
    const { id, userName } = req.body;

    let results = await select(["id", "userName"], "profiles", `WHERE id=${id}`)
    const profile = results.rows[0];
    if (!profile) {
        return res.status(400).json({ message: "Profile not found" });
    }
    const data = {...req.body }
    let updatedData = await update("profiles", data, `WHERE id =${id} RETURNING *`);
    res.json(updatedData.rows[0]);
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const results = await select("id", "profiles", `WHERE id=${id}`);
    const profile = results.rows[0];
    if (!profile) {
        return res.status(400).json({ message: "Profile not found" });
    }
    let deletedData = await remove("profiles", `WHERE id=${id} RETURNING *`)
    return res.json(deletedData.rows[0]);
})


module.exports = router;