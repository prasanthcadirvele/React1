const express = require('express');
const { ObjectID } = require('mongodb');

const router = express.Router();

// Controller functions
const getAllProducts = async (req, res) => {
    const products = await req.db.collection('products').find().toArray();
    res.json(products);
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await req.db.collection('products').findOne({ _id: ObjectID(id) });
    if (!product) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.json(product);
    }
};

const createProduct = async (req, res) => {
    const { name, type, price, rating, warranty_years, available } = req.body;
    const product = {
        name,
        type,
        price,
        rating,
        warranty_years,
        available,
    };
    const result = await req.db.collection('products').insertOne(product);
    res.status(201).json(result.ops[0]);
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, type, price, rating, warranty_years, available } = req.body;
    const updatedProduct = {
        name,
        type,
        price,
        rating,
        warranty_years,
        available,
    };
    const result = await req.db.collection('products').updateOne({ _id: ObjectID(id) }, { $set: updatedProduct });
    if (result.modifiedCount === 0) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.sendStatus(204);
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const result = await req.db.collection('products').deleteOne({ _id: ObjectID(id) });
    if (result.deletedCount === 0) {
        res.status(404).json({ error: 'Product not found' });
    } else {
        res.sendStatus(204);
    }
};

// Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
