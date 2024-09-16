import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Recommendation = (props) => {
  const api_url = "http://localhost:5000/movies?movieid=";
  const {movieId} = props;
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    fetch(`${api_url}${movieId}`).then((res) => res.json()).then((data) => setRecommendations(data));
  },[]);
  return (
    <section className="tv-series same">
      <div className="header">
        <small>Similar Movies</small>
        <h4>you can also Watch</h4>
      </div>
      <div className="series-card">
        <ul className="wrapper">
          {recommendations.map((movie) => (
            <li key={movie.movieid} className="card">
              <div className="img">
                <Link to={`/${movie.id}`}>
                  <img src={movie.img} alt={movie.title} />
                </Link>
              </div>
              <div className="title">
                <a href="">
                  <h4>{movie.title}</h4>
                </a>
                <span>{movie.year}</span>
              </div>
              <div className="footer">
                <span>{movie.popularity}</span>
                <div className="time-rating">
                  <span>
                    <i className="fa-regular fa-clock" /> {movie.language}
                  </span>
                  <span>
                    <i className="fa-solid fa-star" /> {movie.rate}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Recommendation;
