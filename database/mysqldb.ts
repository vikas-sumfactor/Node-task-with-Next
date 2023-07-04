
   

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
  

  export const executeQuery = (sqlQuery: string) => {
    return new Promise((resolve, reject) => {
        try {
            connection.query(sqlQuery, (error, response) => {
                console.log("query error", error)
                if (error) return reject(error)

                return resolve(response)
            })
        } catch (error) {
            console.log("connection error ", error)

        }
    })
}


  export default connection;
  