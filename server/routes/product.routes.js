const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

// Ruta para obtener todos los productos
router.get('/all', async (req, res) => {
  try {
    const products = await Product.getAll(); // Usamos el método getAll para obtener los productos
    res.json(products); // Respondemos con los productos en formato JSON
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ success: false, error: 'Error al obtener productos' });
  }
});

// Ruta para obtener top 5 ventas
router.get('/topThreeBestSellers', async (req, res) => {
  try {
    const product = await Product.getTopThreeBestSellers(); // Usamos getById con el ID proporcionado
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    res.json(product); // Respondemos con el producto en formato JSON
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ success: false, error: 'Error al obtener el producto' });
  }
});

// Ruta para obtener top 10 ingresos por producto
router.get('/getTopIncomesPerProduct', async (req, res) => {
  try {
    const product = await Product.getTopIncomesPerProduct(); // Usamos getById con el ID proporcionado
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    res.json(product); // Respondemos con el producto en formato JSON
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ success: false, error: 'Error al obtener el producto' });
  }
});

// Ruta para obtener bajas existencias en productos
router.get('/getLowExcistence', async (req, res) => {
  try {
    const product = await Product.getLowExcistence(); // Usamos getById con el ID proporcionado
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    res.json(product); // Respondemos con el producto en formato JSON
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ success: false, error: 'Error al obtener el producto' });
  }
});

// Ruta para obtener el promedio de descuentos
router.get('/getAvgDiscount', async (req, res) => {
  try {
    const product = await Product.getAvgDiscount(); // Usamos getById con el ID proporcionado
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    res.json(product); // Respondemos con el producto en formato JSON
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ success: false, error: 'Error al obtener el producto' });
  }
});

// Ruta para obtener el promedio de descuentos
router.get('/getBillings', async (req, res) => {
  try {
    const product = await Product.getBillings(); // Usamos getById con el ID proporcionado
    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }
    res.json(product); // Respondemos con el producto en formato JSON
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ success: false, error: 'Error al obtener el producto' });
  }
});

// Crear un nuevo producto
router.post('/create', async (req, res) => {
  try {
    const result = await Product.create(req.body);
    res.json({ success: true, message: 'Producto creado', result });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ success: false, error: 'Error al crear producto' });
  }
});

// Actualizar un producto
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.update(id, req.body);
    res.json({ success: true, message: 'Producto actualizado', result });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ success: false, error: 'Error al actualizar producto' });
  }
});

// Eliminar un producto
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.delete(id);
    res.json({ success: true, message: 'Producto eliminado', result });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ success: false, error: 'Error al eliminar producto' });
  }
});

module.exports = router;