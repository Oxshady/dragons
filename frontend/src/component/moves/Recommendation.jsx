import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Recommendation = ({ movieId }) => {
  const api_url = "http://localhost:5000/api/v1/movies?movieid=";
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${api_url}${movieId}`);
        if (!response.ok) throw new Error('Failed to fetch recommendations');
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [movieId]);

  return (
    <section className="tv-series same">
      <div className="header">
        <small>Similar Movies</small>
        <h4>You Might Also Like</h4>
      </div>
      <div className="series-card">
        {loading && <p>Loading recommendations...</p>}
        {error && <p>Error: {error}</p>}
        <ul className="wrapper">
          {recommendations.map((movie) => (
            <li key={movie.movieid} className="card">
              <Link to={`/${movie.movieid}`}>
              <div className="img">
                
                  <img src={movie.img} alt={movie.title} className='img-series'/>
                
              </div>
              </Link>
              <div className="title">
                <Link to={`/${movie.movieid}`}>
                  <h4>{movie.title}</h4>
                </Link>
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
