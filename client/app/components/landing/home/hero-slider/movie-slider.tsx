"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "~/components/ui/carousel";
import { cn } from "~/lib/utils";
import { type LucideIcon, Star, Clock, ChevronRight, Clapperboard } from "lucide-react";
import Autoplay from "embla-carousel-autoplay"
import type { Movie } from "~/types";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import MovieGenresItem from "~/components/landing/home/movie-genres-item";

interface MovieSliderProps {
  data: Movie[] | undefined;
}

export default function MovieSlider({ data }: MovieSliderProps  ) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!data) {
    return null;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        className="size-full"
      >
        <CarouselContent className="h-screen ml-0">
          {data.map((movie, index) => (
            <CarouselItem key={index} className="h-screen w-full pl-0">
              <figure className="relative h-screen w-full">
                <img
                  src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "/placeholder.png"}
                  alt={`img-${index}`}
                  className="absolute inset-0 size-full object-cover"
                />

                <div className="absolute inset-0 bg-black/50" />

                <figcaption className="h-full absolute px-4 lg:px-10 flex flex-col justify-center gap-4">
                  <MovieItem
                    className="flex-col lg:max-w-lg"
                    label={movie.title}
                    labelClassName="text-white text-3xl lg:text-6xl font-bold"
                    value={movie.overview}
                  />

                  <div className="flex flex-col gap-2">
                    <MovieItem
                      className="items-center"
                      icon={Star}
                      iconClassName="text-yellow-400 fill-current"
                      value={`${movie.vote_average > 0 ? movie.vote_average.toFixed(1) : movie.vote_average}/10`}
                    >
                      {/* <span className="text-white/80 text-sm lg:text-base">({movie.vote_count} reviews)</span> */}
                    </MovieItem>

                    <div className="flex items-center space-x-2 divide-x divide-white/80">
                      <MovieItem
                        className="items-center pr-2"
                        icon={Clock}
                        value={movie?.release_date ? new Date(movie?.release_date).getFullYear() : "Unknown year"}
                      />

                      <MovieGenresItem values={movie.genre_ids} />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-fit">
                    <Button asChild>
                      <Link to={`/movie/${movie.id}`}>
                        <ChevronRight />
                        Show More
                      </Link>
                    </Button>

                    <Button variant="outline">
                      <Clapperboard />
                      Watch Trailer
                    </Button>
                  </div>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn("h-2 rounded-full transition-all duration-300 cursor-pointer", {
              "bg-primary w-6": index + 1 === current,
              "bg-primary/50 w-2 hover:bg-muted-foreground/50": index + 1 !== current,
            })}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

interface MovieItemProps {
  className?: string;
  label?: string;
  labelClassName?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  value?: string | number;
  valueClassName?: string;
  children?: React.ReactNode;
}

function MovieItem({ className, label, labelClassName, icon: Icon, iconClassName, value, valueClassName, children }: MovieItemProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      {label && (<h2 className={cn(labelClassName)}>{label}</h2>)}
      {Icon && (<Icon className={cn("text-white/80 size-5", iconClassName)} />)}
      {value && (<p className={cn("text-white/80 text-sm lg:text-md", valueClassName)}>{value}</p>)}
      {children}
    </div>
  )
}
