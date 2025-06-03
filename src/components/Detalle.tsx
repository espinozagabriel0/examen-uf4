"use client";

import { ArrowLeft, Calendar, Play, Star, Timer } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { AppContext } from "@/context/AppContext";

export default function Detalle({ movie, setSelectedMovie }) {
  const { setPeliculasFavoritas } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState(null);

  const getMovieDetails = async () => {
    setLoading(true);
    try {
      const id = movie?.id;
      if (!id) return;
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie?.id}?language=es-ES&append_to_response=videos,credits`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
          },
        }
      );
      const data = await response.json();
      setMovieData(data || []);

      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(movieData);

  useEffect(() => {
    getMovieDetails();
  }, [movie]);

  return (
    <div className="border min-w-[40rem] p-2">
      <span
        className="border p-2 rounded-full size-8 flex items-center justify-center cursor-pointer"
        onClick={() => setSelectedMovie(null)}
      >
        <ArrowLeft />
      </span>
      <div className="mt-2">
        {loading ? (
          <div>Cargando</div>
        ) : (
          <>
            <div className="relative max-h-[10rem] w-full h-[20rem]">
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movieData?.backdrop_path}`}
                alt={movieData?.title || "Imagen Película"}
                fill
                className="object-cover w-full h-full"
                sizes="(max-width: 900px) 100vw, 900px"
              />
            </div>

            <h2 className="text-3xl font-semibold my-3">{movieData?.title}</h2>

            <div className="flex items-center gap-2">
              <Button
                onClick={() =>
                  setPeliculasFavoritas((prev) =>
                    prev.some((movie) => movie.id === movieData.id)
                      ? prev
                      : [...prev, movieData]
                  )
                }
              >
                <Star />
                Agregar a Favoritos
              </Button>

              <Button variant={"outline"}>
                <Play />
                Ver tráiler
              </Button>
            </div>

            <div className="my-5 space-y-3">
              <h3 className="text-xl font-semibold">Sinopsis</h3>
              <p>{movieData?.overview}</p>
            </div>

            <div className="my-5 space-y-3">
              <h3 className="text-xl font-semibold">Géneros</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {movieData?.genres.map((genre) => (
                  <span
                    key={genre?.id}
                    className="rounded-full px-3 py-1 bg-black text-white"
                  >
                    {genre?.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between px-5">
              <div className="flex items-center gap-2">
                <Calendar size={15} />
                <div>
                  <h3 className="font-semibold">Fecha de estreno</h3>
                  <span>{movieData?.release_date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Timer size={15} />
                <div>
                  <h3 className="font-semibold">Duración</h3>
                  <span>{movieData?.runtime} minutos</span>
                </div>
              </div>
            </div>

            <div className="my-5">
              <h3 className="text-xl font-semibold mb-3">Reparto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {movieData?.credits?.cast.map((actor) => (
                  <div key={actor?.id} className="flex flex-col items-center">
                    <div className="w-25 h-20 relative rounded-full mb-2">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${actor?.profile_path}`}
                        alt={actor?.name || "Imagen actor"}
                        className="object-cover w-full h-full"
                        fill
                      />
                    </div>
                    <p className="text-sm font-medium text-center">
                      {actor?.name}
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      {actor?.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
