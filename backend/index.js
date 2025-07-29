require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
