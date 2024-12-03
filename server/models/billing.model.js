const db = require('../conexion');

class Billing {
    static async create(billing, products, envio) {
        const connection = await db.getConnection(); // Crear una conexión transaccional
        try {
            await connection.beginTransaction(); // Iniciar la transacción

            // 1. Insertar el envío
            // Obtener el último ID de envío y sumarle 1
            const [rows] = await connection.query('SELECT MAX(ID_Envio) AS lastId FROM envio');
            const ID_Envio = (rows[0].lastId || 0) + 1;

            const { FechaSalida, FechaLlegada, Metodo_Envio, Costo_Envio, Estado_Envio, Direccion_Envio } = envio;
            console.log(FechaSalida, FechaLlegada, Metodo_Envio, Costo_Envio, Estado_Envio, Direccion_Envio);
            const [envioResult] = await connection.query(`
                INSERT INTO envio (ID_Envio, FechaSalida, FechaLlegada, Metodo_Envio, Costo_Envio, Estado_Envio, Direccion_Envio)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [ID_Envio, FechaSalida, FechaLlegada, Metodo_Envio, Costo_Envio, Estado_Envio, Direccion_Envio]);

             // 2. Calcular Subtotal, Impuesto y Total
             let subtotal = 0;

            

             for (const product of products) {
                 const { ProductoID, Cantidad } = product;
             
                 const [producto] = await connection.query('SELECT PrecioUnit_Prod FROM producto WHERE ID_Prod = ?', [ProductoID]);
             
                 if (producto.length === 0) {
                     throw new Error(`El producto con ID ${ProductoID} no existe.`);
                 }
             
                 const precioUnitario = producto[0].PrecioUnit_Prod;
                 subtotal += precioUnitario * Cantidad;
             }

             const impuesto = subtotal * 0.16; 
             const total = subtotal + impuesto;

             // Obtener la fecha actual
            const date = new Date();
            const Fecha_Creada = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

            // Desestructurar valores de la factura
            const { Tipo, ProveedorID, ClienteRFC } = billing;
            // Insertar la factura con los valores calculados
            await connection.query(`
                INSERT INTO factura 
                (Fecha_Creada, Subtotal, Impuesto, Total, Tipo, EnvioID, ProveedorID, ClienteRFC)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [Fecha_Creada, subtotal, impuesto, total, Tipo, ID_Envio, ProveedorID, ClienteRFC]);

            // 3. Insertar productos relacionados
            const [folio] = await connection.query('SELECT MAX(Folio_Factura) AS lastFolio FROM factura');
            const Folio_Factura = folio[0].lastFolio;
            for (const product of products) {
                const { ProductoID, Cantidad } = product;
                await connection.query(`
                    INSERT INTO factura_producto (FacturaFolio, ProductoID, Cantidad)
                    VALUES (?, ?, ?)
                `, [Folio_Factura, ProductoID, Cantidad]);
            }

            // 4. Decrementar la cantidad de productos en inventario
            for (const product of products) {
                const { ProductoID, Cantidad } = product;
                await connection.query(`
                    UPDATE producto
                    SET Cantidad_Prod = Cantidad_Prod - ?
                    WHERE ID_Prod = ?
                `, [Cantidad, ProductoID]);
            }

            await connection.commit(); // Confirmar la transacción
            return { folio: Folio_Factura, envioId: ID_Envio, message: 'Factura, productos y envío creados con éxito' };
        } catch (err) {
            await connection.rollback(); // Revertir la transacción en caso de error
            console.error('Error en la consulta create:', err);
            throw err;
        } finally {
            connection.release(); // Liberar la conexión
        }
    }

    static async getAll() {
        try {
            const sql = `
                SELECT * FROM factura
            `;
            const [rows] = await db.query(sql);
            return rows;
        } catch (err) {
            console.error('Error en la consulta getAll:', err);
            throw err;
        }
    }

    static async getAllJoin() {
        try {
            const sql = `
                SELECT f.Folio_Factura, f.Fecha_Creada, f.Subtotal, f.Impuesto, f.Total, 
                       f.Tipo, f.EnvioID, f.ProveedorID, f.ClienteRFC,
                       e.FechaSalida, e.FechaLlegada, e.Metodo_Envio, e.Costo_Envio, 
                       e.Estado_Envio, e.Direccion_Envio,
                       fp.ProductoID, fp.Cantidad
                FROM factura f
                LEFT JOIN envio e ON f.EnvioID = e.ID_Envio
                LEFT JOIN factura_producto fp ON f.Folio_Factura = fp.FacturaFolio
            `;
            const [rows] = await db.query(sql);
            return rows;
        } catch (err) {
            console.error('Error en la consulta getAll:', err);
            throw err;
        }
    }
};

module.exports = Billing;
