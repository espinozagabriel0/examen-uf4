"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Movie } from "@/types/movie.type";
import Image from "next/image";
import { PlayCircle, Star } from "lucide-react";
import Detalle from "./Detalle";
import { cn } from "@/lib/utils";

export default function Peliculas() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const getMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=es-ES`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      setMovies(data?.results || []);
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className={cn("grid grid-cols-1 gap-5", selectedMovie && "grid-cols-2")}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            Cargando...
          </div>
        ) : (
          movies.map((movie) => (
            <Card className="" key={movie?.id}>
              <div className="relative h-72 w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 400px) 100vw, 400px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <PlayCircle className="w-6 h-6" />
                </Button>
              </div>
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-lg font-bold truncate">
                  {movie.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                  <span>{movie.release_date}</span>
                  <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="flex items-center gap-1">
                    <Star size={15} className="text-yellow-400" fill="yellow" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </span>
                </p>
              </CardHeader>
              <CardContent className="px-4 pb-2">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {movie.overview}
                </p>
              </CardContent>
              <CardFooter className="px-4 pb-4 flex items-center justify-between">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full text-xs px-3 py-1"
                  onClick={() => setSelectedMovie(movie)}
                >
                  Ver más
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
      {selectedMovie && (
        <Detalle movie={selectedMovie} setSelectedMovie={setSelectedMovie} />
      )}
    </div>
  );
}
