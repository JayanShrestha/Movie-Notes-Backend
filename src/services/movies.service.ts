import {prisma} from "../db.js";
import { NormalizedMovie } from "../Types/tmdbtypes.js";

export async function checkTmdbIdExists(tmdbId: number):Promise<Boolean>{ // checks if a movie with the given tmdbId exists in the database
    try{
        const movie = await prisma.movies.findUnique({
            where: {tmdb_id: tmdbId}
        });
        if(!movie){
            return false;
        }
        return true;
    }
    catch(err){
        console.log(`Error checking with tmdbId ${tmdbId}: ${err}`);
        throw new Error("Error checking movie");
    }
}

export async function createMovie(movie: NormalizedMovie){// creates a movie in the database if it doesn't exist already
    try{
        const createdMovie = await prisma.movies.create({
            data: {
                title: movie.title,
                overview: movie.overview,
                tmdb_id: movie.id,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                genres: movie.genres,
                release_date: movie.release_date,
                runtime: movie.runtime,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count
            }
        });
        return createdMovie;
    }
    catch(err){
        console.log(`Error creating movie with tmdbId ${movie.id}: ${err}`);
        throw new Error("Error creating movie");
    }

            }
