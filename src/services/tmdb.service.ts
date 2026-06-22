import axios from "axios";
import env from "dotenv";
import { NormalizedMovie, NormalizedPopularResponse, NormalizedSearchResponse, NormalizedSearchResult, TMDBMovieByID, TMDBPopularResponse, TMDBSearchResponse } from "../Types/tmdbtypes.js";

env.config();

const api_key = process.env.TMDB_API_KEY;
const Base_URL = "https://api.themoviedb.org/3"

//function to fetch movie data using movie id
export async function fetchMoviesById(id:number):Promise<NormalizedMovie>{
try{
  const response = await axios.get<TMDBMovieByID>(Base_URL+`/movie/${id}`,{params:{
    api_key:api_key,
  }})
  const result = normalizeMovie(response.data);
  return result;
}
catch(err){
  console.log(`ERROR fetching from tmdb ${err}`);
  throw new Error("Error fetching movie data from TMDB");
}
}

//function to fetch movie data using popularity
export async function fetchPopularMovies(page:number = 1):Promise<NormalizedPopularResponse> {
  try{
    const response = await axios.get<TMDBPopularResponse>(Base_URL+"/movie/popular",{params:{
      api_key:api_key,
      page:page,
    }})
    const result = normalizePopularMovie(response.data);
    return result;
    
  }
  catch(err){
  console.log(`ERROR fetching from tmdb ${err}`);
  throw new Error("Error fetching popular movies from TMDB");
}
}

export async function fetchSearchResults(query:string, page:number):Promise<NormalizedSearchResponse> {
  try{
    const response = await axios.get<TMDBSearchResponse>(Base_URL+"/search/movie",{params:{ 
      api_key:api_key,
      query:query,
      page:page,
    }})
    const result = normalizeSearchResult(response.data);
    return result;
  }
  catch(err){
  console.log(`ERROR fetching from tmdb ${err}`);
  throw new Error("Error fetching search results from TMDB");
}
}

export async function normalizeMovie(movie: TMDBMovieByID): Promise<NormalizedMovie> {

const {id, title, overview, poster_path, backdrop_path, genres, release_date, runtime, vote_average, vote_count} = movie;
return {
  id,
  title,
  overview,
  poster_path,
  backdrop_path,
  genres,
  release_date,
  runtime,
  vote_average,
  vote_count
};
}

export async function normalizePopularMovie(movie: TMDBPopularResponse): Promise<NormalizedPopularResponse>{
const results  = movie.results.map((movie)=>{
const {id,title,poster_path,release_date,vote_average} = movie;
return {
  id,
  title,
  poster_path,
  release_date,
  vote_average
}
})

const { page, total_pages, total_results } = movie;
return { page, results, total_pages, total_results };
}

export async function normalizeSearchResult(movie: TMDBSearchResponse): Promise<NormalizedSearchResponse>{
  const results = movie.results.map((movie)=>{
    const { id, title, poster_path, release_date } = movie;
    return {
      id,
      title,
      poster_path,
      release_date
    }
  })
 const {page, total_pages, total_results} = movie;
 return {page, results, total_pages, total_results};
}