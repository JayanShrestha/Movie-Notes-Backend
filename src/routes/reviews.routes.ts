import Router from "express";
import { postReview, getReviewsByMovieId, updateReview, deleteReview } from "../controllers/reviews.controller.js";

const router = Router();

// Create Review
router.post("/review", postReview);

// Get Reviews for a Movie
router.get("/reviews/:movieId", getReviewsByMovieId);

// Update Review
router.put("/review/:reviewId", updateReview);

// Delete Review
router.delete("/review/:reviewId", deleteReview); 

export default router;