const express = require('express');
const router = express.Router();
const client = require('../models/client.model');

// Ruta para obtener todos los productos
router.get('/top3', async (req, res) => {
  try {
    const top = await client.topThree(); // Usamos el método getAll para obtener los productos
    res.json(top); // Respondemos con los productos en formato JSON
  } catch (error) {
    console.error('Error al obtener topThree Clientes:', error);
    res.status(500).json({ success: false, error: 'Error al obtener topThree' });
  }
});

router.get('/favProds', async (req, res) => {
    try {
      const fav = await client.favProds(); // Usamos el método getAll para obtener los productos
      res.json(fav); // Respondemos con los productos en formato JSON
    } catch (error) {
      console.error('Error al obtener topThree Clientes:', error);
      res.status(500).json({ success: false, error: 'Error al obtener topThree' });
    }
  });

module.exports = router;