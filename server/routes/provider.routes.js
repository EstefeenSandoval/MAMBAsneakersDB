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

// Leer todos los proveedores
router.get('/all', async (req, res) => {
  try {
    const providers = await Provider.getAll();
    res.json(providers);
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

module.exports = router;
