import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Recommendation from './Recommendation';

function Details() {
  const { movieId } = useParams(); // Get the movieId from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
    // Fetch the movie details using the movieId
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await fetch(`/api/movies/${movieId}`);
//         if (!response.ok) throw new Error('Failed to fetch movie details');
//         const data = await response.json();
//         setMovie(data); // Set the movie data in state
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchMovieDetails();
//   }, [movieId]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

  return (
    <>
      {movie && (
        <section className="movie-detail">
          <div className="main">
            <div className="img">
              <a href="">
                <img src={movie.imageUrl} alt={movie.title} />
              </a>
              <i className="fa-regular fa-circle-play" />
            </div>
            <div className="content">
              <strong>{movie.episodeStatus}</strong>
              <h4>
                {movie.title} <span>{movie.tagline}</span>
              </h4>
              <div className="badge-genre">
                <div className="badge">
                  <span>{movie.rating}</span>
                  <span>HD</span>
                </div>
                <div className="genre">
                  {movie.genres.map((genre, index) => (
                    <a key={index} href="">{genre}</a>
                  ))}
                </div>
              </div>
              <div className="date-time">
                <span>
                  <i className="fa-solid fa-calendar-days" /> {movie.year}
                </span>
                <span>
                  <i className="fa-regular fa-clock" /> {movie.duration} min
                </span>
              </div>
              <p>{movie.description}</p>
              <div className="detail-actions">
                <button>
                  <i className="bi bi-share-fill" />
                  <span>Share</span>
                </button>
                <div className="prime">
                  <h5>{movie.streamingService}</h5>
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
            <a href={movie.imageUrl} download={movie.title}>
              Download <i className="fa-solid fa-download" />
            </a>
          </div>
        </section>
      )}

      <Recommendation />
    </>
  );
}

export default Details;
