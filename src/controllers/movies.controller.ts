import {Request, Response} from "express";
import {fetchMoviesById, fetchPopularMovies} from "../services/tmdb.service.js";

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