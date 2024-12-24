const express = require('express');
const router = express.Router();
const styleController = require('../controllers/styleController'); // controller'ı doğru bir konuma yerleştirin



// Belirli bir stil önerisi al
router.get('/:style', styleController.getStyleRecommendation);

module.exports = router;
