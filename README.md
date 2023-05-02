# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

This application displays movies on load which where you can select individually to get more information.
Once user selects a movie, the user is then taken to a second page ('/details), which user will then see the movie description,
title, and genres of their movie. Once user is done, they can click the back button and select a new movie.

I had to start by making a funciton in the movie list component that helps with making each movie poster clickable. the function also 
send user to the page

Then, i made a generator function to fetch the genres of the selected movie. the function sends a get request which i set up 
in the genre.router.js. 

the get reqeust gets the the movies genre id and genre name. Based on which movie is selected the id is pass through to this route uses it in the SQL text. the sql text is pooled and sends back the data.

the data is then set in the the genre reducer.

genre and selectedMovie are both cleared out by a function in the details component so the user can then choose another movie without having multiple movies in the reducers.

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
