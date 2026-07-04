import {Request, Response} from "express";
import {createReview, readReview, updateReview, deleteReview} from "../services/reviews.service.js";
import {checkTmdbIdExists, createMovie} from "../services/movies.service.js";
import {fetchMoviesById} from "../services/tmdb.service.js";

export async function postReview(req:Request, res:Response){
    try{
        const { userId, tmdbId, rating, reviewText } = req.body;
        const movieExists = await checkTmdbIdExists(tmdbId);
        if(!movieExists){
            const movieData = await fetchMoviesById(tmdbId);
            await createMovie(movieData);
        };
        const review = await createReview(userId, tmdbId, rating, reviewText);
        res.status(201).json(review);
    } catch (error) {
        console.error(`Error creating review: ${error}`);
        res.status(500).json({ error: "Failed to create review" });
    }
}

export async function getReviewsByMovieId(req:Request, res:Response){
    try{
        const {userId, tmdbId} = req.body;
        const reviews = await readReview(userId, tmdbId);
        res.json(reviews);
    } catch (error) {
        console.error(`Error fetching reviews: ${error}`);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
}

export async function updateReviewById(req:Request, res:Response){
    try{
       
        const { reviewId, userId, reviewText } = req.body;
        const review = await updateReview(reviewId, userId, reviewText);
        res.json(review);
    } catch (error) {
        console.error(`Error updating review: ${error}`);
        res.status(500).json({ error: "Failed to update review" });
    }
}

export async function deleteReviewById(req:Request, res:Response){
        const { reviewId, userId} = req.body;
    try{
        const review = await deleteReview(reviewId, userId);
        res.json({review, message: "Review deleted successfully"}  );
    } catch (error) {
        console.error(`Error deleting review: ${error}`);
        res.status(500).json({ error: "Failed to delete review" });
    }
}
