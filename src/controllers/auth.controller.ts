import {Request, Response} from "express";

export async function registerUser(req: Request, res: Response){
    try{
        const {username, email, password} = req.body;
        // Here you would typically add code to save the user to your database
        // For this example, we'll just return a success message
        res.status(201).json({ message: "User registered successfully" });

    }
    catch(error){
        console.error(`Error registering user: ${error}`);
        res.status(500).json({ error: "Failed to register user" });
    }
}

export async function loginUser(req: Request, res: Response){
    try{
        const {email, password} = req.body;
        // Here you would typically add code to verify the user's credentials
        // For this example, we'll just return a success message
        res.status(200).json({ message: "User logged in successfully" });
    }
    catch(error){
        console.error(`Error logging in user: ${error}`);
        res.status(500).json({ error: "Failed to log in user" });
    }       
}