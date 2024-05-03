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

//검색 정보를 저장
function saveSearchValue(value) {
  localStorage.setItem('searchValue', JSON.stringify(value));
}

//이전 검색 결과가 있으면 불러온다
function loadingSearchValue(data) {
  const searchTerm_storage = JSON.parse(localStorage.getItem('searchValue')); //JSON파일을 다시 문자열로 바꾼다.

  if (searchTerm_storage === null || localStorage.getItem('fromIndex') === null) { //만약 저장된 검색 결과가 없으면 영화 카드를 모두 생성한다.
    renderMovies(data);
    return;
  }
  localStorage.removeItem('fromIndex'); // 필요없어졌으므로 삭제
  const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(searchTerm_storage)); //저장된 검색 결과가 있으면 검색한 결과만 생성한다.
  renderMovies(filteredMovies);
}

//TMDB API에서 제일 인기있는 영화들을 fetch
fetch(apiUrl, options)
  .then(response => response.json())
  .then(response => loadingSearchValue(response.results))
  .catch(err => console.error(err));

//영화 카드들을 담을 수 있는 container element
const moviesContainer = document.getElementById('movie_container');

//영화카드 생성 기능
const createMovieCard = movie => {
  const { id, title, poster_path } = movie;

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

    saveSearchValue(searchTerm); //검색 정보를 저장
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
    localStorage.removeItem('searchValue'); //검색 결과를 삭제한다. 
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

  //html창이 종료될 때 
  window.addEventListener('unload', function () {
    localStorage.removeItem('fromIndex'); // 상세 페이지로 왔다는 것을 표시
  });
};
