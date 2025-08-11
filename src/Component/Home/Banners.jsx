// src/components/Home/Banner.jsx
import React from "react";

const Banner = ({ movie }) => {
  return (
    <div
      className="relative h-[450px] md:h-[550px] bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/90" />

      <div className="relative z-10 px-6 md:px-12 pt-32 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{movie.title}</h1>
        <p className="text-sm md:text-base text-gray-200 line-clamp-3 mb-6">{movie.overview}</p>
        <div className="space-x-3">
          <button className="bg-white text-black px-6 py-2 font-semibold rounded-md hover:bg-gray-300">
            ▶ Play
          </button>
          <button className="bg-gray-600 text-white px-6 py-2 font-semibold rounded-md hover:bg-gray-500">
            + My List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;