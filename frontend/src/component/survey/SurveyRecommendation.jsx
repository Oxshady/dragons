import React, { useEffect, useState } from "react";
import Movie from"../Movie.jsx"
function SurveyRecommendation() {
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
        <small>survey resutls</small>
        <h4>Here is the Recommendatoins based on the questions u answerd</h4>
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
export default SurveyRecommendation;
