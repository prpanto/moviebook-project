"use client";

import Logo from "~/components/logo"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { navigation } from "~/content/landing/navbar"
import { cn } from "~/lib/utils";
import { Link } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";
import { Search as SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchMoviesQueryOptions } from "~/lib/query";
import { useState, useEffect } from "react";
import type { SearchResponse } from "~/types";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Card,
  CardContent,
} from "~/components/ui/card";
import { Film } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent">
      <div className="flex items-center justify-between px-6 py-3 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-6">
          <Logo />
          
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item, index) =>(
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), "text-white hover:text-black focus:text-black")}>
                    <Link to={item.href}>{item.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Search />
        
        <div className="flex items-center gap-2">
          <Button asChild variant="link">
            <Link to="/register" className="text-white">Register</Link>
          </Button>

          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Search() {
  const [q, setQ] = useState('')
  const [debouncedQ, setDebouncedQ] = useState(q)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedQ(q), 300)
    return () => window.clearTimeout(timer)
  }, [q]);

  const { data, isFetching } = useQuery({
    ...searchMoviesQueryOptions(debouncedQ),
    enabled: !!debouncedQ.trim(),
  });
  const movies = (data as SearchResponse | undefined)?.results;
  const total_pages = (data as SearchResponse | undefined)?.total_pages;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setQ('')
          setDebouncedQ('')
        }
        setOpen(nextOpen)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full max-w-xs">
          <SearchIcon />
          Search
        </Button>
      </DialogTrigger>

      <DialogContent showCloseButton={false} className="w-full max-w-5xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <Input type="text" placeholder="Search..." onChange={(e) => setQ(e.target.value)} />
          </DialogTitle>
        </DialogHeader>

        {isFetching && (
          <DialogDescription asChild>
            <div className="h-80 grid grid-cols-5 gap-2">
              {Array.from({ length: 15 }).map((_, index) => (
                <Skeleton key={index} className="size-full" />
              ))}
            </div>
          </DialogDescription>
        )}

        {movies && movies.length > 0 && (
          <DialogDescription asChild>
            <div className="grid grid-cols-5 justify-center gap-2">
              {movies.map(movie => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="group block size-full"
                  onClick={() => setOpen(false)}
                >
                  <Card className="p-0 size-full overflow-hidden">
                    <CardContent className="relative size-full p-0">
                      {movie.poster_path ? (
                        <>
                          <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : "/placeholder.png"}
                            alt={`img-${movie.id}`}
                            className="h-40 w-full object-cover"
                          />

                          <div className="pointer-events-none absolute inset-0 flex justify-center items-center bg-black/0 p-2 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100">
                            <span className="text-sm font-semibold text-white text-center">{movie.title}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2 size-full">
                          <Film />
                          <span className="text-xs text-center">{movie.title}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}

              {(total_pages && total_pages > 1) && (<div className="mt-2 col-span-5 w-full flex items-center justify-center">
                <Button variant="outline" asChild>
                  <Link to={`/search?q=${q}`} className="font-semibold" onClick={() => setOpen(false)}>Show More</Link>
                </Button>
              </div>)}
            </div>
          </DialogDescription>
        )}

        {/*
        <DialogFooter className="justify-end p-1">
          <DialogClose asChild>
            <Button type="button" variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter> 
        */}
      </DialogContent>
    </Dialog>
  );
}
