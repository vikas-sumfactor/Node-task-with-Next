

import connection from '../../database/mysqldb';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function check(req:NextApiRequest,res:NextApiResponse){
if(req.method==='POST'){
try{

    // for checking if data is reflected into our mysql table after running a query with postman( http://localhost:3000/api/login)

     const query =  `insert into new_table(fname,email,age)values('vikas','vikasrana7770@gmail.com',100)`;
    console.log(req.body);

    const {fname,email,age}=req.body;

    // insert data using postman (body => raw => json)

    // const query =  `insert into new_table(fname,email,age)values('${fname}','${email}','${age}')`;

    //  retrive
    // const query='select * from new_table';

    // update or change particular field and hit the postman 

    //  const query = `update new_table set fname='rajput' where email="vikasrana7770@gmail.com"`

    // delete

    //   const query = `delete from new_table where email="vikasrana7770@gmail.com"`

    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error checking MySQL connection:', error);
        res.status(500).send({ done: false });
      } else {
        console.log('MySQL connection is established:', results);
        res.send({ message:results,done: true });
      }
    });
}
catch(error){
    console.error("something went wrong logging in", error);
    res.status(500).send({ done: false });
}
}
else
{
    res.send({done:false});
}
}