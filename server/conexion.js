
// Agrega la conexión a la base de datos y exportala
const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',      
    user: 'root',  
    password: '', 
    database: 'mambadb', 
    waitForConnections: true,
    connectionLimit: 10,     
    queueLimit: 0            
});


const promisePool = pool.promise();

// Verificar si la conexión está bien
promisePool.query('SELECT 1')
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = promisePool;
