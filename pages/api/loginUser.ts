import { NextApiRequest,NextApiResponse } from "next";
import { executeQuery } from "@/database/mysqldb";
import { generateJwtToken,refreshAccessToken } from "@/database/service";
import bcrypt from 'bcrypt';


export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const getRecord = `SELECT * FROM my_table WHERE email = '${email}'`;
      const resultset: any = await executeQuery(getRecord);

      if (resultset.length === 0) res.status(400).send({ message: "User doesn't exist" });
      
        const match: boolean = await bcrypt.compare(password, resultset[0].password);
        // if (!match) return res.status(400).send({ message: "Incorrect password" });
  
        let user: any = { email: email as string, password: password as string };

        let JwtToken = generateJwtToken(user);
        console.log(JwtToken)

        const JwtRefreshtoken = refreshAccessToken({ user });
        console.log(JwtRefreshtoken)

        res.status(200).send({ JwtToken, JwtRefreshtoken, message: "Login successful"});
    } catch (error) {
      res.status(400).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}