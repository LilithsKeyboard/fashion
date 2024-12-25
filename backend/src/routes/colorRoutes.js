// src/routes/colorRoutes.js
const express = require('express');
const router = express.Router();
const ColorController = require('../controllers/colorController');

// Update route to match /recommend/blue/brown/pink/light
router.get('/:eye_color/:hair_color/:lip_color/:skin_color', ColorController.getRecommendations);

module.exports = router;
