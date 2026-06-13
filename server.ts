import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import tmdbRoutes from "./src/routes/movies.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import reviewsRoutes from "./src/routes/reviews.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const saltRounds = 10;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","DELETE", "OPTIONS"],
    allowedHeaders:["Content-Type", "Authorization"],
}))

//testing backend on tmdb routes
app.use("/tmdb", tmdbRoutes);

// Auth routes
app.use("/auth", authRoutes);

// Reviews routes
app.use("/reviews", reviewsRoutes);

app.listen(port,()=>{
    console.log(`The Server is running on port: ${port}`);
})