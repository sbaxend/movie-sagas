import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Details() {
    const selectedMovie = useSelector(store => store.selectedMovie)
    const dispatch = useDispatch();
    const history = useHistory();
    const backHome = () => {
        dispatch({ type: 'CLEAR_SELECTED_MOVIE' });
        history.push('/')
    }
    return (
        <>
        <h3>Movie Details:</h3>
      
        <h1>{selectedMovie.title}</h1>
        <img src={selectedMovie.poster}/>
        <h2>{selectedMovie.description}</h2>
        <button onClick={backHome}>Back to Home</button>
        </>
    )
}

export default Details