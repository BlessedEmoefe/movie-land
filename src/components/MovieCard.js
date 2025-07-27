import React from "react";

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type }, onCardClick }) => {
  return (
    <div
      className="movie"
      key={imdbID}
      onClick={() => onCardClick && onCardClick(imdbID)}
      style={{ cursor: onCardClick ? 'pointer' : 'default' }}
    >
      <div>
        <p>{Year}</p>
      </div>
      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://placehold.co/600x900?text=No+Image"}
          alt={Title}
        />
      </div>
      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
