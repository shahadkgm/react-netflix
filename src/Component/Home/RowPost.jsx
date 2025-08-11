// src/components/Home/RowPost.jsx
import React from "react";
import { Link } from "react-router-dom";

const RowPost = ({ title, movies }) => {
  return (
    <div className="px-4 md:px-8 lg:px-12 py-6">
      <h3 className="text-xl md:text-2xl font-semibold mb-4">{title}</h3>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="flex-shrink-0 w-32 sm:w-40">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md w-full object-cover hover:scale-105 transition-transform"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RowPost;