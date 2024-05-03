// TMDB API키
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjEwZDY1MTg3MGQwNTIxYWQ5ZGNiZTExYjU3NzU3MiIsInN1YiI6IjY2MjljYjliNDNjZDU0MDEyMTg0NDkyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktYaXCNxyt3gBJOwc-VM1xHMJmE760miOgotjGWRju0'
  }
};

// 특정 ID에 해당하는 영화 정보를 가져오는 함수
const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// 영화 정보를 표시하는 함수
const displayMovieDetails = async (id) => {
  const movieDetail = document.getElementById('movie_detail');
  movieDetail.innerHTML = ''; // 기존에 표시된 내용 초기화

  const movie = await fetchMovieDetails(id);
  if (movie) {
    const movieIR = createInfoCard(movie);
    movieDetail.appendChild(movieIR);
  }
};

// 영화카드 생성 함수
const createInfoCard = movie => {
  const { id, title, overview, poster_path, vote_average } = movie;

  // 영화카드의 elements 지정
  const movieIR = document.createElement('div');
  const movieInfo = document.createElement('div');
  const movieImg = document.createElement('div');
  const moviePoster = document.createElement('img');
  const TVO = document.createElement('div');
  const titleElement = document.createElement('h1');
  const voteAvgElement = document.createElement('p');
  const overviewElement = document.createElement('p');

  movieIR.setAttribute('id', id); // 영화 ID를 영화카드의 id로 설정

  // 클래스 지정
  movieIR.className = 'movie-ir';
  movieImg.className = 'movie-img'
  moviePoster.className = 'movie-poster';
  movieInfo.className = 'movie-info';
  TVO.className = 'tvo';
  titleElement.className = 'title';
  voteAvgElement.className = 'vote-average';
  overviewElement.className = 'overview';

  // 영화 정보 설정
  moviePoster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  titleElement.textContent = title;
  voteAvgElement.textContent = `Vote Average: ${parseFloat(vote_average).toFixed(2)}`;
  overviewElement.textContent = overview;

  // 요소들을 영화카드에 추가
  movieIR.appendChild(movieInfo);
  movieInfo.appendChild(movieImg);
  movieImg.appendChild(moviePoster);
  movieInfo.appendChild(TVO);
  TVO.appendChild(titleElement);
  TVO.appendChild(voteAvgElement);
  TVO.appendChild(overviewElement);

  return movieIR;
};

// 영화 정보를 표시할 때 호출
displayMovieDetails(550); // 여기에 원하는 영화 ID를 넣어주세요
