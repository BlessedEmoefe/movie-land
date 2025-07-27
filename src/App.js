import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import MovieCard from "./components/MovieCard";
import Loader from "./components/Loader";
import SearchIcon from "./assets/svg/search.svg";
import MovieDetails from "./components/MovieDetails";

function Home({ searchTerm, setSearchTerm, movies, loading, error, searchMovies, onCardClick }) {
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <h2 className="subheader">Discover movies, search by title, and explore details from the OMDB database. Find your next favorite film!</h2>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="empty">
          <h2>{error}</h2>
        </div>
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, idx) => (
            <MovieCard key={idx} movie={movie} onCardClick={onCardClick}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_URL = "http://www.omdbapi.com?apikey=53766df6";
  const navigate = useNavigate();

  React.useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        searchMovies(searchTerm);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const searchMovies = async (title) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setMovies([]);
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    searchMovies("Spiderman");
    // eslint-disable-next-line
  }, []);

  // Pass navigation to MovieCard
  const handleCardClick = (imdbID) => {
    navigate(`/movie/${imdbID}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            movies={movies}
            loading={loading}
            error={error}
            searchMovies={searchMovies}
            onCardClick={handleCardClick}
          />
        }
      />
      <Route path="/movie/:imdbID" element={<MovieDetails />} />
    </Routes>
  );
}

export default function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}



