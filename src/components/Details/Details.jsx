import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

function Details() {
  const selectedMovie = useSelector((store) => store.selectedMovie);
  const dispatch = useDispatch();
  const history = useHistory();
  //once fetch genre is done it will set the genres in store
  //the genres of the selected movie will display
  const genres = useSelector((store) => store.genres);

  //this funciton dispatches to clear out selected movie and genres and returns back home to select a new one
  const backHome = () => {
    dispatch({ type: "CLEAR_SELECTED_MOVIE" });
    dispatch({ type: "CLEAR_GENRE" });
    history.push("/");
  };
  // this fetches sends to the the store which triggers the generator function* fetchGenres
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES", payload: selectedMovie.id });
  }, []);

  
  //
  return (
    <div>
    <Paper elevation={5} style={{ padding: '1rem' }}>
      <Avatar src={selectedMovie.poster} style={{ width: '10rem', height: '10rem', marginBottom: '1rem' }} />
      <Typography variant="h4" >{selectedMovie.title}</Typography>
      <Typography variant="body1">{selectedMovie.description}</Typography>
     
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {genres.map((genre) => (
          <Chip key={genre.id} label={genre.name} style={{ margin: '0.25rem' }} />
        ))}
      </div>
      <Button onClick={backHome}><ArrowBackIcon /></Button>
    </Paper>
  </div>
);
}








export default Details;
