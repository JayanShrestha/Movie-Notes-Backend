import {Request, Response} from "express";
import {fetchMoviesById, fetchPopularMovies, fetchSearchResults} from "../services/tmdb.service.js";
import {readReviewByMovieId} from "../services/reviews.service.js";

export async function getMovieById(req:Request, res:Response){
    try{
        const id = req.params.id;
        const movie = await fetchMoviesById(Number(id));
        res.json(movie);
    } catch (error) {
        console.error(`Error fetching movie by ID: ${error}`);
        res.status(500).json({ error: "Failed to fetch movie" });
    }
}

export async function getPopularMovies(req:Request, res:Response){
    try{
        const page = req.query.page ? Number(req.query.page) : 1;
        const popularMovies = await fetchPopularMovies(page);
        res.json(popularMovies);
    } catch (error) {       
        console.error(`Error fetching popular movies: ${error}`);
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
}

export async function getSearchResults(req: Request, res: Response){
    try{
        const query = req.query.query as string;
        const page = req.query.page ? Number(req.query.page) : 1;
        const searchResults = await fetchSearchResults(query, page);
        res.json(searchResults);
    } catch (error) {
        console.error(`Error fetching search results: ${error}`);
        res.status(500).json({ error: "Failed to fetch search results" });
    }
}

export async function getReviewsForMovie(req:Request, res:Response){
    try{
        const idString = req.params.id as string;
        const id = parseInt(idString);
        const review =  await readReviewByMovieId(id);
        return review;

    }
    catch (error){
        console.error(`Error fetching reviews for the movie: ${error} `);
            res.status(500).json({error: "Failed to fetch reviews for the movie"});
    }
}