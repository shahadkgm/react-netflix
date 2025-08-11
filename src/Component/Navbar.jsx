import React, { useState ,useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { searchMovies } from '../services/tmdb';
import { auth } from "../firebase";


function Navbar() {
//   const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim()) {
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
        setShowSuggestions(true);
      } else {
        setSearchResults([]);
        setShowSuggestions(false);
      }
    }, 400); 

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const LogOut=(e)=>{

    e.preventDefault()
    auth.signOut().then(()=>{
      console.log("user logout")
      navigate("/login")
    })
  }

  return (
    <nav className="bg-black bg-opacity-90 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/home" className="text-red-600 text-2xl font-bold">
              NETFLIX
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/home"
                className="text-white hover:text-red-500 transition-colors duration-200 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="#"
                className="text-white hover:text-red-500 transition-colors duration-200 text-sm font-medium"
              >
                Movies
              </Link>
              <Link
                to="#"
                className="text-white hover:text-red-500 transition-colors duration-200 text-sm font-medium"
              >
                TV Shows
              </Link>
              <Link
                to="/watchlist"
                className="text-white hover:text-red-500 transition-colors duration-200 text-sm font-medium"
              >
                My List
              </Link>
            </div>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <form onSubmit={handleSearch} className="flex items-center">
                <div
                  className={`flex items-center transition-all duration-300 ${
                    isSearchOpen ? "w-64" : "w-8"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-1 text-white hover:text-red-500 transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>

                  {isSearchOpen && (
                    <input
                      type="text"
                      placeholder="Search movies, shows..."
                      className="ml-2 w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => {
                        setTimeout(() => {
                          setShowSuggestions(false);
                          if (!searchQuery) setIsSearchOpen(false);
                        }, 200); // to allow click on modal
                      }}
                      onFocus={() => {
                        if (searchResults.length > 0) setShowSuggestions(true);
                      }}
                      autoFocus
                    />
                  )}
                </div>
              </form>

              {/* 🔽 Suggestion Modal */}
              {showSuggestions && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-72 bg-gray-900 border border-gray-700 rounded shadow-lg z-50 max-h-80 overflow-y-auto">
                  {searchResults.map((movie) => (
                    <Link
                      to={`/movie/${movie.id}`}
                      key={movie.id}
                      className="flex items-center p-2 hover:bg-gray-800"
                      onClick={() => {
                        setSearchQuery("");
                        setShowSuggestions(false);
                        setIsSearchOpen(false);
                      }}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-10 h-14 rounded mr-3 object-cover"
                      />
                      <span className="text-sm text-white">{movie.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="p-1 text-white hover:text-red-500 transition-colors duration-200">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5-5 5-5M10 7l-5 5 5 5H5"
                />
              </svg>
            </button>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 text-white hover:text-red-500 transition-colors duration-200">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-2200"
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button
                    onClick={(e)=>LogOut(e)}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-800 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-white hover:text-red-500 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black bg-opacity-95">
          <Link
            to="/home"
            className="text-white hover:text-red-500 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="text-white hover:text-red-500 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Movies
          </Link>
          <Link
            to="/series"
            className="text-white hover:text-red-500 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            TV Shows
          </Link>
          <Link
            to="/watchlist"
            className="text-white hover:text-red-500 block px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            My List
          </Link>
          <div className="border-t border-gray-700 my-2"></div>
          <button
            onClick={(e)=>LogOut(e)}
            className="text-white hover:text-red-500 block w-full text-left px-3 py-2 text-base font-medium transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;