const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  console.log(movieId)
  const query = `
    SELECT "genres".id, "genres".name
    FROM "movies_genres"
    JOIN "genres" ON "genres".id = "movies_genres".genre_id
    WHERE "movies_genres".movie_id = $1;
  `;
  pool.query(query, [movieId])
    .then(result => {
      res.send(result.rows);
      console.log(result.rows)
    })
    .catch(error => {
      console.error('Error getting genres for movie', error);
      res.sendStatus(500);
    });
});

module.exports = router;