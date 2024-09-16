import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UpcomingMovies() {
  const [category, setCategory] = useState('movies');

  // Array of movies (replace with actual data)
  const moviesData = {
    movies: [
      {
        id: 1,
        title: 'Memory',
        releaseYear: '2022',
        image: 'images/upcoming-3.png',
        quality: '2K',
        duration: 'N/A',
        rating: '8.5',
      },
      {
        id: 2,
        title: 'Unbearable Weight',
        releaseYear: '2022',
        image: 'images/upcoming-4.png',
        quality: 'HD',
        duration: '107 min',
        rating: '8.5',
      },
      {
        id: 3,
        title: 'The Northman',
        releaseYear: '2022',
        image: 'images/upcoming-1.png',
        quality: 'HD',
        duration: '137 min',
        rating: '8.5',
      },
      {
        id: 4,
        title: 'Doctor Strange',
        releaseYear: '2022',
        image: 'images/upcoming-2.png',
        quality: '4K',
        duration: '126 min',
        rating: '8.5',
      },
    ],
    tvShows: [
      {
        id: 1,
        title: 'Breaking Bad',
        releaseYear: '2008',
        image: 'images/breaking-bad.png',
        quality: 'HD',
        duration: '45 min per episode',
        rating: '9.5',
      },
      // More TV shows...
    ],
    anime: [
      {
        id: 1,
        title: 'Attack on Titan',
        releaseYear: '2013',
        image: 'images/attack-on-titan.png',
        quality: 'HD',
        duration: '24 min per episode',
        rating: '9.0',
      },
      // More anime...
    ],
  };

  const movies = moviesData[category]; // Selects movies, tvShows, or anime based on category

  return (
    <section className="upcoming-movie">
      <div className="header">
        <div className="subtitle">
          <small>Online Streaming</small>
          <h4>Upcoming {category === 'movies' ? 'Movies' : category === 'tvShows' ? 'TV Shows' : 'Anime'}</h4>
        </div>
        <div className="buttons">
          <button onClick={() => setCategory('movies')}>Movies</button>
          <button onClick={() => setCategory('tvShows')}>TV Shows</button>
          <button onClick={() => setCategory('anime')}>Anime</button>
        </div>
      </div>

      <div className="movie-card">
        <div className="wrapper">
          <ul className="movie-carousel">
            {movies.map((movie) => (
              <li className="card" key={movie.id}>
                <div className="img">
                  <Link to={`/${movie.id}`}>
                    <img src={movie.image} alt={movie.title} />
                  </Link>
                </div>
                <div className="title">
                 
                  <span>{movie.releaseYear}</span>
                </div>
                <div className="footer">
                  <span>{movie.quality}</span>
                  <div className="time-rating">
                    <span>
                      <i className="fa-regular fa-clock" /> {movie.duration}
                    </span>
                    <span>
                      <i className="fa-solid fa-star" /> {movie.rating}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default UpcomingMovies;
