const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/products');
const app = express();
const connectDB = require('./config/db.js');
require('dotenv').config();


//Conectar a la Base de Datos 
connectDB();

//Middleware
app.use(express.json());
app.use(cors());

app.use('/api/products', require('./routers/products'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
