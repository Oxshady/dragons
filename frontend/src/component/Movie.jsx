import { Link } from "react-router-dom";
function Move(props){
    const { movie } = props;
    console.log(props);
    console.log(props.movie);
    return (
      <li key={movie.movieid} className="card want-to-watch-card">
        <div className="img">
          <Link to={`/${movie.movieid}`}>
            <img src={movie.img} alt={movie.title} />
          </Link>
        </div>
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
    );
}
export default Move;
