require('dotenv').config();
const express = require("express");
const router = express.Router();
const { getCompanyById, createCompany, updateCompany, deleteCompany } = require("../controllers/companyController")

router.get('/:id', getCompanyById);

router.post('/', createCompany);

router.put('/:id', updateCompany);

router.delete('/:id', deleteCompany);


module.exports = router;