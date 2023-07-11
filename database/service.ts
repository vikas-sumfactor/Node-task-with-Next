import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
const secret:string=process.env.JWT_SECRET_KEY as string;
const refreshToken=process.env.REFRESH_ACCESS_KEY as string;

interface JwtToken {
    email: string,
    password: string
}

export const generateJwtToken = (user: JwtToken) => {
    return jwt.sign(user,secret, { expiresIn: '10m' });
}

interface refreshJwtToken {
    user: object
}

export const refreshAccessToken = (tokenUser: refreshJwtToken) => {
    return jwt.sign(tokenUser.user, refreshToken);
}

export const verifyToken=(token:string)=>{

return new Promise((resolve , reject)=>{
    try{

        if(token==null)return resolve("token string was not present to verify")


            jwt.verify(token,secret,(err:any,user:any)=>{
                 if(err)return resolve("forbidden")

                 return resolve("token sucessfully verified you can proceed further")
            })
    }catch(error){
return reject(error)
    }
})





}


export const verifyRefresh=(email:string,token:string):boolean=>{
    try{
    const decodedData=jwt.verify(token,refreshToken) as JwtPayload;
    return decodedData.email===email;
    }
    catch(error)
  {
      return false;
  }
  }
