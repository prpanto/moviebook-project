import type { Movie } from "~/types";
import MovieSection from "./movie-section";
import MovieSkeleton from "./movie-skeleton"

export default function MovieDetail({ movie, isPending }: { movie: Movie | undefined, isPending: boolean }) {
  if (isPending) return (<MovieSkeleton />);

  return (movie && <MovieSection movie={movie} />);
};
