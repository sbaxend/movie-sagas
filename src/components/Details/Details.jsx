import { useDispatch, useSelector } from 'react-redux';
function Details() {
    const selectedMovie = useSelector(store => store.selectedMovie)
    return (
        <>
        <h3>Movie Details:</h3>
      
        <h1>{selectedMovie.title}</h1>
        <img src={selectedMovie.poster}/>
        <h2>{selectedMovie.description}</h2>
        </>
    )
}

export default Details