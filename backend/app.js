const express = require('express');
const bodyParser = require('body-parser');
const styleRoutes = require('./src/routes/styleRoutes'); // Style ile ilgili rotalar

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/styles', styleRoutes); // Style API'lerini kullan

module.exports = app;
