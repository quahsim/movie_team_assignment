import { options, fetchAllTopRatedMovies } from './movieFetch.js';
import { renderPagination, pagination } from './pagination.js';
import { renderMovies } from './movieRender.js';
//총 페이지 수
const totalPages = 10;
// 현재 페이지
export let currentPageObj = {currentPage: 1};

//검색 정보를 저장
let saveSearchValue = value => localStorage.setItem('searchValue', JSON.stringify(value));

//모든 영화들
let topRatedMovies = [];

document.addEventListener('DOMContentLoaded', function () {
    pagination.addEventListener('click', function (event) {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const page = event.target.textContent;
            fetchMoviesByPage(page);
        }
    });
    //이전 검색 결과가 있으면 불러온다
    function loadingSearchValue(data) {
        const searchTerm_storage = JSON.parse(localStorage.getItem('searchValue')); //JSON파일을 다시 문자열로 바꾼다.

        if (searchTerm_storage === null || localStorage.getItem('fromIndex') === null) { //만약 저장된 검색 결과가 없으면 영화 카드를 모두 생성한다.
            const changePageNum = localStorage.getItem('page') === null ? currentPageObj.currentPage : currentPageObj.currentPage = localStorage.getItem('page');
            fetchMoviesByPage(changePageNum);
            localStorage.removeItem('page');
            return;
        }

        localStorage.removeItem('fromIndex'); // 필요없어졌으므로 삭제
        const filteredMovies = data.filter(movie => movie.title.toLowerCase().includes(searchTerm_storage)); //저장된 검색 결과가 있으면 검색한 결과만 생성한다.
        renderMovies(filteredMovies, currentPageObj.currentPage);
    }
    // 페이지에 맞는 영화 불러오기
    async function fetchMoviesByPage(page) {
        const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
        try {
            const response = await fetch(apiUrl, options);
            const data = await response.json();
            renderMovies(data.results, currentPageObj.currentPage);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }
    //페이지 출력
    async function displayTopRatedMovies() {
        try {
            //캐쉬가 있으면 캐쉬를 불러옴
            // 조건 === null이라면 ? await fetchAllTopRatedMovies() : 아니라면 ~~
            topRatedMovies = localStorage.getItem('cache_movies') === null ? await fetchAllTopRatedMovies(totalPages) : JSON.parse(localStorage.getItem('cache_movies'));
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        loadingSearchValue(topRatedMovies);
    }
    //새로고침시 영화 페이지 출력
    displayTopRatedMovies();
    // 페이지네이션을 생성하고 추가합니다. 전체 페이지만큼 추가합니다
    renderPagination(totalPages, currentPageObj);
});

//영화 검색 기능
const searchMovies = async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    // ! = NOT
    if (!searchTerm) return;

    saveSearchValue(searchTerm); //검색 정보를 저장

    const filteredMovies = topRatedMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
    renderMovies(filteredMovies, currentPageObj.currentPage);
};

// header-image 클릭시 페이지 새로고침
const title = document.querySelector('.header-image');
title.addEventListener('click', () => {
    localStorage.removeItem('searchValue'); //검색 결과를 삭제한다. 
    location.reload();
});

// 검색 버튼 기능 + hover 기능 추가
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
