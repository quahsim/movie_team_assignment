// TMDB API키
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjEwZDY1MTg3MGQwNTIxYWQ5ZGNiZTExYjU3NzU3MiIsInN1YiI6IjY2MjljYjliNDNjZDU0MDEyMTg0NDkyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ktYaXCNxyt3gBJOwc-VM1xHMJmE760miOgotjGWRju0'
  }
};

//총 페이지 수
const totalPages = 5;
// 현재 페이지
let currentPage = 1;

//검색 정보를 저장
let saveSearchValue = value => localStorage.setItem('searchValue', JSON.stringify(value));

//베이스 url
const baseUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=`;

//모든 영화들
let topRatedMovies = [];

document.addEventListener('DOMContentLoaded', function () {
  const pagination = document.querySelector('.pagination');
  pagination.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      event.preventDefault();
      const page = event.target.textContent;
      fetchMoviesByPage(page);
    }
  });
  //페이지 출력
  async function displayTopRatedMovies() {
    try {
      //캐쉬가 있으면 캐쉬를 불러옴
      topRatedMovies = localStorage.getItem('cache_movies') === null ? await fetchAllTopRatedMovies() : JSON.parse(localStorage.getItem('cache_movies')); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    loadingSearchValue(topRatedMovies);
  }
  //이전 검색 결과가 있으면 불러온다
  function loadingSearchValue(data) {
    const searchTerm_storage = JSON.parse(localStorage.getItem('searchValue')); //JSON파일을 다시 문자열로 바꾼다.

    if (searchTerm_storage === null || localStorage.getItem('fromIndex') === null) { //만약 저장된 검색 결과가 없으면 영화 카드를 모두 생성한다.
      const changePageNum = localStorage.getItem('page') === null ? currentPage : currentPage = localStorage.getItem('page');
      fetchMoviesByPage(changePageNum);
      localStorage.removeItem('page');
      return;
    }

    localStorage.removeItem('fromIndex'); // 필요없어졌으므로 삭제
    const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(searchTerm_storage)); //저장된 검색 결과가 있으면 검색한 결과만 생성한다.
    renderMovies(filteredMovies);
  }
  // 페이지에 맞는 영화 불러오기
  async function fetchMoviesByPage(page) {
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      renderMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }
  // 페이지 번호를 생성하는 함수
  function createPageLink(pageNumber) {
    const pageHtml = `
    <li class="page-item"><a class="page-link" href="#">${pageNumber}</a></li>
    `;
    return pageHtml;
  }

  // 페이지네이션을 생성하고 추가하는 함수
  function renderPagination(totalPages) {
    const previousHtml = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;
    const nextHtml = `<li class="page-item"><a class="page-link" href="#">Next</a></li>`;

    //pagination.insertAdjacentHTML("beforeend", previousHtml); //previous버튼

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = createPageLink(i);
      pagination.insertAdjacentHTML("beforeend", pageLink);
    }

    //pagination.insertAdjacentHTML("beforeend", nextHtml); //next버튼

    // 각 페이지 링크에 이벤트 리스너 추가
    const pageLinks = pagination.querySelectorAll('.page-item');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // 선택된 페이지에 active 클래스 추가
            pageLinks.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            currentPage = event.target.textContent; //현재 페이지를 갱신한다.
            localStorage.removeItem('searchValue'); //검색 결과를 삭제한다. 
        });
    });
  }

  //새로고침시 영화 페이지 출력
  displayTopRatedMovies();

  // 페이지네이션을 생성하고 추가합니다. 전체 페이지만큼 추가합니다
  renderPagination(totalPages);
});
//TMDB API에서 제일 인기있는 영화들을 fetch
async function fetchTopRatedMovies(page) {
  const url = `${baseUrl}${page}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
}

//모든 페이지를 불러옴
async function fetchAllTopRatedMovies() {
  let allMovies = [];
  for (let i = 1; i <= totalPages; i++) {
    const movies = await fetchTopRatedMovies(i);
    allMovies = allMovies.concat(movies);
  }
  localStorage.setItem('cache_movies', JSON.stringify(allMovies));
  return allMovies;
}

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
    movieCard.addEventListener('click', (event) => {
      localStorage.setItem('movie', JSON.stringify(movie));
      localStorage.setItem('page', currentPage);
      //새로운 페이지 URL 생성
      const newPageURL = `movie-detail.html`;
      // 새로운 페이지로 이동
      window.location.href = newPageURL;
    })
  });
  document.querySelectorAll('li')[currentPage - 1].classList.add('active');
};

//영화 검색 기능
const searchMovies = async () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  // ! = NOT
  if (!searchTerm) return;

  saveSearchValue(searchTerm); //검색 정보를 저장

  const filteredMovies = topRatedMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
  renderMovies(filteredMovies);
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
  let img = this.querySelector('img');
  img.style.transform = 'scale(0.8)';
  setTimeout(function () {
    img.style.transform = 'scale(1)';
  }, 70); // Reset the scale after 200 milliseconds
});

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
