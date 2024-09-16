import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../../css/Want_To_Watch.css"; // Ensure this path is correct

function Want_To_Watch() {
  const api_url = "http://localhost:5000/movies";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);
console.log(movies);
  useEffect(() => {
    console.log(movies);
  }, [movies]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(movies);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
	  const updatedMovies = items.map((movie, index) => ({
      ...movie,
      order: index + 1,
    }));

    setMovies(updatedMovies);
updatedMovies.forEach((movie) => {
  fetch(`${api_url}/${movie.id}`, {
    method: "PATCH", // Use PATCH to update the order
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ order: movie.order }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Order updated for movie:", data);
    })
    .catch((error) => {
      console.error("Error updating order:", error);
    });
});
  }

  return (
    <section className="top-movie same">
      <div className="header">
        <small>online streaming</small>
        <h4>Want To Watch</h4>
      </div>
      <div className="top-movie-main">
        <div className="movie-card want-to-watch">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="wrapper">
              {(provided) => (
                <ul
                  className="wrapper want-to-watch-wrapper"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {movies.map((movie, index) => (
                    <Draggable
                      key={movie.movieid}
                      draggableId={movie.movieid.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className="card want-to-watch-card"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="img">
                            <Link to={`/${movie.movieid}`}>
                              <img
                                src={movie.img}
                                alt={movie.title}
                              />
                            </Link>
                          </div>
                          <div className="title">
                            <Link to={`/${movie.movieid}`}>
                              <h4>{movie.title}</h4>
                            </Link>
                            <span>{movie.year}</span>
                          </div>
                          <div className="order-number">{index + 1}</div>
                          <div className="footer">
                            <span>{movie.popularity}</span>
                            <div className="time-rating">
                              <span>
                                <i className="fa-regular fa-clock" />{" "}
                                {movie.language}
                              </span>
                              <span>
                                <i className="fa-solid fa-star" /> {movie.rate}
                              </span>
                            </div>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </section>
  );
}

export default Want_To_Watch;
