const db = require('../conexion'); // Asegúrate de que esté correctamente importado

class Client {

    static async topThree(){
        try {
            const [rows] = await db.query(
                `SELECT CLIENTE.RFC_CTE, CLIENTE.NOMBRE_CTE, SUM(FACTURA.TOTAL) AS TOTAL
                FROM CLIENTE, FACTURA
                WHERE CLIENTE.RFC_CTE = FACTURA.CLIENTERFC
                GROUP BY CLIENTE.RFC_CTE, CLIENTE.NOMBRE_CTE
                ORDER BY TOTAL DESC
                LIMIT 3
            `);
            return rows; 
          } catch (err) {
            console.error('Error en la consulta topThree, Clientes:', err);
            throw err;
          }
       
    }

    static async favProds(){
        try {
            const [rows] = await db.query(`SELECT * from favprods`);
            return rows; 
          } catch (err) {
            console.error('Error en la consulta favProds, Clientes:', err);
            throw err;
          }
       
    }

    static async edoEnvios(){
      try {
          const [rows] = await db.query(
            `SELECT Metodo_Envio, Estado_envio, SUM(Costo_envio) AS Costo
            FROM envio
            GROUP BY Metodo_Envio, Estado_envio WITH ROLLUP;`);
          return rows; 
        } catch (err) {
          console.error('Error en la consulta favProds, Clientes:', err);
          throw err;
        }
     
    }

    static async byWeek(){
      try {
          const [rows] = await db.query(
            `CALL TotalSalesByWeek(11, 2024);`);
          return rows; 
        } catch (err) {
          console.error('Error en la consulta byWeek, Clientes:', err);
          throw err;
        }
    }

    static async avg(){
      try {
          const [rows] = await db.query(
            `SELECT AVG(TOTAL) AS TOTAL
            FROM factura F
            WHERE F.Tipo = 'Venta';`);
          return rows; 
        } catch (err) {
          console.error('Error en la consulta byWeek, Clientes:', err);
          throw err;
        }
    }
  
  
  static async create(client) { // Crea un nuevo cliente
        try {
        const {RFC_Cte, Nombre_Cte, Calle, Colonia, LocalidadID } = client;
        const [result] = await db.query(`
            INSERT INTO cliente (RFC_Cte, Nombre_Cte, Calle, Colonia, LocalidadID)
            VALUES (?, ?, ?, ?, ?)
        `, [RFC_Cte, Nombre_Cte, Calle, Colonia, LocalidadID]);
        return result; 
        } catch (err) {
        console.error('Error en la consulta create:', err);
        throw err;
        }
    }

    static async getAll() { // Obtiene todos los clientes
        try {
        const [rows] = await db.query(`
            SELECT * FROM cliente
        `);
        return rows;
        } catch (err) {
        console.error('Error en la consulta getAll:', err);
        throw err;
        }
    }

    static async update(id, client) { // Actualiza un cliente
        try {
        const {Nombre_Cte, Calle, Colonia, LocalidadID} = client;
        const [result] = await db.query(`
            UPDATE cliente 
            SET Nombre_Cte = ?, Calle = ?, Colonia = ?, LocalidadID = ?
            WHERE RFC_Cte = ?
        `, [Nombre_Cte, Calle, Colonia, LocalidadID, id]);
        return result; 
        } catch (err) {
        console.error('Error en la consulta update:', err);
        throw err;
        }
    }

    static async delete(id) { // Elimina un cliente
        try {
        const [result] = await db.query('DELETE FROM cliente WHERE RFC_Cte = ?', [id]);
        return result;
        } catch (err) {
        console.error('Error en la consulta delete:', err);
        throw err;
        }
    }

    



}

module.exports = Client;

