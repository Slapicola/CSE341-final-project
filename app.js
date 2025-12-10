const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

if (!process.env.JEST_WORKER_ID) {
  require('dotenv').config();
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);

module.exports = app;
