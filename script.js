//TMDB API키
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjEwZDY1MTg3MGQwNTIxYWQ5ZGNiZTExYjU3NzU3MiIsInN1YiI6IjY2MjljYjliNDNjZDU0MDEyMTg0NDkyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktYaXCNxyt3gBJOwc-VM1xHMJmE760miOgotjGWRju0'
  }
};
// API URL 선언
const apiUrl = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

//TMDB API에서 제일 인기있는 영화들을 fetch
fetch(apiUrl, options)
  .then(response => response.json())
  .then(response => renderMovies(response.results))
  .catch(err => console.error(err));

//영화 카드들을 담을 수 있는 container element
const moviesContainer = document.getElementById('movie_container');

//영화카드 생성 기능
const createMovieCard = movie => {
  const { id, title, poster_path} = movie;

  //영화카드의 elements 지정
  const movieCard = document.createElement('div');
  const moviePoster = document.createElement('img');
  const titleElement = document.createElement('h1');
  movieCard.setAttribute('id', id);

  //클라스 지정
  movieCard.className = 'movie-card';
  moviePoster.className = 'movie-poster';
  titleElement.className = 'title';

  //위 영화정보를 영화카드로 연동
  moviePoster.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
  titleElement.textContent = title;

  //moviesContainer에 하기 정보들을 추가 (append = 추가)
  movieCard.appendChild(moviePoster);
  movieCard.appendChild(titleElement);

  return movieCard;
};

//웹페이지에 영화카드를 보여주는 함수
const renderMovies = movies => {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = createMovieCard(movie);
    moviesContainer.appendChild(movieCard);

    //영화카드 클릭시 상세페이지 이동
    movieCard.addEventListener('click', () => {
      localStorage.setItem('movie', JSON.stringify(movie));
      //새로운 페이지 URL 생성
      const newPageURL = `movie-detail.html`;
      // 새로운 페이지로 이동
      window.location.href = newPageURL;
    })
  });

  //영화 검색 기능
  const searchMovies = async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return;

    try {
      const response = await fetch(apiUrl, options);
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

  // //검색 버튼 기능 + hover 기능 추가
  const searchBtn = document.getElementById('search-button');
  searchBtn.addEventListener('click', searchMovies);
  searchBtn.addEventListener('click', function () {
    var img = this.querySelector('img');
    img.style.transform = 'scale(0.8)';
    setTimeout(function () {
      img.style.transform = 'scale(1)';
    }, 70); // Reset the scale after 200 milliseconds
  });;


  //검색어 입력 & 검색 후 'Enter'키 누르면 검색 기능 실행
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
      searchMovies();
    }
  });
};
