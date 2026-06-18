import {Request, Response} from "express";
import {registerUser as register, loginUser as login, checkUserExists} from "../services/auth.service.js";

export async function registerUser(req: Request, res: Response){
    try{
        const {email, username, password} = req.body;
          if (!email || !username || !password) {
            return res.status(400).json({ error: "email, username and password are required" });
       }
        const userExists = await checkUserExists(email);
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
        await register(email, username, password);
        res.status(201).json({ message: "User registered successfully!" });

    }
    catch(error){
        console.error(`Error registering user: ${error}`);
        res.status(500).json({ error: `${error}` });
    }
}

export async function loginUser(req: Request, res: Response){
    try{
        const {email, password} = req.body;
          if (!email || !password) {
         return res.status(400).json({ error: "email and password are required" });
       }
        const userExists = await checkUserExists(email);
        if (!userExists) {
            return res.status(400).json({ error: "User does not exist" });
        }
        const user = await login(email, password);
        res.status(200).json({ message: "User logged in successfully", user });
    }
    catch(error){
        console.error(`Error logging in user: ${error}`);
        res.status(401).json({ error: "Incorrect Password, Failed to login" });
    }       
}
