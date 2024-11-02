const db = require('../conexion'); // DB cx import

const Product = {  // Consultas
  getAll: (callback) => {
    db.query('SELECT * FROM products', callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
};

module.exports = Product;
