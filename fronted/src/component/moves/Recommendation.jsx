import React from 'react';
import { Link } from 'react-router-dom';

const Recommendation = () => {
  // Array of objects containing the TV series data
  const tvSeries = [
    {
      id: 1,
      title: 'Moon Knight',
      year: 2022,
      imgSrc: 'images/series-1.png',
      views: '2K',
      duration: '47 min',
      rating: 8.6,
    },
    {
      id: 2,
      title: 'Halo',
      year: 2022,
      imgSrc: 'images/series-2.png',
      views: '2K',
      duration: '59 min',
      rating: 8.8,
    },
    {
      id: 3,
      title: 'Viking Valhalla',
      year: 2022,
      imgSrc: 'images/series-3.png',
      views: '2K',
      duration: '51 min',
      rating: 8.3,
    },
    {
      id: 4,
      title: 'Money Heist',
      year: 2017,
      imgSrc: 'images/series-4.png',
      views: '4K',
      duration: '70 min',
      rating: 8.3,
    },
  ];

  return (
    <section className="tv-series same">
      <div className="header">
        <small>Best TV Series</small>
        <h4>World Best TV Series</h4>
      </div>
      <div className="movie-card">
        <ul className="wrapper">
          {tvSeries.map((series) => (
            <li key={series.id} className="card">
              <div className="img">
               
                <Link to={`/${series.id}`}>
                <img src={`/${series.imgSrc}`} alt={series.title} />
                  </Link>
              </div>
              <div className="title">
                <a href="">
                  <h4>{series.title}</h4>
                </a>
                <span>{series.year}</span>
              </div>
              <div className="footer">
                <span>{series.views}</span>
                <div className="time-rating">
                  <span>
                    <i className="fa-regular fa-clock" /> {series.duration}
                  </span>
                  <span>
                    <i className="fa-solid fa-star" /> {series.rating}
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
