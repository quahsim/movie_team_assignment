// createMovieCard.js

const createMovieCard = movie => {
    const { id, title, overview, poster_path, vote_average } = movie;
  
    const movieCard = document.createElement('div');
    const moviePoster = document.createElement('img');
    const titleElement = document.createElement('h1');
    const voteAvgElement = document.createElement('p');
    const overviewElement = document.createElement('p');
    movieCard.setAttribute('id', id);
  
    // Class name
    movieCard.className = 'movie-card';
    moviePoster.className = 'movie-poster';
    titleElement.className = 'title';
    voteAvgElement.className = 'vote-average';
    overviewElement.className = 'overview';
  
    // Get movie information
    moviePoster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    titleElement.textContent = title;
    voteAvgElement.textContent = `<Vote Average: ${parseFloat(vote_average).toFixed(2)}>`;
    overviewElement.textContent = overview;
  
    movieCard.appendChild(moviePoster);
    movieCard.appendChild(titleElement);
    movieCard.appendChild(voteAvgElement);
    movieCard.appendChild(overviewElement);
  
    return movieCard;
  };
  
  export default createMovieCard;
  