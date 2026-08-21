import { queryOptions } from "@tanstack/react-query";
import {
  nowPlayingMovies,
  popularMovies,
  topRatedMovies,
  upcomingMovies,
  searchMovies,
  detailMovie,
  genresMovies,
  movieCredits,
} from "~/services";

export const popularMoviesQueryOptions = queryOptions({
  queryKey: ["popular-movies"],
  queryFn: () => popularMovies(),
});

export const upcomingMoviesQueryOptions = queryOptions({
  queryKey: ["upcoming-movies"],
  queryFn: () => upcomingMovies(),
});

export const nowPlayingMoviesQueryOptions = queryOptions({
  queryKey: ["now-playing-movies"],
    queryFn: () => nowPlayingMovies(),
});

export const topRatedMoviesQueryOptions = queryOptions({
  queryKey: ["top-rated-movies"],
  queryFn: () => topRatedMovies(),
});

export const searchMoviesQueryOptions = (q: string) => queryOptions({
  queryKey: ["search-movies", { q }],
  queryFn: () => searchMovies(q),
});

export const detailMovieQueryOptions = (id: string | undefined) => queryOptions({
  queryKey: ["detail-movie", { id }],
  queryFn: () => detailMovie(id),
});

export const genresMovieQueryOptions = queryOptions({
  queryKey: ["genres-movies"],
  queryFn: () => genresMovies(),
});

export const creditsMovieQueryOptions = (id: string | undefined) => queryOptions({
  queryKey: ["credits-movie", { id }],
  queryFn: () => movieCredits(id),
});
