"use client";

import MovieSlider from "./movie-slider";
import SliderSkeleton from "./slider-skeleton";
import type { MovieListResponse } from "~/types";

export default function HeroSlider({ data, isPending }: { data?: MovieListResponse; isPending?: boolean }) {
  if (isPending) return <SliderSkeleton />;

  const movies = data?.results.slice(0, 6);

  return <MovieSlider data={movies} />;
};
