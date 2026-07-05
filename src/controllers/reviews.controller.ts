import {Request, Response} from "express";
import {createReview, updateReview, deleteReview, checkReviewOwnership, readReviewByMovieId, readReviewByUserId, readReviewByIds} from "../services/reviews.service.js";
import {checkTmdbIdExists, createMovie} from "../services/movies.service.js";
import {fetchMoviesById} from "../services/tmdb.service.js";
import {Review} from "../Types/tmdbtypes.js";

export async function postReview(req:Request, res:Response){
    try{
        const {tmdbId, rating, reviewText } = req.body as Review;
        const userId = req.user.id;
        const movieExists = await checkTmdbIdExists(tmdbId);
        if(!movieExists){
            const movieData = await fetchMoviesById(tmdbId);
            await createMovie(movieData);
        };
        const reviewOwnership = await checkReviewOwnership(userId, tmdbId);
        if(reviewOwnership){
            return res.status(400).json({ error: "User has already reviewed this movie" });
        }
        const review = await createReview(userId, tmdbId, rating, reviewText);
        res.status(201).json(review);
    } catch (error) {
        console.error(`Error creating review: ${error}`);
        res.status(500).json({ error: "Failed to create review" });
    }
}

export async function getReviewsByMovieId(req:Request, res:Response){
    try{
        const {tmdbId} = req.body;
        const reviews = await readReviewByMovieId(tmdbId);
        res.json(reviews);
    } catch (error) {
        console.error(`Error fetching reviews: ${error}`);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
}

export async function getReviewsByUserId(req: Request, res: Response){
    try{
        const { userId } = req.body;
        const reviews = await readReviewByUserId(userId);
        res.json(reviews);
    } catch (error) {
        console.error(`Error fetching reviews: ${error}`);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
}

export async function getReviewsByIds(req: Request, res: Response){
    try{
        const { userId, tmdbId } = req.body;
        const reviews = await readReviewByIds(userId, tmdbId);
        res.json(reviews);
    }
    catch (error) {
        console.error(`Error fetching reviews: ${error}`);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
}

export async function updateReviewById(req:Request, res:Response){
    try{
       
        const { reviewId, userId, rating, reviewText } = req.body;
        const review = await updateReview(reviewId, userId, rating, reviewText);
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
