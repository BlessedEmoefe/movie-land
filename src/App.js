import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";
import SearchIcon from "./assets/svg/search.svg";

function App() {
    const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const API_URL = "http://www.omdbapi.com?apikey=53766df6";


  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search)

    console.log("Movies", data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
    return;
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>

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

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie,idx) => (
            <MovieCard key={idx} movie={movie} />
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

export default App;



