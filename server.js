const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const { initDb } = require('./data/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
  res.send('E-commerce API - Server is running!');
});

initDb((err, db) => {
    if (err) {
        console.error('Failed to connect to the database', err);
    } else {
        console.log('Connected to the database');

        app.use('/product', productRoutes);
        app.use('/category', categoryRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }   
});




