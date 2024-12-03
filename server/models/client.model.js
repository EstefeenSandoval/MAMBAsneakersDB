const db = require('../conexion');

class Client {
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
};

module.exports = Client;
