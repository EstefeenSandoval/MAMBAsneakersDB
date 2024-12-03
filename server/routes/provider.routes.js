const express = require('express');
const router = express.Router();
const Provider = require('../models/provider.model');

// Crear un proveedor
router.post('/create', async (req, res) => {
  try {
    const result = await Provider.create(req.body);
    res.json({ success: true, message: 'Proveedor creado', result });
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ success: false, error: 'Error al crear proveedor' });
  }
});

// Ruta para obtener todos los proveedores
router.get('/all', async (req, res) => {
  try {
    const providers = await Provider.getAll(); // Usamos el método getAll para obtener los proveedores
    res.json(providers); // Respondemos con los proveedores en formato JSON

  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ success: false, error: 'Error al obtener proveedores' });
  }
});

// Actualizar un proveedor
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Provider.update(id, req.body);
    res.json({ success: true, message: 'Proveedor actualizado', result });
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ success: false, error: 'Error al actualizar proveedor' });
  }
});

// Eliminar un proveedor
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Provider.delete(id);
    res.json({ success: true, message: 'Proveedor eliminado', result });
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ success: false, error: 'Error al eliminar proveedor' });
  }
});
  
// Ruta para obtener todos los proveedores
router.get('/getTopMoreProductsSupplied', async (req, res) => {
    try {
      const providers = await Provider.getTopMoreProductsSupplied(); // Usamos el método getAll para obtener los proveedores
      res.json(providers); // Respondemos con los proveedores en formato JSON
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      res.status(500).json({ success: false, error: 'Error al obtener proveedores' });
    }
});

  // Ruta para obtener las facturas de los proveedores
router.get('/getBilling', async (req, res) => {
    try {
      const providers = await Provider.getBilling(); // Usamos el método getAll para obtener los proveedores
      res.json(providers); // Respondemos con los proveedores en formato JSON
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      res.status(500).json({ success: false, error: 'Error al obtener proveedores' });
    }
});

  // Ruta para obtener el promedio de Proveedores con mayor descuento aplicado a productos
  router.get('/getAvgDiscount', async (req, res) => {
    try {
      const providers = await Provider.getAvgDiscount(); // Usamos el método getAll para obtener los proveedores
      res.json(providers); // Respondemos con los proveedores en formato JSON
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      res.status(500).json({ success: false, error: 'Error al obtener proveedores' });
    }
});

  // Ruta para obtener Productos por proveedor con cantidad baja de existencias
  router.get('/getLowExcistence', async (req, res) => {
    try {
      const providers = await Provider.getLowExcistence(); // Usamos el método getAll para obtener los proveedores
      res.json(providers); // Respondemos con los proveedores en formato JSON
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      res.status(500).json({ success: false, error: 'Error al obtener proveedores' });
    }
});

  // Ruta para obtener 
  router.get('/get', async (req, res) => {
    try {
      const providers = await Provider.getLowExcistence(); // Usamos el método getAll para obtener los proveedores
      res.json(providers); // Respondemos con los proveedores en formato JSON
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      res.status(500).json({ success: false, error: 'Error al obtener proveedores' });
    }
});


module.exports = router;

