import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "./Loader";

const API_URL = "http://www.omdbapi.com?apikey=53766df6";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}&i=${imdbID}`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [imdbID]);

  if (loading) return <Loader />;
  if (error) return <div className="empty"><h2>{error}</h2></div>;
  if (!movie) return null;

  return (
    <div className="movie-details">
      <button className="back-btn" onClick={() => navigate(-1)}>&larr; Back</button>
      <div className="details-container">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/600x900?text=No+Image"}
          alt={movie.Title}
        />
        <div className="details-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 