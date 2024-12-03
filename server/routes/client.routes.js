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
      res.status(500).json({ success: false, error: 'Error al obtener favProds' });
    }
  });

  router.get('/edoEnvios', async (req, res) => {
    try {
      const fav = await client.edoEnvios(); // Usamos el método getAll para obtener los productos
      res.json(fav); // Respondemos con los productos en formato JSON
    } catch (error) {
      console.error('Error al obtener edoEnvios Clientes:', error);
      res.status(500).json({ success: false, error: 'Error al obtener edoEnvios' });
    }
  });

  router.get('/byWeek', async (req, res) => {
    try {
      const fav = await client.byWeek(); // Usamos el método getAll para obtener los productos
      res.json(fav); // Respondemos con los productos en formato JSON
    } catch (error) {
      console.error('Error al obtener edoEnvios Clientes:', error);
      res.status(500).json({ success: false, error: 'Error al obtener byWeek' });
    }
  });

  router.get('/avg', async (req, res) => {
    try {
      const fav = await client.avg(); // Usamos el método getAll para obtener los productos
      res.json(fav); // Respondemos con los productos en formato JSON
    } catch (error) {
      console.error('Error al obtener avg Clientes:', error);
      res.status(500).json({ success: false, error: 'Error al obtener avg' });
    }
  });

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
