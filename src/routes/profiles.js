require('dotenv').config();
const express = require("express");
const router = express.Router();
const { getProfileById, createProfile, updateProfile, deleteProfileById } = require("../controllers/profileController");
router.get('/:id', getProfileById);

router.post('/', createProfile)

router.put('/:id', updateProfile);

router.delete('/:id', deleteProfileById)


module.exports = router;