import * as jwt from 'jsonwebtoken';
const secret:string=process.env.JWT_SECRET_KEY as string;
const refreshToken=process.env.REFRESH_ACCESS_KEY as string;

interface JwtToken {
    email: string,
    password: string
}

export const generateJwtToken = (user: JwtToken) => {
    return jwt.sign(user,secret, { expiresIn: '2m' });
}

interface refreshJwtToken {
    user: object
}

export const refreshAccessToken = (tokenUser: refreshJwtToken) => {
    return jwt.sign(tokenUser.user, refreshToken);
}