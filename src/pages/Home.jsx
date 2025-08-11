import React, { useEffect, useState } from "react";
import { fetchPopularMovies, fetchGenres, fetchTrendingMovies, fetchMoviesByGenre } from "../services/tmdb";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Banner from "../Component/Home/Banners";
import RowPost from "../Component/Home/RowPost";
import Footer from "../component/LandingPage/Footer";

function Home() {
  const [popular, setPopular] = useState([]);
  const [bannerMovie, setBannerMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});

  useEffect(() => {
    async function getData() {
      const [popularMovies, trendingMovies, genreList] = await Promise.all([
        fetchPopularMovies(),
        fetchTrendingMovies(),
        fetchGenres(),
      ]);

      setPopular(popularMovies);
      setBannerMovie(trendingMovies[Math.floor(Math.random() * trendingMovies.length)]);
      setGenres(genreList);

      const genreMovieData = {};
      for (let genre of genreList) {
        const movies = await fetchMoviesByGenre(genre.id);
        genreMovieData[genre.name] = movies;
      }
      setGenreMovies(genreMovieData);
    }

    getData();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      {bannerMovie && <Banner movie={bannerMovie} />}

      <div className="px-4 md:px-8 lg:px-12 py-6 md:py-10">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Popular Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {popular.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="hover:scale-105 transition-transform">
              <div className="w-full">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-md w-full object-cover"
                />
                <p className="mt-2 text-sm font-medium truncate">{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Genre Rows */}
      {/* {genres.map((genre) => (
        genreMovies[genre.name]?.length > 0 && (
          <RowPost key={genre.id} title={genre.name} movies={genreMovies[genre.name]} />
        )
      ))} */}
      
      <Footer />
    </div>
  );
}

export default Home;