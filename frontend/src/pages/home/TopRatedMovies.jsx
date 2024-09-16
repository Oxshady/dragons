import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function TopRatedMovies() {
  const [category, setCategory] = useState('movies');

  // Movie data array
  const movieData = {
    movies: [
      {
        id: 1,
        title: 'Sonic',
        year: '2022',
        image: 'images/movie-1.png',
        quality: '2K',
        duration: '122 min',
        rating: '7.8',
      },
      {
        id: 2,
        title: 'Morbius',
        year: '2022',
        image: 'images/movie-2.png',
        quality: 'HD',
        duration: '104 min',
        rating: '5.9',
      },
      {
        id: 3,
        title: 'Adam Project',
        year: '2022',
        image: 'images/movie-3.png',
        quality: '4K',
        duration: '106 min',
        rating: '7.0',
      },
      {
        id: 4,
        title: 'Free Guy',
        year: '2022',
        image: 'images/movie-4.png',
        quality: '4K',
        duration: '115 min',
        rating: '7.7',
      },
      {
        id: 5,
        title: 'Batman',
        year: '2022',
        image: 'images/movie-5.png',
        quality: '4K',
        duration: '176 min',
        rating: '7.9',
      },
      {
        id: 6,
        title: 'Uncharted',
        year: '2022',
        image: 'images/movie-6.png',
        quality: 'HD',
        duration: '116 min',
        rating: '7.0',
      },
      {
        id: 7,
        title: 'Death On The Nile',
        year: '2022',
        image: 'images/movie-7.png',
        quality: '2K',
        duration: '127 min',
        rating: '6.5',
      },
      {
        id: 8,
        title: 'Kings Man',
        year: '2022',
        image: 'images/movie-8.png',
        quality: 'HD',
        duration: '131 min',
        rating: '7.0',
      },
    ],
    tvShows: [
      // Add TV show data if needed
    ],
    documentaries: [
      // Add documentaries data if needed
    ],
    sports: [
      // Add sports data if needed
    ],
  };

  const movies = movieData[category];

  return (
    <section className="top-movie same">
      <div className="header">
        <small>online streaming</small>
        <h4>Top Rated {category === 'movies' ? 'Movies' : category}</h4>
      </div>
      <div className="top-movie-main">
        <div className="buttons">
          <button onClick={() => setCategory('movies')}>Movies</button>
          <button onClick={() => setCategory('tvShows')}>TV Shows</button>
          <button onClick={() => setCategory('documentaries')}>Documentary</button>
          <button onClick={() => setCategory('sports')}>Sports</button>
        </div>

        <div className="movie-card">
          <ul className="wrapper">
            {movies.map((movie) => (
              <li className="card" key={movie.id}>
                <div className="img">
                <Link to={`/${movie.id}`}>
                  <img src={`images/movie-${movie.id}.png`} alt={movie.title} />
                </Link>
                </div>
                <div className="title">
                <Link to={`/${movie.id}`}>
                  <h4>{movie.title}</h4>
                </Link>
                  <span>{movie.year}</span>
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

export default TopRatedMovies;
