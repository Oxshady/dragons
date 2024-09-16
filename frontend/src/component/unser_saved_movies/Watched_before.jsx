import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Movie from "../Movie.jsx"
function Watched_before() {
  const api_url = "http://localhost:5000/movies";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <section className="top-movie same">
      <div className="header">
        <small>online streaming</small>
        <h4>Watched Before</h4>
      </div>
      <div className="top-movie-main">
        <div className="movie-card want-to-watch">
          <ul className="wrapper want-to-watch-wrapper">
            {movies.map((movie, index) => (
              <Movie key={movie.movieid} movie={movie} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
export default Watched_before;
