
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

module.exports = promisePool;
