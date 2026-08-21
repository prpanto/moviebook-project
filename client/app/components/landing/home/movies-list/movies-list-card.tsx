import {
  Card,
  CardContent
} from "~/components/ui/card";
import { CarouselItem } from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import { Star, Clock, type LucideIcon } from "lucide-react";
import type { MovieListResponse } from "~/types";
import { Link } from "react-router";
import MovieGenresItem from "~/components/landing/home/movie-genres-item";

interface MovieListProps {
  data?: MovieListResponse;
}

export default function MoviesListCard({ data }: MovieListProps) {
  return (
    data?.results.map(movie => (
      <CarouselItem key={movie.id} className="basis-1/1 md:basis-1/3 lg:basis-1/6">
        <div className="p-1 size-full">
          <Link to={`/movie/${movie.id}`} className="size-full">
            <Card className="relative p-0 size-full">
              <div className="">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="size-auto bg-cover object-cover" />
              </div>

              <CardContent className="px-3 py-2 w-full absolute bottom-0 bg-black/50 backdrop-blur-md">
                <span className="text-white text-lg leading-0">{movie.title}</span>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2 divide-x divide-white/80">
                    <MovieItem
                      className="pr-2"
                      icon={Star}
                      iconClassName="text-yellow-400 fill-current"
                      value={`${movie.vote_average > 0 ? movie.vote_average.toFixed(1) : movie.vote_average}/10`}
                    />

                    <MovieItem
                      icon={Clock}
                      value={movie?.release_date ? new Date(movie?.release_date).getFullYear() : "Unknown year"}
                    />
                  </div>

                  <MovieGenresItem values={movie.genre_ids} className="flex-wrap" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </CarouselItem>
    ))
  )
}

interface MovieItemProps {
  className?: string;
  icon: LucideIcon;
  iconClassName?: string;
  value?: string | number;
}

function MovieItem({ className, icon: Icon, iconClassName, value, }: MovieItemProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Icon className={cn("text-white/80 size-4", iconClassName)} />
      <p className="text-white/80 text-sm">{value}</p>
    </div>
  )
}
