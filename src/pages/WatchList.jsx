import Navbar from "../component/Navbar";
import { useWatchlist } from "../context/WatchlistContext";
import { Link } from "react-router-dom";

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-6">🎬</div>
            <h2 className="text-3xl font-bold mb-4">Your Watchlist is Empty</h2>
            <p className="text-gray-400 mb-8">Add some movies to get started!</p>
            <Link 
              to="/"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Watchlist</h1>
          <p className="text-gray-400">
            {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} in your watchlist
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              {/* Movie Poster */}
              <Link to={`/movie/${movie.id}`}>
                <div className="aspect-[2/3] relative overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450/374151/9CA3AF?text=No+Image';
                    }}
                  />
                </div>
              </Link>

              {/* Movie Info */}
              <div className="p-4">
                <Link to={`/movie/${movie.id}`}>
                  <h3 className="font-semibold text-white mb-2 hover:text-red-400 transition-colors line-clamp-2">
                    {movie.title}
                  </h3>
                </Link>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-400">
                    {movie.release_date && (
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    )}
                  </div>
                  {movie.vote_average && (
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-gray-300">{movie.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Remove from Watchlist
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 text-center">
          <div className="bg-gray-800 rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="text-xl font-semibold mb-3">Looking for more movies?</h3>
            <p className="text-gray-400 mb-4">
              Discover new films and add them to your watchlist.
            </p>
            <Link 
              to="/"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watchlist;