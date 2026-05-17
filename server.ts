import express from "express";
import bodyParser from "body-parser";
import {fetchMoviesById,fetchPopularMovies} from "./src/services/tmdb.service.js";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//testing backend
app.get('/',(req,res)=>{
    res.json("Backend is Okay ! This is running");
});


//getting movie by id
app.get('/tmdb',async (req,res)=>{
    try{
    const result = await fetchMoviesById(550);
    res.json(result);
    }
    catch(err){
        console.log(err);
        throw new Error;
    }
}
)
//getting movie by popularity
app.get('/tmdb/popular',async (req,res)=>{
    try{
    const result = await fetchPopularMovies();
    res.json(result);
    }
    catch(err){
        console.log(err);
        throw new Error;
    }
}
)

app.listen(port,()=>{
    console.log(`The Server is running on port: ${port}`);
})