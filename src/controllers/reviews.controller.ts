import {Request, Response} from "express";
import {createReview, readReview, updateReview, deleteReview} from "../services/reviews.service.js";

export async function postReview(req:Request, res:Response){
    try{
        const { userId, movieId, rating, reviewText } = req.body;
        const review = await createReview(userId, movieId, rating, reviewText);
        res.status(201).json(review);
    } catch (error) {
        console.error(`Error creating review: ${error}`);
        res.status(500).json({ error: "Failed to create review" });
    }
}

export async function getReviewsByMovieId(req:Request, res:Response){
    try{
        const movieIdStr = Array.isArray(req.params.movieId) ? req.params.movieId[0] : (req.params.movieId ?? '');
        const movieId = parseInt(movieIdStr, 10);
        if (Number.isNaN(movieId)) return res.status(400).json({ error: 'Invalid movieId' });
        const reviews = await readReview(movieId);
        res.json(reviews);
    } catch (error) {
        console.error(`Error fetching reviews: ${error}`);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
}

export async function updateReviewById(req:Request, res:Response){
    try{
        const reviewIdStr = Array.isArray(req.params.reviewId) ? req.params.reviewId[0] : (req.params.reviewId ?? '');
        const reviewId = parseInt(reviewIdStr, 10);
        if (Number.isNaN(reviewId)) return res.status(400).json({ error: 'Invalid reviewId' });
        const { userId, movieId, rating, reviewText } = req.body;
        const review = await updateReview(reviewId, userId, movieId, rating, reviewText);
        res.json(review);
    } catch (error) {
        console.error(`Error updating review: ${error}`);
        res.status(500).json({ error: "Failed to update review" });
    }
}

export async function deleteReviewById(req:Request, res:Response){
    try{
        const reviewIdStr = Array.isArray(req.params.reviewId) ? req.params.reviewId[0] : (req.params.reviewId ?? '');
        const reviewId = parseInt(reviewIdStr, 10);
        if (Number.isNaN(reviewId)) return res.status(400).json({ error: 'Invalid reviewId' });                                                               
        await deleteReview(reviewId);
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(`Error deleting review: ${error}`);
        res.status(500).json({ error: "Failed to delete review" });
    }
}
