import axios from "axios";
import env from "dotenv";
import { preProcessFile } from "typescript";

env.config();
interface TMDBMovieByID {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string; // TMDB returns a string, not Date
  runtime: number | null;
  genres: { id: number; name: string }[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  homepage: string | null;
  imdb_id: string | null;

  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];

  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];

  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];

  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  } | null;
}

interface TMDBPopularResponse{
  page: number;
  results: TMDBPopularMovie[];
  total_pages: number;
  total_results: number;
}
interface TMDBPopularMovie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Base_URL = "https://api.themoviedb.org/3"

//function to fetch movie data using movie id
export async function fetchMoviesById(id:number):Promise<TMDBMovieByID | Error>{
try{
  const response = await axios.get(Base_URL+`/movie/${id}`,{params:{
    api_key:process.env.TMDB_API_KEY,
  }})
  return response.data;
}
catch(err){
  console.log(`ERROR fetching from tmdb ${err}`);
  throw new Error;
}
}
//function to fetch movie data using popularity
export async function fetchPopularMovies():Promise<TMDBPopularResponse | Error> {
  try{
    const response = await axios.get(Base_URL+"/movie/popular",{params:{
      api_key: process.env.TMDB_API_KEY,
    }})
    return response.data;
    
  }
  catch(err){
  console.log(`ERROR fetching from tmdb ${err}`);
  throw new Error;
}
}