

import connection , {executeQuery} from '../../database/mysqldb';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function check(req:NextApiRequest,res:NextApiResponse){
if(req.method==='POST'){
try{

    // for checking if data is reflected into our mysql table after running a query with postman( http://localhost:3000/api/login)

    //  const query =  `insert into my_table(fname,lname,email,password)values('vikas','rana','vikasrana7770@gmail.com','100')`;
    console.log(req.body);

    const {fname,lname,email,password}=req.body;

    // insert data using postman (body => raw => json)

    // const query =  `insert into my_table(fname,lname,email,password)values('${fname}','${lname}','${email}','${password}')`;

    //  retrive
    // const query='select * from new_table';

    // update or change particular field and hit the postman 

    //  const query = `update my-table set fname='rajput' where email="vikasrana7770@gmail.com"`

    // delete

    //   const query = `delete from new_table where email="vikasrana7770@gmail.com"`

    const Query=`select * from my_table where email='${email}'`;

    const UserData:any=await executeQuery(Query);

    // check if a particular user data is already in database


    if(UserData.length>0) return res.status(400).send({message: "user is already registered "});
    
    // encrypt the password then storing in database

    const salt=await bcrypt.genSalt();

    const hashedPassword=await bcrypt.hash(password,salt);

    console.log({hashedPassword});

    const queryInsert =  `insert into my_table(fname,lname,email,password)values('${fname}','${lname}','${email}','${hashedPassword}')`;
    
    const response:any=await executeQuery(queryInsert);


    console.log({response});

    res.send({message:response,done:true});
 
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