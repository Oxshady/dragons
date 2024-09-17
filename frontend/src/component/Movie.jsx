import { Link } from "react-router-dom";
  // For prop type validation

function Move(props) {
    const { movie } = props;

    // Default movie object for when data is not yet loaded
    const defaultMovie = {
        movieid: "default-id",
        img: "default-image.jpg",
        title: "Loading...",
        year: "Unknown",
        popularity: "Unknown",
        language: "Unknown",
        rate: "N/A",
    };

    // Use defaultMovie if movie is not provided
    const currentMovie = movie || defaultMovie;

    return (
      <li key={currentMovie.movieid} className="card want-to-watch-card">
        <div className="img">
          <Link to={`/${currentMovie.movieid}`}>
            <img src={currentMovie.img} alt={currentMovie.title} />
          </Link>
        </div>
        <div className="title">
          <Link to={`/${currentMovie.movieid}`}>
            <h4>{currentMovie.title}</h4>
          </Link>
          <span>{currentMovie.year}</span>
        </div>
        <div className="footer">
          <span>{currentMovie.popularity}</span>
          <div className="time-rating">
            <span>
              <i className="fa-regular fa-clock" /> {currentMovie.language}
            </span>
            <span>
              <i className="fa-solid fa-star" /> {currentMovie.rate}
            </span>
          </div>
        </div>
      </li>
    );
}

 
 
export default Move;
