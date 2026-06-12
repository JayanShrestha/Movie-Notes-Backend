import {prisma} from "../db.js";

export async function createReview(userId: string, movieId: string, rating: number, reviewText?: string) {
    try {
        const review = await prisma.reviews.create({
            data: {
                user_Id: userId,
                movie_Id: movieId,
                rating,
                review_text: reviewText,
            },
        });
        return review;
    } catch (error) {
        console.error(`Error creating review: ${error}`);
        throw new Error("Failed to create review");
    }
}

export async function getReviewsByMovieId(movieId: string) {

    try {
        const reviews = await prisma.reviews.findMany({
            where: { movie_Id: movieId },   
        });
        return reviews;
    } catch (error) {
        console.error(`Error fetching reviews: ${error}`);
        throw new Error("Failed to fetch reviews");
    }
}
