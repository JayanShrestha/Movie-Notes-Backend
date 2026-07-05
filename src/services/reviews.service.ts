import {prisma} from "../db.js";

export async function createReview(userId: number, tmdbId: number, rating: number, reviewText?: string) {
    try {
        const review = await prisma.reviews.create({
            data: {
                user_Id: userId,
                tmdb_id: tmdbId,
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

export async function readReviewByMovieId(tmdbId: number) {

    try {
        const review = await prisma.reviews.findMany({
            where: {tmdb_id: tmdbId},   
        });
        return review;
    } catch (error) {
        console.error(`Error fetching review: ${error}`);
        throw new Error("Failed to fetch review");
    }
}

export async function readReviewByUserId(userId: number) {

    try {
        const review = await prisma.reviews.findMany({
            where: {user_Id: userId},  
        });
        return review;
    } catch (error) {
        console.error(`Error fetching review: ${error}`);
        throw new Error("Failed to fetch review");
    }
}

export async function readReviewByIds(userId: number, tmdbId: number){
     try {
        const review = await prisma.reviews.findFirst({
            where: {user_Id: userId, tmdb_id: tmdbId},  
        });
        return review;
    } catch (error) {
        console.error(`Error fetching review: ${error}`);
        throw new Error("Failed to fetch review");
    }
}

export async function updateReview(reviewId: number, userId: number, rating: number, reviewText?: string){
    try {
        const review = await prisma.reviews.findUnique({where: {id:reviewId}});
        if(!review || review.user_Id !== userId){
            throw new Error("Forbidden");
        }
        const updated = await prisma.reviews.update({
            where: { id: reviewId },
            data: {
                rating: rating,
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
            throw new Error("Forbidden, invalid user or review does not exist");
        }
        const deletedReview =  await prisma.reviews.delete({
            where: {id: reviewId}
        })
        return deletedReview;
    }
        catch (error) {
        console.error(`Error deleting review: ${error}`);
        throw new Error("Failed to delete review");
    }
}

export async function checkReviewOwnership(userId: number, tmdbId: number): Promise<boolean> {
    try {
        const reviews = await prisma.reviews.findFirst({
            where: { user_Id: userId, tmdb_id: tmdbId },
        });
        if(!reviews){
            return false;
        }
        return true;
    } catch (error) {
        console.error(`Error checking review ownership: ${error}`);
        throw new Error("Failed to check review ownership");
    }
}
