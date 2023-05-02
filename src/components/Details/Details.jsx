import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import React, { useEffect } from "react";

function Details() {
  const selectedMovie = useSelector((store) => store.selectedMovie);
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((store) => store.genres);

  const backHome = () => {
    dispatch({ type: "CLEAR_SELECTED_MOVIE" });
    dispatch({ type: "CLEAR_GENRE" });
    history.push("/");
  };

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES", payload: selectedMovie.id });
  }, []);

  
  //
  return (
    <div>
    <header>
    <h1>{selectedMovie.title}</h1>
    <img src={selectedMovie.poster} />
  </header>

  <section>
    <h2>Description</h2>
    <p>{selectedMovie.description}</p>

    <h2>Genre</h2>
    <ul>
      {genres.map((genre) => (
        <li key={genre.id}>{genre.name}</li>
      ))}
    </ul>
  </section>

  <footer>
    <button onClick={backHome}>Back to Home</button>
  </footer>
  </div>
  );
}

export default Details;
