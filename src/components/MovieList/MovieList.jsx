import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
//import use history to change routes
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

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
                <Grid container spacing={3}>
                {movies.map(movie => {
                    return (
                        <Grid item xs={4} key={movie.id}>
                        <Card sx={{ height: 375, bgcolor: "#f5f5f5", backgroundColor: 'common.white',
                        '&:hover': { opacity: [0.9, 0.8, 0.7]},}} onClick={() => movieClick(movie)} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                        </Card>
                        </Grid>
                    );
                })}
                </Grid>
            </section>
        </main>

    );
}

export default MovieList;