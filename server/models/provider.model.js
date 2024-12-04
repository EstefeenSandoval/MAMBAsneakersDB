const db = require('../conexion'); // Asegúrate de que esté correctamente importado

class Provider {
  static async getAll() { // Obtiene todos los proveedores
    try {
      const [rows] = await db.query(`
        
                -- Proveedores que han suministrado más de 10 productos en cualquier factura
        SELECT DISTINCT 
            pr.Nombre_Prov AS Proveedor
        FROM 
            proveedor pr
        JOIN 
            factura f ON pr.ID_Prov = f.ProveedorID
        JOIN 
            factura_producto fp ON f.Folio_Factura = fp.FacturaFolio
        GROUP BY 
            pr.ID_Prov
        HAVING 
            COUNT(fp.ProductoID) > 10

        INTERSECT

        -- Proveedores de la región "Centro"
        SELECT 
            pr.Nombre_Prov AS Proveedor
        FROM 
            proveedor pr
        JOIN 
            localidad l ON pr.LocalidadID = l.ID_Localidad
        WHERE 
            l.Nombre_Localidad = 'Centro';
        
        `);
      return rows; 
    } catch (err) {
      console.error('Error en la consulta getAll:', err);
      throw err;
    }
  }

  static async getTopMoreProductsSupplied() { // Top 5 proveedores
    try {
      const [rows] = await db.query(`
        SELECT 
            pr.Nombre_Prov AS Proveedor, 
            COUNT(DISTINCT fp.ProductoID) AS ProductosSuministrados
        FROM 
            proveedor pr
        JOIN 
            factura f ON pr.ID_Prov = f.ProveedorID
        JOIN 
            factura_producto fp ON f.Folio_Factura = fp.FacturaFolio
        GROUP BY 
            pr.ID_Prov
        ORDER BY 
            ProductosSuministrados DESC
        LIMIT 3;
    `);
    return rows; 
    } catch (err) {
      console.error('Error en la consulta getTopMoreProductsSupplied:', err);
      throw err;
    }
  }

  static async getBilling() { // Top 5 proveedores
    try {
      const [rows] = await db.query(`
        SELECT 
            pr.Nombre_Prov AS Proveedor,
            c.Nombre_Cte AS Cliente, 
            l.Nombre_Localidad AS Region, 
            SUM(fp.Cantidad * p.PrecioUnit_Prod) AS TotalFacturado
        FROM 
            proveedor pr
        JOIN 
            factura f ON pr.ID_Prov = f.ProveedorID
        JOIN 
            factura_producto fp ON f.Folio_Factura = fp.FacturaFolio
        JOIN 
            producto p ON fp.ProductoID = p.ID_Prod
        JOIN 
            cliente c ON f.ClienteRFC = c.RFC_Cte
        JOIN 
            localidad l ON c.LocalidadID = l.ID_Localidad
        GROUP BY 
            pr.ID_Prov, c.RFC_Cte, l.ID_Localidad
        ORDER BY 
            TotalFacturado DESC;
    `);
    return rows; 
    } catch (err) {
      console.error('Error en la consulta getBilling:', err);
      throw err;
    }
  }

  static async getAvgDiscount() { // Top 5 proveedores
    try {
      const [rows] = await db.query(`
        SELECT 
            pr.Nombre_Prov AS Proveedor, 
            AVG(p.Descuento_Prod) AS DescuentoPromedio
        FROM 
            proveedor pr
        JOIN 
            factura f ON pr.ID_Prov = f.ProveedorID
        JOIN 
            factura_producto fp ON f.Folio_Factura = fp.FacturaFolio
        JOIN 
            producto p ON fp.ProductoID = p.ID_Prod
        GROUP BY 
            pr.ID_Prov
        ORDER BY 
            DescuentoPromedio DESC;
    `);
    return rows; 
    } catch (err) {
      console.error('Error en la consulta getAvgDiscount:', err);
      throw err;
    }
  }

  static async getLowExcistence() { // Top 5 proveedores
    try {
      const [rows] = await db.query(`
        SELECT 
            pr.Nombre_Prov AS Proveedor, 
            p.Nombre_Prod AS Producto, 
            p.Cantidad_Prod AS Existencias
        FROM 
            proveedor pr
        JOIN 
            factura f ON pr.ID_Prov = f.ProveedorID
        JOIN 
            factura_producto fp ON f.Folio_Factura = fp.FacturaFolio
        JOIN 
            producto p ON fp.ProductoID = p.ID_Prod
        WHERE 
            p.Cantidad_Prod < 10
        ORDER BY 
            p.Cantidad_Prod ASC;
    `);
    return rows; 
    } catch (err) {
      console.error('Error en la consulta getLowExcistence:', err);
      throw err;
    }
  }

  static async get() { // Top 5 proveedores
    try {
      const [rows] = await db.query(`
        
    `);
    return rows; 
    } catch (err) {
      console.error('Error en la consulta getDiscount:', err);
      throw err;
    }
  }
}

module.exports = Provider;
