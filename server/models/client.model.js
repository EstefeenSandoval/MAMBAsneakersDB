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

}

module.exports = Client;