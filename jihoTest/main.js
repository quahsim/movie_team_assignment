// main.js

import { fetchTopRatedMovies, options } from './api.js';
import { createMovieCard } from './movieCard.js';
document.addEventListener('DOMContentLoaded', async function () {
  const moviesContainer = document.getElementById('movie_container');
  try {
    const movies = await fetchTopRatedMovies();
    renderMovies(movies);
  } catch (error) {
    console.error('Error loading top rated movies:', error);
  }

  function renderMovies(movies) {
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      moviesContainer.appendChild(movieCard);

      movieCard.addEventListener('click', () => {
        const movieID = movieCard.getAttribute('id');
        alert(`영화의 ID는 ${movieID}`);
      });
    });
  }

  // 추가적인 기능 구현
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

  //영화 검색 기능
  //검색 버튼 기능
  const searchBtn = document.getElementById('search-button');
  searchBtn.addEventListener('click', searchMovies);

  // header-image 클릭시 페이지 새로고침
  const title = document.querySelector('.header-image');
  title.addEventListener('click', () => {
    location.reload();
  });

  //검색어 입력 & 검색 후 'Enter'키 누르면 검색 기능 실행
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      searchMovies();
    }
  });
});
