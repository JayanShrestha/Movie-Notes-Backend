import { Router } from "express";
import {getMovieById, getPopularMovies} from "../controllers/movies.controller.js";

const router = Router();

// Get /tmdb/movie/:id
router.get("/movie/:id", getMovieById);

// Get /tmdb/popular
router.get("/popular", getPopularMovies);

//Get /tmdbfor testing
router.get("/", (req, res) => {
    res.json("TMDB Routes are working fine !");
})

export default router;