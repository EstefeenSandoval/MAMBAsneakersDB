const db = require('../conexion'); // DB cx import

/* const Product = {  // Consultas
  getAll: (callback) => {
    db.query('SELECT * FROM producto', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM producto WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
}; */

class Product {
  static async getAll() {
    return await db.query('SELECT * FROM producto');
  }

  static async getById(id) {
    return await db.query('SELECT * FROM producto WHERE id = ?', [id]);
  }
}

module.exports = Product;
