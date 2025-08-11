import React, { useEffect, useState } from "react";
import { fetchPopularMovies } from "../../services/tmdb";
import '../../index.css';
import axios from "axios";
import axiosInstance from "../../api";


function Trends() {
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    const getMovies = async () => {
      try {
        const results = await fetchPopularMovies();
        setMovies(results.slice(0, 10)); // show only first 10
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    getMovies();
  }, []);
  const HandleMovie=(id)=>{
console.log(id)
axiosInstance
  .get(`/movie/${id}/videos`)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => console.log(error, "from login"));

  }

  return (
    <div className="pt-6 md:pt-10 px-4 md:px-8 lg:px-12">
      <div className="font-bold text-xl md:text-2xl py-3 md:py-5">Trending Now</div>

      <div className="flex gap-4 md:gap-6 lg:gap-10 overflow-x-auto hide-scrolbar pb-4">
        {movies.map((movie, index) => (
          <div key={movie.id} className="relative flex-shrink-0">
            <img
              className="rounded-lg md:rounded-2xl w-32 sm:w-40 md:w-44 lg:w-48 aspect-[3/4] object-cover"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path} `}
              alt={movie.title}
              onClick={()=>HandleMovie(movie.id)}
            />
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold absolute bottom-0 left-[-15px] sm:left-[-20px] md:left-[-25px] text-stroke-white select-none">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trends;