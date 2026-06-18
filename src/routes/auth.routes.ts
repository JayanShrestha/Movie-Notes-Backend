import Router from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = Router();

//testing auth routes
router.get("/", (req, res)=>{
    res.json("Auth Routes are working fine !");
});

//register route
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);




export default router;