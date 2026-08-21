import { fetcher } from "~/lib/utils";
import type {
  MovieListResponse,
  GenresResponse,
  SearchResponse,
  MovieDetails,
  MovieCredits,
} from "~/types";

export async function popularMovies(page: string | number = 1): Promise<MovieListResponse> {
  return await fetcher<MovieListResponse>(`/movies/list?type=popular&page=${page}`);
}

export async function topRatedMovies(page: string | number = 1): Promise<MovieListResponse> {
  return await fetcher<MovieListResponse>(`/movies/list?type=top_rated&page=${page}`);
}

export async function upcomingMovies(page: string | number = 1): Promise<MovieListResponse> {
  return await fetcher<MovieListResponse>(`/movies/list?type=upcoming&page=${page}`);
}

export async function nowPlayingMovies(page: string | number = 1): Promise<MovieListResponse> {
  return await fetcher<MovieListResponse>(`/movies/list?type=now_playing&page=${page}`);
}

export async function genresMovies(): Promise<GenresResponse> {
  return await fetcher<GenresResponse>('/movies/genres');
}

export async function searchMovies(q: string): Promise<SearchResponse> {
  return await fetcher<SearchResponse>(`/movies/search?q=${q}`);
}

export async function detailMovie(id: string | undefined): Promise<MovieDetails> {
  return await fetcher<MovieDetails>(`/movies/${id}`);
}

export async function movieCredits(id: string | undefined): Promise<MovieCredits> {
  return await fetcher<MovieCredits>(`/movies/${id}/credits`);
}
