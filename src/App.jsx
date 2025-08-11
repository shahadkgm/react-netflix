// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login';
import MovieDetail from './pages/MovieDetail';
import Watch from './pages/Watch';
import Watchlist from './pages/WatchList';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicOnlyRoute from './routes/PublicOnly';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicOnlyRoute><LandingPage /></PublicOnlyRoute> } />

      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute>
            <MovieDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/watch/:id"
        element={
          <ProtectedRoute>
            <Watch />
          </ProtectedRoute>
        }
      />

      <Route
        path="/watchlist"
        element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;