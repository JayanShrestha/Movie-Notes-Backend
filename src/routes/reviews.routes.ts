import Router from "express";
import { postReview, getReviewsByMovieId, updateReviewById, deleteReviewById } from "../controllers/reviews.controller.js";
import {authenticate} from "../middleware/auth.js";

const router = Router();

//testing reviews routes
router.get("/", (req, res)=>{
    res.json("Reviews Routes are working fine !");
});


// Create Review
router.post("/post", authenticate, postReview);

// Get Reviews for a Movie
router.get("/get", authenticate, getReviewsByMovieId);

// Update Review
router.put("/update", authenticate, updateReviewById);

// Delete Review
router.delete("/delete", authenticate, deleteReviewById);

export default router;