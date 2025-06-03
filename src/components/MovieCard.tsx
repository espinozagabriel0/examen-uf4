// "use client";

// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Movie } from "@/types/movie.type";
// import Image from "next/image";
// import { PlayCircle, Star } from "lucide-react";

// type MovieCardProps = {
//   movie: Movie;
// };

// export default function MovieCard({ movie }: MovieCardProps) {
//   return (
//     <Card className="">
//       <div className="relative h-72 w-full">
//         <Image
//           src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//           alt={movie.title}
//           fill
//           className="object-cover"
//           sizes="(max-width: 400px) 100vw, 400px"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
//         <Button
//           size="icon"
//           variant="secondary"
//           className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
//         >
//           <PlayCircle className="w-6 h-6" />
//         </Button>
//       </div>
//       <CardHeader className="pb-2 pt-4 px-4">
//         <CardTitle className="text-lg font-bold truncate">
//           {movie.title}
//         </CardTitle>
//         <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
//           <span>{movie.release_date}</span>
//           <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground" />
//           <span className="flex items-center gap-1">
//             <Star size={15} className="text-yellow-400" fill="yellow" />
//             <span>{movie.vote_average.toFixed(1)}</span>
//           </span>
//         </p>
//       </CardHeader>
//       <CardContent className="px-4 pb-2">
//         <p className="text-sm text-muted-foreground line-clamp-3">
//           {movie.overview}
//         </p>
//       </CardContent>
//       <CardFooter className="px-4 pb-4 flex items-center justify-between">
//         <span className="text-xs text-muted-foreground">
//           {movie.original_title} ({movie.original_language.toUpperCase()})
//         </span>
//         <Button
//           size="sm"
//           variant="outline"
//           className="rounded-full text-xs px-3 py-1"
//         >
//           Ver más
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
