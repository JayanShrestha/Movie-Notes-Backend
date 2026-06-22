import jwt from 'jsonwebtoken';

export function generateToken(id: number){
    const payload  = {id: id};
    const secret = process.env.JWT_SECRET as string;
    const expiresIn = "1h";
    return jwt.sign(payload, secret, { expiresIn });
}