import { Router } from "express";
import {getMovieById, getPopularMovies, getSearchResults, getReviewsForMovie} from "../controllers/movies.controller.js";

const router = Router();

// Get /tmdb/movie/:id
router.get("/movie/:id", getMovieById);

// Get /tmdb/popular
router.get("/popular", getPopularMovies);

// Get /tmdb/search
router.get("/search", getSearchResults);

//return list of reviews for that specific movie
router.get("/movies/:id", getReviewsForMovie );

//Get /tmdbfor testing
router.get("/", (req, res) => {
    res.json("TMDB Routes are working fine !");
})


export default router;