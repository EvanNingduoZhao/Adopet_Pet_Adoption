const express = require('express');
const path = require('path');


const app = express();

// Pets API routes
app.use('/api/pets',require('./routes/api/pets'))

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))