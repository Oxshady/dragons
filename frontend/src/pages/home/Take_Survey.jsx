import React from "react";
import { Link } from "react-router-dom";
import "./Take_Survey.css";
function Take_Survey() {
  return (
    <>
      <section className="hero take_survay">
        <div className="main">
          <div className="content">
            <p>FilmLane</p>
            <h1>
              Take A <strong>Survey</strong>And see movies to your liking.
            </h1>
            <div className="watch-btn">
              <Link to="/survay">
                <button>
                  <i className="fa-solid fa-play" />
                  Take a survey
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Take_Survey;
