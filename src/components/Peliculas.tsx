"use client";

import { Movie } from "@/types/movie.type";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

export default function Peliculas() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {loading ? (
        <div className="col-span-full text-center py-10 text-muted-foreground">
          Cargando...
        </div>
      ) : (
        movies.map((movie) => <MovieCard key={movie?.id} movie={movie} />)
      )}
    </div>
  );
}
