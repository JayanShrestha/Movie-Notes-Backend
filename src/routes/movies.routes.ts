import { Router } from "express";
import {getMovieById, getPopularMovies, getSearchResults} from "../controllers/movies.controller.js";

const router = Router();

// Get /tmdb/movie/:id
router.get("/movie/:id", getMovieById);

// Get /tmdb/popular
router.get("/popular", getPopularMovies);

// Get /tmdb/search
router.get("/search", getSearchResults);

//Get /tmdbfor testing
router.get("/", (req, res) => {
    res.json("TMDB Routes are working fine !");
})


export default router;