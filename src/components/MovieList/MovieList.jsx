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
    // 
    const movieClick = (movie) => {
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: movie});
        // dispatch({type: 'FETCH_GENRES', payload: movie.id});
        history.push('/details')
    }
    return (
        <main>
            <h1>MovieList</h1>
            <section  className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} onClick={() => movieClick(movie)} >
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