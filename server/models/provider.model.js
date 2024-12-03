const db = require('../conexion');

class Provider {
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

    static async getAll(){
        try{
            const sql = `SELECT * FROM proveedor`;
            const [rows] = await db.query(sql);
            return rows;
        }catch(err){
            console.error('Error en la consulta getAll: ', err);
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

};

module.exports = Provider;
