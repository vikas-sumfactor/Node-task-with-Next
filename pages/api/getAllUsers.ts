import { NextApiRequest,NextApiResponse } from "next";
import { verifyToken } from "@/database/service";
import * as jwt from 'jsonwebtoken';
import { executeQuery } from "@/database/mysqldb";

const secret=process.env.JWT_SECRET_KEY as string;

 export default async function getAllUser(req:NextApiRequest,res:NextApiResponse){
 if(req.method==='GET'){

try {
  let reqToken:any =req.headers['authorization']?.split(' ')[1] 

    let tokenVerify=await verifyToken(reqToken)


    if(tokenVerify!="token sucessfully verified you can proceed further") return res.status(404).send("verification string didnot matched")
  const getRecord = `select * from my_table;`
  const resultset: any = await executeQuery(getRecord);
  res.status(200).send({resultset,done:true});
// });
}
catch (error) {
res.status(500).send('Internal Server Error');
}
 
}
else{
res.status(400).json({ message: 'Bad Request' });
}
}