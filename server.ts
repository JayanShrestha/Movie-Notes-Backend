import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import tmdbRoutes from "./src/routes/movies.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const saltRounds = 10;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//testing backend
app.use("/api/tmdb", tmdbRoutes);

app.listen(port,()=>{
    console.log(`The Server is running on port: ${port}`);
})