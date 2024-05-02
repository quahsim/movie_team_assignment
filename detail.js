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
const movieDetail = document.getElementById('movie_detail');

//영화카드 생성 기능
const createInfoCard = movie => {
  const { id, title, overview, poster_path, vote_average } = movie;

  //영화카드의 elements 지정
  const movieIR = document.createElement('div');

  const movieInfo = document.createElement('div');
  const moviePoster = document.createElement('img');
  const TVO = document.createElement('div');
  const titleElement = document.createElement('h1');
  const voteAvgElement = document.createElement('p');
  const overviewElement = document.createElement('p');

  // movieCard.setAttribute('id', id);
  movieIR.setAttribute('id', id);


  //클라스 지정
  movieIR.className = 'movie-ir';

  movieInfo.className = 'movie-info';
  moviePoster.className = 'movie-poster';
  TVO.className = 'tvo';
  titleElement.className = 'title';
  voteAvgElement.className = 'vote-average';
  overviewElement.className = 'overview';

  //위 영화정보를 영화카드로 연동
  moviePoster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  titleElement.textContent = title;
  voteAvgElement.textContent = `Vote Average: ${parseFloat(vote_average).toFixed(2)}`;
  overviewElement.textContent = overview;

  //moviesContainer에 하기 정보들을 추가 (append = 추가)
  movieIR.appendChild(movieInfo);

  movieInfo.appendChild(moviePoster);
  movieInfo.appendChild(TVO);
  TVO.appendChild(titleElement);
  TVO.appendChild(voteAvgElement);
  TVO.appendChild(overviewElement);

  return movieIR;
};

//웹페이지에 영화카드를 보여주는 함수
const renderMovies = movies => {
  // moviesContainer.innerHTML = '';
  movieDetail.innerHTML = '';
  movies.forEach(movie => {
    const movieIR = createInfoCard(movie);
    // moviesContainer.appendChild(movieCard);
    movieDetail.appendChild(movieIR);
  });

  // header-image 클릭시 페이지 새로고침
  const title = document.querySelector('.header-image');
  title.addEventListener('click', () => {
    location.reload();
  });
};
