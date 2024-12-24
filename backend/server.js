const express = require('express');
const app = require('./app'); // app.js'deki Express uygulamasını içe aktarır

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});