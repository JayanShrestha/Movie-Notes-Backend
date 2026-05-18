import { Router } from "express";
import {getMovieById, getPopularMovies} from "../controllers/movies.controller.js";

const router = Router();

// Get /api/tmdb/movie/:id
router.get("/movie/:id", getMovieById);

// Get /api/tmdb/popular
router.get("/popular", getPopularMovies);

//Get for testing
router.get("/", (req, res) => {
    res.json("TMDB Routes are working fine !");
})

export default router;