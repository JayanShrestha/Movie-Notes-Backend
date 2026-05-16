import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.json("Backend is Okay ! This is running");
})

app.listen(port,()=>{
    console.log(`The Server is running on posrt: ${port}`);
})