import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovieById } from "../services/tmdb";
import { useWatchlist } from "../context/WatchlistContext";
import Navbar from "../component/Navbar";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
//   const { addToWatchlist } = useWatchlist();

  useEffect(() => {
    async function loadMovie() {
      try {
        setIsLoading(true);
        const data = await fetchMovieById(id);
        setMovie(data);
      } catch (error) {
        console.error('Error loading movie:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadMovie();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-white text-2xl">Movie not found</div>
        </div>
      </div>
    );
  }

  const formatReleaseDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section with Backdrop */}
      <div className="relative">
        {/* Backdrop Image */}
        {movie.backdrop_path && (
          <div className="relative h-96 lg:h-screen">
            <img
              src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
          </div>
        )}
        
        {/* Movie Content Overlay */}
        <div className="absolute inset-0 flex items-end lg:items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Movie Poster */}
              <div className="lg:col-span-1">
                <div className="w-full max-w-sm mx-auto lg:mx-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full rounded-lg shadow-2xl"
                  />
                </div>
              </div>

              {/* Movie Details */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4">{movie.title}</h1>
                  
                  {/* Movie Info */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm lg:text-base">
                    <span className="bg-red-600 px-3 py-1 rounded-full font-semibold">
                      {movie.vote_average.toFixed(1)} ⭐
                    </span>
                    {movie.release_date && (
                      <span className="text-gray-300">{formatReleaseDate(movie.release_date)}</span>
                    )}
                    {movie.runtime && (
                      <span className="text-gray-300">{formatRuntime(movie.runtime)}</span>
                    )}
                    {movie.adult && (
                      <span className="border border-gray-400 px-2 py-1 text-xs">18+</span>
                    )}
                  </div>

                  {/* Genres */}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {movie.genres.map((genre) => (
                        <span 
                          key={genre.id} 
                          className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Overview */}
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
                    {movie.overview}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      to={`/watch/${movie.id}`}
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 5.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5v-2zM12 5.5a.5.5 0 01.5-.5h.5a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-.5a.5.5 0 01-.5-.5v-2zM4.5 12a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-1z" />
                      </svg>
                      Watch Now
                    </Link>
                    
                    {/* <button 
                      onClick={() => addToWatchlist(movie)}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add to Watchlist
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Movie Details */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Movie Details</h2>
            <div className="space-y-4">
              {movie.budget && (
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Budget:</span>
                  <span>${movie.budget.toLocaleString()}</span>
                </div>
              )}
              {movie.revenue && (
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Revenue:</span>
                  <span>${movie.revenue.toLocaleString()}</span>
                </div>
              )}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Production:</span>
                  <span className="text-right">{movie.production_companies[0].name}</span>
                </div>
              )}
              {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Languages:</span>
                  <span className="text-right">
                    {movie.spoken_languages.map(lang => lang.english_name).join(', ')}
                  </span>
                </div>
              )}
              {movie.status && (
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Status:</span>
                  <span>{movie.status}</span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Rating & Reviews</h3>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {movie.vote_average.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-400">IMDb Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {movie.vote_count.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Total Votes</div>
                  </div>
                </div>
              </div>

              {movie.homepage && (
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="font-semibold mb-3">Official Links</h3>
                  <a 
                    href={movie.homepage} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 transition-colors duration-200"
                  >
                    Visit Official Website →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;