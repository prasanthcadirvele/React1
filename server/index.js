require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Connected to Mongo DB Database');

    const db = client.db();

    const productRoutes = require('./routes/products');

    app.use('/api/products', (req, res, next) => {
        req.db = client.db();
        next();
    }, productRoutes);


    // Start the server
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
