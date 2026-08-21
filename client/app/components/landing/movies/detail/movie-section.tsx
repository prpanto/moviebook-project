import type { MovieDetails } from "~/types";
import { Star, Clock, Clapperboard, Globe } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { cn } from "~/lib/utils";

export default function MovieDetails({ movie }: { movie: MovieDetails }) {
  return (
    <section>
      <div className="relative h-160 w-full">
        <div className="-z-1 size-full absolute inset-0">
          {movie.backdrop_path ? (<>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="size-full object-top object-cover"
            />

            <div className="size-full absolute inset-0 bg-black/30" />
          </>) : (
            <div className="size-full absolute inset-0 bg-black/50 dark:bg-white/50" />
          )}
        </div>

        <div className="p-10 mx-auto w-full max-w-7xl">
          <div className="mt-14 flex gap-4 py-6">
            {movie.backdrop_path ? (<img
              src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : "/placeholder.png"}
              alt={movie.title}
              className="h-100 w-60 object-top object-cover rounded-2xl"
            />) : (
              <div className="h-100 w-60 bg-black/80 dark:bg-white/80 rounded-2xl flex items-center justify-center">
                <Clapperboard className="text-white size-14" />
              </div>
            )}

            <div className="flex flex-col justify-center gap-4">
              <div className="flex flex-col gap-1 max-w-md">
                <h2 className="text-2xl/tight lg:text-4xl/tight font-bold text-white">{movie.title}</h2>
                <p className="text-sm/snug text-white/80">{movie.overview}</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" />
                  <span className="text-white/80">{movie.vote_average.toFixed(1)}/10</span>
                </div>

                <div className={cn("flex items-center gap-2", movie?.genres ? "divide-x divide-white/80" : "")}>
                  <div className={cn("flex items-center gap-1 text-white/80", movie?.genres ? "pr-2" : "")}>
                    <Clock />
                    <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : "Unknown"}</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/80">
                    {movie?.genres && movie?.genres.map(genre => (
                      <Badge key={genre.id}>{genre.name}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <Button>
                    <Clapperboard />
                    Watch Trailer
                  </Button>

                  <Button variant="link" size="sm" asChild className="text-white/80">
                    <Link to={movie.homepage} target="__blank">
                      <Globe />
                      Homepage
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 mx-auto w-full max-w-7xl">
        Details
      </div>
    </section>
  );
};
