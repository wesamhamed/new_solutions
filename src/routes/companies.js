require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/password.js")
const { select, insert, update, remove } = require("../database");

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const results = await select("id", "companies", `WHERE id=${id}`);
    const company = results.rows[0];
    if (!company) {
        return res.status(400).json({ message: "Company not found" });
    }
    return res.json(company);

})

router.post('/', async(req, res) => {
    const { id, name, profileId, addressId } = req.body;

    const results = await select("id", "companies", `WHERE id=${id}`)
    const company = results.rows[0];
    if (!company) {
        const data = {...req.body };
        let result = await insert("companies", data, "RETURNING *");
        return res.status(201).json(data)
    }
    return res.status(400).json({ message: "Company found" });
})

router.put('/', async(req, res) => {
    const { id, name, profileId, addressId } = req.body;

    let results = await select("id", "companies", `WHERE id=${id}`)
    const company = results.rows[0];
    if (!company) {
        return res.status(400).json({ message: "company not found" });
    }
    const data = {...req.body }
    let updatedData = await update("companies", data, `WHERE id =${id} RETURNING *`);
    res.json(updatedData.rows[0]);
})

router.delete('/:id', async(req, res) => {
    const id = req.params.id;
    const results = await select("id", "companies", `WHERE id=${id}`);
    const company = results.rows[0];
    if (!company) {
        return res.status(400).json({ message: "company not found" });
    }
    let deletedData = await remove("companies", `WHERE id=${id} RETURNING *`)
    return res.json(deletedData.rows[0]);
})


module.exports = router;