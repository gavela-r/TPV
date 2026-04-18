import mysql from 'mysql2';

const conexion = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'TPV'
});

export default conexion;
