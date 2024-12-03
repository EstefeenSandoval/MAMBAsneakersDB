const express = require('express');
const router = express.Router();
const Client = require('../models/client.model');

// Crear un cliente
router.post('/create', async (req, res) => {
  try {
    const result = await Client.create(req.body);
    res.json({ success: true, message: 'Cliente creado', result });
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ success: false, error: 'Error al crear cliente' });
  }
});

// Leer todos los clientes
router.get('/all', async (req, res) => {
  try {
    const clients = await Client.getAll();
    res.json(clients);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ success: false, error: 'Error al obtener clientes' });
  }
});

// Actualizar un cliente
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Client.update(id, req.body);
    res.json({ success: true, message: 'Cliente actualizado', result });
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ success: false, error: 'Error al actualizar cliente' });
  }
});

// Eliminar un cliente
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Client.delete(id);
    res.json({ success: true, message: 'Cliente eliminado', result });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ success: false, error: 'Error al eliminar cliente' });
  }
});

module.exports = router;
