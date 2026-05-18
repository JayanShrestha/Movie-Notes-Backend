import axios from "axios";
import env from "dotenv";
import { TMDBMovieByID, TMDBPopularResponse } from "../Types/tmdbtypes.js";
env.config();

const api_key = process.env.TMDB_API_KEY;
const Base_URL = "https://api.themoviedb.org/3"

//function to fetch movie data using movie id
export async function fetchMoviesById(id:number):Promise<TMDBMovieByID>{
try{
  const response = await axios.get<TMDBMovieByID>(Base_URL+`/movie/${id}`,{params:{
    api_key:api_key,
  }})
  return response.data;
}
catch(err){
  console.log(`ERROR fetching from tmdb ${err}`);
  throw new Error("Error fetching movie data from TMDB");
}
}
//function to fetch movie data using popularity
export async function fetchPopularMovies(page:number = 1):Promise<TMDBPopularResponse> {
  try{
    const response = await axios.get<TMDBPopularResponse>(Base_URL+"/movie/popular",{params:{
      api_key:api_key,
      page:page,
    }})
    return response.data;
    
  }
  catch(err){
  console.log(`ERROR fetching from tmdb ${err}`);
  throw new Error("Error fetching popular movies from TMDB");
}
}