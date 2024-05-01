// main.js

const fetch = require('node-fetch');


import fetchMovies from './fetchMovies.js';
import createMovieCard from './createMovieCard.js';
import searchMovies from './searchMovies.js';

const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjEwZDY1MTg3MGQwNTIxYWQ5ZGNiZTExYjU3NzU3MiIsInN1YiI6IjY2MjljYjliNDNjZDU0MDEyMTg0NDkyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktYaXCNxyt3gBJOwc-VM1xHMJmE760miOgotjGWRju0';
const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    // Authorization: `Bearer ${apiKey}`
    Authorization: apiKey
  }
};

const moviesContainer = document.getElementById('movie_container');

const renderMovies = movies => {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    moviesContainer.appendChild(movieCard);

    movieCard.addEventListener('click', () => {
      const movieID = movieCard.getAttribute('id');
      alert(`영화의 ID는 ${movieID}`);
    })
  });
};

// Refresh after clicking on the header-image
const title = document.querySelector('.header-image');
title.addEventListener('click', () => {
  location.reload();
});

// search button function
const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', () => {
  const searchTerm = document.getElementById('search-input').value.trim();
  searchMovies(url, options, searchTerm, renderMovies);
});

// search input function
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', event => {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value.trim();
    searchMovies(url, options, searchTerm, renderMovies);
  }
});

// Initial load
fetchMovies(url, options)
  .then(renderMovies)
  .catch(err => console.error(err));