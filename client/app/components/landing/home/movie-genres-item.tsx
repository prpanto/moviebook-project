import { useQuery } from "@tanstack/react-query";
import { genresMovieQueryOptions } from "~/lib/query";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils"

interface MovieGenreItemProps {
  values?: number[];
  className?: string;
}

export default function MovieGenresItem({ values, className }: MovieGenreItemProps) {
  const { data, isPending } = useQuery(genresMovieQueryOptions);

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-14 bg-white/50" />
        <Skeleton className="h-6 w-14 bg-white/50" />
      </div>
    );
  }

  const genres = (values && data?.genres) 
    ? values
      .map((id) => data.genres.find((genre) => genre.id === id)?.name)
      .filter(Boolean) as string[]
    : [];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {genres.map((genre, index) => (
        <Badge key={index}>{genre}</Badge>
      ))}
    </div>
  );
}
