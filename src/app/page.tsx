"use client";

import Peliculas from "@/components/Peliculas";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppContext } from "@/context/AppContext";
import { Search, Star } from "lucide-react";
import { useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
export default function MovieExplorer() {
  const { peliculasFavoritas } = useContext(AppContext);
  return (
    <>
      <Tabs defaultValue="populares" className="w-full">
        <TabsList>
          <TabsTrigger value="populares" className="">
            Populares
          </TabsTrigger>
          <TabsTrigger value="favoritos">Favoritos</TabsTrigger>
        </TabsList>
        <TabsContent value="populares">
          <h1 className="text-4xl mt-3 mb-7 font-semibold">
            Películas Populares
          </h1>
          <div className="relative ">
            <Input className="my-3 pl-10" placeholder="Buscar películas" />
            <Search className="absolute left-2 top-2" size={20} />
          </div>
          <Peliculas />
        </TabsContent>
        <TabsContent value="favoritos">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 border">
            {peliculasFavoritas.length > 0 ? (
              peliculasFavoritas.map((movie) => (
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
                  </div>
                  <CardHeader className="pb-2 pt-4 px-4">
                    <CardTitle className="text-lg font-bold truncate">
                      {movie.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                      <span>{movie.release_date}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="flex items-center gap-1">
                        <Star
                          size={15}
                          className="text-yellow-400"
                          fill="yellow"
                        />
                        <span>{movie.vote_average.toFixed(1)}</span>
                      </span>
                    </p>
                  </CardHeader>
                  <CardContent className="px-4 pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {movie.overview}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No tienes películas favoritas aún.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
