import {prisma} from "../db.js";

export async function createReview(userId: number, movieId: number, rating: number, reviewText?: string) {
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

export async function readReview(userId: number, movieId: number) {

    try {
        const reviews = await prisma.reviews.findMany({
            where: { user_Id: userId, movie_Id: movieId},   
        });
        return reviews;
    } catch (error) {
        console.error(`Error fetching reviews: ${error}`);
        throw new Error("Failed to fetch reviews");
    }
}

export async function updateReview(reviewId: number, userId: number, reviewText?: string){
    try {
        const review = await prisma.reviews.findUnique({where: {id:reviewId}});
        if(!review || review.user_Id !== userId){
            throw new Error("Forbidden");
        }
        const updated = await prisma.reviews.update({
            where: { id: reviewId },
            data: {
                review_text: reviewText,
            },
        });
        return updated;
    } catch (error) {
        console.error(`Error updating review: ${error}`);
        throw new Error("Failed to update review");
    }
}

export async function deleteReview(reviewId: number, userId: number){
    try {
        const review = await prisma.reviews.findUnique({
            where: { id: reviewId },
        });
        if(!review || review.user_Id !== userId){
            throw new Error("Forbidden");
        }
        const deletedReview =  await prisma.reviews.delete({
            where: {id: reviewId}
        })
        return deleteReview;
    }
        catch (error) {
        console.error(`Error deleting review: ${error}`);
        throw new Error("Failed to delete review");
    }
}