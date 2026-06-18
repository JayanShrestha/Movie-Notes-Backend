import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import {prisma} from '../db.js';

const saltRounds =10;

export async function registerUser(email: string, username: string, password: string){
    try{
      
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const user = await prisma.users.create({
            data: {
                email,
                name: username,
                password: hashedPassword
            }
        });
        const {...safeUser, password:PW} = user;
        console.log("Registered User:", {id: safeUser.id, email: safeUser.email});
        return safeUser;
      
        
    } catch (error) {
        throw error;
    }
}

export async function loginUser(email: string, password: string){
    try{
        const user = await prisma.users.findUnique({
            where: { email }
        });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const {...safeUser, password:PW} = user;
        console.log("Registered User:", {id: safeUser.id, email: safeUser.email});
        return safeUser;
    } catch (error) {
        throw error;
    }
}


export async function checkUserExists( email: string){
    try{
        const checkuser = await prisma.users.findUnique({
            where: { email }
        });
        if (checkuser){
            return true;
        }
        else{
            return false;
        }
    }
    catch (error){
        console.error(`Error checking user existence: ${error}`);
        throw new Error('Failed to check user existence');
    }

}
