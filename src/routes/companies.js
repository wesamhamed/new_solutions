require('dotenv').config();
const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const { getCompanyById, createCompany, updateCompany, deleteCompany } = require("../controllers/companyController")
const validate = require("../utils/validatorRoute");

router.get('/:id', validate([
    check("id").notEmpty().escape().trim().isNumeric(),

]), getCompanyById);

router.post('/', validate([
    check("id").notEmpty().escape().trim().isNumeric(),
    check("name").notEmpty().trim().escape(),
    check("profileId").notEmpty().escape().trim().isNumeric(),
    check("addressId").notEmpty().escape().trim().isNumeric()
]), createCompany);

router.put('/:id', validate([
    check("id").notEmpty().escape().trim().isNumeric(),
    check("name").notEmpty().trim().escape(),
    check("profileId").notEmpty().escape().trim().isNumeric(),
    check("addressId").notEmpty().escape().trim().isNumeric()
]), updateCompany);

router.delete('/:id', validate([check("id").notEmpty().escape().trim().isNumeric()]), deleteCompany);


module.exports = router;