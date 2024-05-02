//TMDB API키
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjEwZDY1MTg3MGQwNTIxYWQ5ZGNiZTExYjU3NzU3MiIsInN1YiI6IjY2MjljYjliNDNjZDU0MDEyMTg0NDkyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktYaXCNxyt3gBJOwc-VM1xHMJmE760miOgotjGWRju0'
  }
};

//TMDB API에서 제일 인기있는 영화들을 fetch
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => renderMovies(response.results))
  .catch(err => console.error(err));

//영화 카드들을 담을 수 있는 container element
const moviesContainer = document.getElementById('movie_container');

//영화카드 생성 기능
const createMovieCard = movie => {
  const { id, title, overview, poster_path, vote_average } = movie;

  //영화카드의 elements 지정
  const movieCard = document.createElement('div');
  const moviePoster = document.createElement('img');
  const titleElement = document.createElement('h1');
  const voteAvgElement = document.createElement('p');
  const overviewElement = document.createElement('p');
  movieCard.setAttribute('id', id);


  //클라스 지정
  movieCard.className = 'movie-card';
  moviePoster.className = 'movie-poster';
  titleElement.className = 'title';
  voteAvgElement.className = 'vote-average';
  overviewElement.className = 'overview';

  //위 영화정보를 영화카드로 연동
  moviePoster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  titleElement.textContent = title;
  voteAvgElement.textContent = `<Vote Average: ${parseFloat(vote_average).toFixed(2)}>`;
  overviewElement.textContent = overview;

  //moviesContainer에 하기 정보들을 추가 (append = 추가)
  movieCard.appendChild(moviePoster);
  movieCard.appendChild(titleElement);
  movieCard.appendChild(voteAvgElement);
  movieCard.appendChild(overviewElement);


  return movieCard;
};

//웹페이지에 영화카드를 보여주는 함수
const renderMovies = movies => {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    moviesContainer.appendChild(movieCard);

    //영화카드 클릭시 영화ID 알림창 
    movieCard.addEventListener('click', () => {
      const movieID = movieCard.getAttribute('id');
      alert(`영화의 ID는 ${movieID}`);
    })
  });

  //영화 검색 기능
  const searchMovies = async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    // ! = NOT
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

  // header-image 클릭시 페이지 새로고침
  const title = document.querySelector('.header-image');
  title.addEventListener('click', () => {
    location.reload();
  });

  //검색 버튼 기능
  const searchBtn = document.getElementById('search-button');
  searchBtn.addEventListener('click', searchMovies);

  //검색어 입력 & 검색 후 'Enter'키 누르면 검색 기능 실행
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      searchMovies();
    }
  });
};
