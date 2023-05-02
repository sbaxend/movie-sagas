import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    // yield takeEvery('FETCH_SELECTED_MOVIE', fetchSelectedMovieGenre);

    // this waits for a dispatch of FETCH_GENRES and triggers the fetchGenres funciton
    yield takeEvery('FETCH_GENRES', fetchGenres);

}


function* fetchGenres(action) {
    try {
        //had to set the action.payload to a variable to send to the router
        const movieId = action.payload;
        //checking if it was sending correctly
        console.log(movieId)
        // set a variable that triggers the axio.get request of genres which uses the id of the aciton payload
        const response = yield axios.get(`/api/genre/${movieId}`);
        console.log(response.data)
        //once data is recieved then it dispatches data to store in genres reducer
        yield put({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
        console.log('Error fetching genres:', error);
    }
};

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }

}


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return [...action.payload]
        case 'CLEAR_GENRE':
            return []
        default:
            return state;
    }
}

const selectedMovie = (state = {}, action) => {
    if (action.type === 'SET_SELECTED_MOVIE') {
        return action.payload;
    } else if (action.type === 'CLEAR_SELECTED_MOVIE') {
        return {}
    }
    return state
}
// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
