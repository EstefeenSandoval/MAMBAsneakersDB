const express = require('express');
const router = express.Router();
const Billing = require('../models/billing.model');

// Crear una nueva factura con productos
router.post('/create', async (req, res) => {
  try {
    const { billing, products, envio } = req.body; // Extraemos los datos de la factura y los productos
    const result = await Billing.create(billing, products, envio);
    res.json({ success: true, message: 'Factura creada con éxito', result });
  } catch (error) {
    console.error('Error al crear factura:', error);
    res.status(500).json({ success: false, error: 'Error al crear factura' });
  }
});

// Obtener todas las facturas con sus productos
router.get('/all', async (req, res) => {
  try {
    const bills = await Billing.getAll();
    res.json({ success: true, bills });
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    res.status(500).json({ success: false, error: 'Error al obtener facturas' });
  }
});

module.exports = router;
