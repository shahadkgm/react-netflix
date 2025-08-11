import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieById, fetchMovieTrailer } from "../services/tmdb";
import Navbar from "../component/Navbar";
import Footer from "../Component/LandingPage/Footer";

function Watch() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    async function loadData() {
      const movieData = await fetchMovieById(id);
      const trailerData = await fetchMovieTrailer(id);
      setMovie(movieData);
      setTrailer(trailerData);
    }
    loadData();
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Movie Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Now Playing
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-red-400">
            {movie.title}
          </h2>
        </div>

        {/* Video Container */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden">
            {trailer ? (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 md:h-80 lg:h-96 bg-gray-700">
                <div className="text-center">
                  <div className="text-6xl mb-4 text-gray-500">
                    🎬
                  </div>
                  <p className="text-xl text-gray-300">No trailer available</p>
                </div>
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="mt-8 bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Movie Poster */}
              {movie.poster_path && (
                <div className="flex justify-center md:justify-start">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg shadow-lg max-w-xs w-full"
                  />
                </div>
              )}

              {/* Movie Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-red-400">Overview</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {movie.overview || "No overview available."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {movie.release_date && (
                    <div>
                      <h4 className="font-semibold text-red-400">Release Date</h4>
                      <p className="text-gray-300">{movie.release_date}</p>
                    </div>
                  )}

                  {movie.vote_average && (
                    <div>
                      <h4 className="font-semibold text-red-400">Rating</h4>
                      <p className="text-gray-300">
                        ⭐ {movie.vote_average.toFixed(1)}/10
                      </p>
                    </div>
                  )}

                  {movie.runtime && (
                    <div>
                      <h4 className="font-semibold text-red-400">Runtime</h4>
                      <p className="text-gray-300">{movie.runtime} minutes</p>
                    </div>
                  )}

                  {movie.genres && movie.genres.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-red-400">Genres</h4>
                      <p className="text-gray-300">
                        {movie.genres.map(genre => genre.name).join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Watch;