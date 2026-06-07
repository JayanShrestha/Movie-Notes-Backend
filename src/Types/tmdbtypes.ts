export interface TMDBMovieByID {
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

export interface TMDBPopularResponse{
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

export interface NormalizedMovie {
  id: number;
  title:string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genres: {id: number; name: string}[];
  release_date: string;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
}

export interface NormalizedPopularResponse{
  page: number;
  results: NormalizedPopularMovie[];
  total_pages: number;
  total_results: number;
}

export interface NormalizedPopularMovie {
id: number;
title: string;
poster_path: string | null;
release_date: string;
vote_average: number;
}

export interface NormalizedSearchResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}