require('dotenv').config();
const express = require("express");
const router = express.Router();
const { check } = require('express-validator');
const validate = require("../utils/validatorRoute");

const { getAddressById, createAddress, updateAddress, deleteAddressById } = require("../controllers/addressController");

router.get('/:id', validate([
    check('id').notEmpty().trim().escape().isNumeric().withMessage("Must provide valid id")
]), getAddressById);

router.post('/', validate([
    check('id').notEmpty().trim().escape().isNumeric().withMessage("Must provide valid id"),
    check("cityId").notEmpty().trim().escape().isNumeric(),
    check("counteryId").notEmpty().trim().escape().isNumeric()
]), createAddress);

router.put('/:id', validate([
        check("id").notEmpty().trim().escape().isNumeric(),
        check("cityId").notEmpty().trim().escape().isNumeric(),
        check("counteryId").not().isEmpty().trim().escape().isNumeric()
    ]),
    updateAddress);

router.delete('/:id', validate([
    check("id").notEmpty().trim().escape()
]), deleteAddressById);


module.exports = router;