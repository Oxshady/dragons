import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recommendation from './Recommendation';

function Details() {
  const { movieId } = useParams(); // Get the movieId from the URL
  const [movi, setMovi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   // Fetch the movie details using the movieId
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/movies?movieid=${movieId}`
        );
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        setMovi(data); // Set the movie data in state
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);
  console.log(movi);
console.log(movi);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
const movie = movi[0];
console.log(movie);
  return (
    <>
      {movie && (
        <section className="movie-detail">
          <div className="main">
            <div className="img">
              <a href="">
                <img src={movie.img} alt={movie.title} />
              </a>
              <i className="fa-regular fa-circle-play" />
            </div>
            <div className="content">
              <strong>{movie.adult}</strong>
              <h4>
                {movie.title} <span>{movie.language}</span>
              </h4>
              <div className="badge-genre">
                <div className="badge">
                  <span>{movie.rate}</span>
                  <span>HD</span>
                </div>
                <div className="genre">{movie.vote_count}</div>
              </div>
              <div className="date-time">
                <span>
                  <i className="fa-solid fa-calendar-days" /> {movie.year}
                </span>
                <span>
                  <i className="fa-regular fa-clock" /> {movie.popularity} min
                </span>
              </div>
              <p>{movie.description}</p>
              <div className="detail-actions">
                <button>
                  <i className="bi bi-share-fill" />
                  <span>Share</span>
                </button>
                <div className="prime">
                  <h5>{movie.movieid}</h5>
                  <small>Streaming Channels</small>
                </div>
                <div className="btn">
                  <button>
                    <i className="fa-solid fa-play" /> Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="download-btn">
            <a href={movie.img} download={movie.title}>
              Download <i className="fa-solid fa-download" />
            </a>
          </div>
        </section>
      )}

      <Recommendation movieId={movieId} />
    </>
  );
}

export default Details;
/*
 {movie.genres.map((genre, index) => (
                    <a key={index} href="">
                      {genre}
                    </a>
                  ))}
*/
