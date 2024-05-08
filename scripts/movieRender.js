//영화 카드들을 담을 수 있는 container element
const moviesContainer = document.getElementById('movie_container');

//웹페이지에 영화카드를 보여주는 함수
export const renderMovies = (movies, currentPage) => {
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
