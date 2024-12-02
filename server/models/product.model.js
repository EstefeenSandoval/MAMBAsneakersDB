const db = require('../conexion'); // Asegúrate de que esté correctamente importado

class Product {
  static async getAll() { // Obtiene todos los productos
    try {
      const [rows] = await db.query('SELECT * FROM producto');
      return rows; 
    } catch (err) {
      console.error('Error en la consulta getAll:', err);
      throw err;
    }
  }

  static async getTopThreeBestSellers() { // Top 5 productos más vendidos - Consulta los productos más vendidos según la cantidad total en todas las facturas
    try {
      const [rows] = await db.query(`
        SELECT 
            p.Nombre_Prod AS Producto, 
            p.PrecioUnit_prod AS Precio,
            p.Imagen_Prod AS Img,
            SUM(fp.Cantidad) AS CantidadVendida 
        FROM 
            producto p 
        JOIN 
            factura_producto fp 
        ON 
            p.ID_Prod = fp.ProductoID
        GROUP BY 
            p.ID_Prod 
        ORDER BY 
            CantidadVendida DESC 
        LIMIT 3;
    `);
    return rows; 
    } catch (err) {
      console.error('Error en la consulta getAll:', err);
      throw err;
    }
  }
}

module.exports = Product;
