const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
const db = require('./conexion'); 

//Routes
const clientRoutes = require('./routes/client.routes');
const productRoutes = require('./routes/product.routes');
const providerRoutes = require('./routes/provider.routes');

// Middlewares
const cors = require('cors');
app.use(cors());
/* 
app.get('/', (req, res) => {
  res.json({message:"Server's answer!"});

}); */

app.use('/products', productRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
