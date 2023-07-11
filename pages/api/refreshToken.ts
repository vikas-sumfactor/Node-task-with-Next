import { NextApiRequest,NextApiResponse } from "next";
import { executeQuery } from "@/database/mysqldb";
import { generateJwtToken,refreshAccessToken } from "@/database/service";
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const refreshTokenString=process.env.REFRESH_ACCESS_KEY as string;

export default async function refreshToken(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, token } = req.body;
      

console.log(process.env.REFRESH_TOKEN_SECERET,"process.env.REFRESH_TOKEN_SECERET")

      if (token == null) return res.status(401).send({message:"Unauthorized"})

      const getRecord = `SELECT * FROM my_table WHERE email = '${email}'`;

      const resultset: any = await executeQuery(getRecord);

      if (resultset.length == 0) return res.status(403).send({message:"Unauthorized"})
      
      jwt.verify(token, refreshTokenString, (error: unknown, response: unknown) => {

        if (error) return res.status(403)

        const acessToken: string = generateJwtToken({ email: resultset[0].email, password: resultset[0].password })

        res.json({ token: `Bearer ${acessToken}` })
    })
    } catch (error) {
      res.status(400).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}