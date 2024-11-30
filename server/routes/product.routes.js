const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

/* router.get('/products', (req, res) => {
  Product.getAll((err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }
    res.json(products);
  });
}); */

router.get('/all', async (req, res) => {
  try{
    const users = await Product.getAll();
    res.json(users);
  }catch(error){
    console.error('Database error:', error);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
  
}); 



module.exports = router;
