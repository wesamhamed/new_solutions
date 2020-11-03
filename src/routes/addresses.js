require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/password.js")
const { select, insert, update, remove } = require("../database");

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const results = await select("id", "addresses", `WHERE id=${id}`);
    const address = results.rows[0];
    if (!address) {
        return res.status(400).json({ message: "Addresses not found" });
    }
    return res.json(address);

})

router.post('/', async(req, res) => {
    const { id, cityId, counteryId } = req.body;

    const results = await select(["id", "cityId", "counteryId"], "profiles", `WHERE id=${id}`)
    const address = results.rows[0];
    if (!address) {
        const data = {...req.body };
        let result = await insert("addresses", data, "RETURNING id");
        return res.status(201).json(data)
    }
    return res.status(400).json({ message: "Addresses found" });
})

router.put('/', async(req, res) => {
    const { id, cityId, counteryId } = req.body;
    // const userId = req.user.id;
    let results = await select("id", "addresses", `WHERE id=${id}`)
    const address = results.rows[0];
    if (!address) {
        return res.status(400).json({ message: "address not found" });
    }
    const data = {...req.body }
    let updatedData = await update("addresses", data, `WHERE id =${id} RETURNING id,"userName"`);
    res.json(updatedData.rows[0]);
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const results = await select("id", "addresses", `WHERE id=${id}`);
    const address = results.rows[0];
    if (!address) {
        return res.status(400).json({ message: "address not found" });
    }
    let deletedData = await remove("addresses", `WHERE id=${id} RETURNING *`)
    return res.json(deletedData.rows[0]);
})


module.exports = router;