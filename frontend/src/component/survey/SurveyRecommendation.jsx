import React from "react";
import { useLocation } from "react-router-dom";
import Movie from "../Movie.jsx";

function SurveyRecommendation() {
  const location = useLocation();
  const { recommendations } = location.state || { recommendations: [] };
  

  // Print the recommendations for debugging
  console.log("Recommendations data:", recommendations);

  return (
    <section className="top-movie same">
      <div className="header">
        <small>Survey Results</small>
        <h4>Here are the recommendations based on the questions you answered</h4>
      </div>
      <div className="top-movie-main">
        <div className="movie-card want-to-watch">
          <ul className="wrapper want-to-watch-wrapper">
            {recommendations.length > 0 ? (
              recommendations.map((movie, index) => (
                <Movie key={movie.movieid || index} movie={movie} />
              ))
            ) : (
              <li>No movie recommendations available.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default SurveyRecommendation;
