"use client";

import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { detailMovieQueryOptions } from "~/lib/query";
import Navbar from "~/components/landing/navbar";
import { Footer } from "~/components/landing/footer";
import MovieDetail from "~/components/landing/movies/detail";

export default function MovieDetails() {
  const { id } = useParams();
  const { data: movie, isPending } = useQuery(detailMovieQueryOptions(id)) 

  return (
    <>
      <Navbar />

      <MovieDetail movie={movie} isPending={isPending} />

      <Footer />
    </>
  );
};
