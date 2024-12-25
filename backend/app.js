const express = require('express');
const cors = require('cors');  // Import cors
const app = express();

// Import your route files
const colorRoutes = require('./src/routes/colorRoutes');
const styleRoutes = require('./src/routes/styleRoutes');

// Enable CORS for all routes
app.use(cors());  // Add this line here

// Rotaları kullanmak için /color ve /style prefix ekleyelim
app.use('/color', colorRoutes);  // /color/... yolunu kullanarak renk rotasına erişim
app.use('/style', styleRoutes);  // /style/... yolunu kullanarak stil rotasına erişim

module.exports = app;
