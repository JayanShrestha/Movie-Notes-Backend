import { NextFunction, Request, Response } from "express";

// extend Express Request to include `user`
declare global {
    namespace Express {
        interface Request {
            user?: {id: number};
        }
    }
}

import jwt from "jsonwebtoken";

export function authenticate( req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers["authorization"];
    if(!authHeader || !authHeader.toLowerCase().startsWith('bearer ')){
         return res.status(401).json({error: "Authorization header missing or malformed"});
    }
    
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({error: "Token missing"});
        }
        try{
               const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: number};
               if(!decoded || typeof decoded.id !== 'number'){
                   return res.status(403).json({error: "Invalid token payload"});
               }
                req.user = {id: decoded.id};
                next();
                return;
        }
        catch(err: Object | any){
            if(err.name === 'TokenExpiredError'){
                return res.status(401).json({error: "Token Expired"});
            }
            return res.status(403).json({error: "Invalid token"});
        } 
    }
 
