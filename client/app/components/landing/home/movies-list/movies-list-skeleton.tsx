
import { CarouselItem } from "~/components/ui/carousel";
import { Skeleton } from "~/components/ui/skeleton";

export default function MoviesListSkeleton() {
  return (
    Array.from({ length: 10 }).map((_, index) => (
      <CarouselItem key={index} className="h-90 basis-1/1 md:basis-1/3 lg:basis-1/6">
        <div className="size-full p-1">
          <Skeleton className="size-full" />
        </div>
      </CarouselItem>
    ))
  )
}
