require('dotenv').config();
const express = require("express");
const router = express.Router();
const { getAddressById, createAddress, updateAddress, deleteAddressById } = require("../controllers/addressController");

router.get('/:id', getAddressById);

router.post('/', createAddress);

router.put('/:id', updateAddress);

router.delete('/:id', deleteAddressById);


module.exports = router;