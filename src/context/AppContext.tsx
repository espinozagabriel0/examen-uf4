"use client";
import { Movie } from "@/types/movie.type";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type AppContextType = {
  peliculasFavoritas: Movie[];
  setPeliculasFavoritas: Dispatch<SetStateAction<Movie[]>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [peliculasFavoritas, setPeliculasFavoritas] = useState<Movie[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedMovies = localStorage.getItem("favoriteMovies");
      setPeliculasFavoritas(storedMovies ? JSON.parse(storedMovies) : []);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "favoriteMovies",
        JSON.stringify(peliculasFavoritas)
      );
    }
  }, [peliculasFavoritas]);

  return (
    <AppContext.Provider
      value={{
        peliculasFavoritas,
        setPeliculasFavoritas,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
