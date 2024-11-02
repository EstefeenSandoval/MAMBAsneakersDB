const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/products', (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }
    res.json(products);
  });
});

module.exports = router;
