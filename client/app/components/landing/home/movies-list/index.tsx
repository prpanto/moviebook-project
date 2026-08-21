import type { MovieListResponse } from "~/types/movies";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import MoviesListCard from "./movies-list-card";
import MoviesListSkeleton from "./movies-list-skeleton";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

interface MovieListProps {
  title: string;
  to: string;
  data?: MovieListResponse;
  isPending?: boolean
}

export default function MoviesList({ title, to, data, isPending }: MovieListProps) {
  return (
    <section className="px-20 py-10 bg-background">
      <div className="mb-4 pb-1 border-b">
        <h2 className="text-lg lg:text-2xl font-semibold">{title}</h2>
      </div>

      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent>
          { isPending ? (<MoviesListSkeleton />) : (<MoviesListCard data={data} />) }
        </CarouselContent>
        
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-4 flex justify-center items-center">
        <Button asChild>
          <Link to={`/movies/${to}`}>More {title}</Link>
        </Button>
      </div>
    </section>
  )
}
