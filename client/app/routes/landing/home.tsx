"use client";

import {
  upcomingMoviesQueryOptions,
  popularMoviesQueryOptions,
  nowPlayingMoviesQueryOptions,
  topRatedMoviesQueryOptions
} from "~/lib/query";
import Navbar from "~/components/landing/navbar";
import HeroSlider from "~/components/landing/home/hero-slider";
import MoviesList from "~/components/landing/home/movies-list"
import { useQuery } from "@tanstack/react-query";
import { Footer } from "~/components/landing/footer";

export default function Home() {
  const { data: upcoming, isPending: isPendingUpcoming } = useQuery(upcomingMoviesQueryOptions);
  const { data: nowPlaying, isPending: isPendingNowPlaying } = useQuery(nowPlayingMoviesQueryOptions);
  const { data: popular, isPending: isPendingPopular } = useQuery(popularMoviesQueryOptions);
  const { data: topRated, isPending: isPendingTopRated } = useQuery(topRatedMoviesQueryOptions);

  return (
    <>
      <Navbar />

      <HeroSlider
        data={upcoming}
        isPending={isPendingUpcoming}
      />

      <MoviesList
        title="Now Playing"
        to="now-playing"
        data={nowPlaying}
        isPending={isPendingNowPlaying}
      />

      <MoviesList
        title="Popular"
        to="popular"
        data={popular}
        isPending={isPendingPopular}
      />
  
      <MoviesList
        title="Top Rated"
        to="top-rated"
        data={topRated}
        isPending={isPendingTopRated}
      />
      
      <MoviesList
        title="Upcoming"
        to="upcoming"
        data={upcoming}
        isPending={isPendingUpcoming}
      />

      <Footer />
    </>
  );
};
