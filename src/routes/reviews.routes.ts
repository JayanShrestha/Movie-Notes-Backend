import Router from "express";
import { postReview, getReviewsByMovieId, updateReviewById, deleteReviewById } from "../controllers/reviews.controller.js";

const router = Router();

//testing reviews routes
router.get("/", (req, res)=>{
    res.json("Reviews Routes are working fine !");
});


// Create Review
router.post("/review", postReview);

// Get Reviews for a Movie
router.get("/reviews/:movieId", getReviewsByMovieId);

// Update Review
router.put("/review/:reviewId", updateReviewById);

// Delete Review
router.delete("/review/:reviewId", deleteReviewById); 

export default router;