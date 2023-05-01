import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
//import use history to change routes
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);
    const movieClick = () => {
        history.push('/details')
    }
    return (
        <main>
            <h1>MovieList</h1>
            <section onClick={movieClick} className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id}  >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;