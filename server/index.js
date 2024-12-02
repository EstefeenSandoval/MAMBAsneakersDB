const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const db = require('./conexion'); 

// Rutas
const clientRoutes = require('./routes/client.routes');
const productRoutes = require('./routes/product.routes');
const providerRoutes = require('./routes/provider.routes');

// Middlewares
const cors = require('cors');
app.use(cors());

// Rutas
app.use('/products', productRoutes); // Todas las rutas en productRoutes estarán bajo /products

// Ruta de prueba (opcional)
app.get('/', (req, res) => {
  res.json({ message: "Server's answer!" });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
