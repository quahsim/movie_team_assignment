//TMDB API Key
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjEwZDY1MTg3MGQwNTIxYWQ5ZGNiZTExYjU3NzU3MiIsInN1YiI6IjY2MjljYjliNDNjZDU0MDEyMTg0NDkyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktYaXCNxyt3gBJOwc-VM1xHMJmE760miOgotjGWRju0'
  }
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => renderMovies(response.results))
  .catch(err => console.error(err));

const moviesContainer = document.getElementById('movie_container');

//Create movie card
const createMovieCard = movie => {
  const { id, title, overview, poster_path, vote_average } = movie;

  const movieCard = document.createElement('div');
  const moviePoster = document.createElement('img');
  const titleElement = document.createElement('h1');
  const voteAvgElement = document.createElement('p');
  const overviewElement = document.createElement('p');
  movieCard.setAttribute('id', id);


  //Class name
  movieCard.className = 'movie-card';
  moviePoster.className = 'movie-poster';
  titleElement.className = 'title';
  voteAvgElement.className = 'vote-average';
  overviewElement.className = 'overview';


  //Get movie information
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

//ID Alert when click on Movie Card
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

  // Search and render movies based on the search term
  const searchMovies = async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return;

    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
      const data = await response.json();
      const filteredMovies = data.results.filter(movie => movie.title.toLowerCase().includes(searchTerm));
      renderMovies(filteredMovies);

      searchInput.value = '';
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  // Refresh after clicking on the header-image
  const title = document.querySelector('.header-image');
  title.addEventListener('click', () => {
    location.reload();
  });

  //search button function
  const searchBtn = document.getElementById('search-button');
  searchBtn.addEventListener('click', searchMovies);

  //search input function
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      searchMovies();
    }
  });
};
