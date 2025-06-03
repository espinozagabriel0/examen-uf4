"use client";

import Peliculas from "@/components/Peliculas";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
export default function MovieExplorer() {
  return (
    <>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account" className="">
            Populares
          </TabsTrigger>
          <TabsTrigger value="password">Favoritos</TabsTrigger>
        </TabsList>
        <TabsContent value="account"></TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
      <h1 className="text-4xl mt-3 mb-7 font-semibold">Películas Populares</h1>
      <div className="relative ">
        <Input className="my-3 pl-10" placeholder="Buscar películas"/>
        <Search className="absolute left-2 top-2" size={20}/>
      </div>
      <Peliculas />
    </>
  );
}
