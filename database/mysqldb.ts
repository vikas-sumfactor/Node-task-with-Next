
   

import mysql from 'mysql';
 
const connection = mysql.createConnection({
     
    host: "localhost",
    user: "root",
    password: "vikas@rana",
    database: "next"
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error while connecting to the database:', err);
      return;
    }
    console.log('successfully Connected to the database');
  });
  
  export default connection;
  