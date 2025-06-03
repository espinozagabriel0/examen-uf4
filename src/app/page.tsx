"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    </>
  );
}
