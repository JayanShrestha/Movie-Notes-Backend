import {Request, Response} from "express";
import {createReview, getReviewsByMovieId, updateReview, deleteReview} from "../services/reviews.service.js";

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

export async function getReviews(req:Request, res:Response){
    try{
    const movieId = req.params.movieId;
        const reviews = await getReviewsByMovieId(movieId.toString());
        res.json(reviews);
    } catch (error) {
        console.error(`Error fetching reviews: ${error}`);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
}

export async function updateReview(req:Request, res:Response){
    try{
        const reviewId = req.params.reviewId;
        const { userId, movieId, rating, reviewText } = req.body;
        const review = await updateReview(reviewId, userId, movieId, rating, reviewText);
        res.json(review);
    } catch (error) {
        console.error(`Error updating review: ${error}`);
        res.status(500).json({ error: "Failed to update review" });
    }
}

export async function deleteReview(req:Request, res:Response){
    try{
        const reviewId = req.params.reviewId;
        await deleteReview(reviewId);
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error(`Error deleting review: ${error}`);
        res.status(500).json({ error: "Failed to delete review" });
    }
}
