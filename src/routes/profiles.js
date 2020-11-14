require('dotenv').config();
const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const { getProfileById, createProfile, updateProfile, deleteProfileById } = require("../controllers/profileController");
const validate = require("../utils/validatorRoute");

router.get('/:id', validate([check("id").notEmpty().trim().escape().isNumeric()]), getProfileById);

router.post('/', validate([
    check("id").notEmpty().trim().escape().isNumeric(),
    check("userName").notEmpty().trim().escape()
]), createProfile)

router.put('/:id', validate([
    check("id").notEmpty().trim().escape().isNumeric(),
    check("userName").notEmpty().trim().escape()
]), updateProfile);

router.delete('/:id', validate([check("id").notEmpty().trim().escape().isNumeric()]), deleteProfileById)


module.exports = router;