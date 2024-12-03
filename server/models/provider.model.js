const db = require('../conexion'); // Asegúrate de que esté correctamente importado

class Provider {
  static async getAll() { // Obtiene todos los proveedores
    try {
      const [rows] = await db.query('SELECT * FROM proveedor');
      return rows; 
    } catch (err) {
      console.error('Error en la consulta getAll:', err);
      throw err;
    }
  }
  
  static async create(provider) { // Crea un nuevo proveedor
        try {
        const { Nombre_Prov, Contacto_Prov, Telefono_Prov, Email_Prov, Direccion_Prov, Ciudad_Prov, Pais_Prov, Imagen_Prov, LocalidadID } = provider;
        const [result] = await db.query(`
            INSERT INTO proveedor (Nombre_Prov, Contacto_Prov, Telefono_Prov, Email_Prov, Direccion_Prov, Ciudad_Prov, Pais_Prov, Imagen_Prov, LocalidadID)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [Nombre_Prov, Contacto_Prov, Telefono_Prov, Email_Prov, Direccion_Prov, Ciudad_Prov, Pais_Prov, Imagen_Prov, LocalidadID]);
        return result; 
        } catch (err) {
        console.error('Error en la consulta create:', err);
        throw err;
        }
    }

    static async update(id, provider) { // Actualiza un proveedor
        try {
        const { Nombre_Prov, Contacto_Prov, Telefono_Prov, Email_Prov, Direccion_Prov, Ciudad_Prov, Pais_Prov, Imagen_Prov, LocalidadID } = provider;
        const [result] = await db.query(`
            UPDATE proveedor 
            SET Nombre_Prov = ?, Contacto_Prov = ?, Telefono_Prov = ?, Email_Prov = ?, Direccion_Prov = ?, Ciudad_Prov = ?, Pais_Prov = ?, Imagen_Prov = ?, LocalidadID = ?
            WHERE ID_Prov = ?
        `, [Nombre_Prov, Contacto_Prov, Telefono_Prov, Email_Prov, Direccion_Prov, Ciudad_Prov, Pais_Prov, Imagen_Prov, LocalidadID, id]);
        return result; 
        } catch (err) {
        console.error('Error en la consulta update:', err);
        throw err;
        }
    }

    static async delete(id) { // Elimina un proveedor
        try {
        const [result] = await db.query('DELETE FROM proveedor WHERE ID_Prov = ?', [id]);
        return result;
        } catch (err) {
        console.error('Error en la consulta delete:', err);
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
