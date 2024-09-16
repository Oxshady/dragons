import React from 'react'

function Hero() {
  return (
     <>
        <section className="hero">
        <div className="main">
          <div className="content">
            <p>FilmLane</p>
            <h1>
              Unlimited <strong>Movie</strong>, TVs Shows, &amp; More.
            </h1>
            <div className="meta-wrapper">
              <div className="badge">
                <span>PG 18</span>
                <span>HD</span>
              </div>
              <div className="genre">
                <span>
                  <a href="">Romance,</a> <a href="">Drama</a>
                </span>
              </div>
              <div className="date-time">
                <span>
                  <i className="fa-solid fa-calendar-days" /> 2022
                </span>
                <span>
                  <i className="fa-regular fa-clock" /> 128 min
                </span>
              </div>
            </div>
            <div className="watch-btn">
              <button>
                <i className="fa-solid fa-play" /> Watch Now
              </button>
            </div>
          </div>
        </div>
      </section>
     </>
  )
}

export default Hero